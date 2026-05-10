<template>
  <section
    ref="radioRoot"
    class="techno-radio"
    :class="{ expanded: isOpen }"
    data-testid="techno-radio"
    aria-label="Radio techno livre"
  >
    <button
      type="button"
      class="radio-toggle"
      :class="{ active: isPlaying || isAutoplayPending }"
      :aria-expanded="isOpen"
      aria-label="Abrir radio"
      @click="togglePanel"
    >
      <span class="radio-eq-bar"></span>
      <span class="radio-eq-bar"></span>
      <span class="radio-eq-bar"></span>
      <span class="radio-eq-bar"></span>
    </button>

    <audio
      v-if="hasPlaylist"
      ref="audioElement"
      :src="activeTrack?.src"
      preload="metadata"
      @play="isPlaying = true"
      @pause="isPlaying = false"
      @ended="nextStation"
    ></audio>

    <div v-if="isOpen" class="radio-panel">
      <div class="radio-meta">
        <span class="radio-kicker">GBRL RADIO</span>
        <strong>{{ activeStation.name }}</strong>
        <span>{{ activeStation.meta }}</span>
      </div>

      <div class="radio-controls">
        <button
          type="button"
          class="radio-button"
          :class="{ active: isPlaying }"
          :aria-pressed="isPlaying"
          @click="togglePlayback"
        >
          {{ isPlaying ? "STOP" : "PLAY" }}
        </button>

        <button type="button" class="radio-icon-button" aria-label="Trocar faixa" @click="nextStation">
          ↻
        </button>

        <label class="radio-volume">
          <span>VOL</span>
          <input v-model.number="volume" type="range" min="0" max="1" step="0.01" />
        </label>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";

const importedTracks = import.meta.glob("../../assets/radio/*.{mp3,wav,ogg,m4a}", {
  eager: true,
  import: "default",
});

const playlist = Object.entries(importedTracks)
  .sort(([leftPath], [rightPath]) => leftPath.localeCompare(rightPath))
  .map(([path, src], index) => {
    const rawName = path.split("/").pop()?.replace(/\.[^.]+$/, "") ?? `Track ${index + 1}`;
    const displayName = rawName
      .replace(/[_-]+/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .replace(/\b\w/g, (char) => char.toUpperCase());

    return {
      id: `track-${index + 1}`,
      name: displayName || `Track ${index + 1}`,
      meta: "",
      src,
    };
  });

const synthStations = [
  {
    name: "Rain Terminal",
    bpm: 116,
    bass: [36, 36, 43, 36, 39, 36, 43, 34],
    arp: [67, 72, 74, 79, 72, 76, 74, 67],
    hatDensity: 2,
  },
  {
    name: "Soft Voltage",
    bpm: 122,
    bass: [36, 48, 36, 43, 46, 36, 43, 48],
    arp: [69, 76, 81, 74, 78, 72, 81, 76],
    hatDensity: 2,
  },
  {
    name: "Late District",
    bpm: 118,
    bass: [33, 33, 40, 33, 45, 40, 33, 38],
    arp: [64, 69, 72, 76, 69, 74, 72, 67],
    hatDensity: 2,
  },
];

const radioRoot = ref(null);
const audioElement = ref(null);
const isPlaying = ref(false);
const isOpen = ref(false);
const isAutoplayPending = ref(false);
const trackIndex = ref(0);
const stationIndex = ref(0);
const volume = ref(0.8);
const shouldResumeAfterTrackChange = ref(false);

const hasPlaylist = computed(() => playlist.length > 0);
const activeTrack = computed(() => playlist[trackIndex.value] ?? null);
const activeStation = computed(() => {
  if (hasPlaylist.value) {
    return activeTrack.value ?? { name: "Sem faixa", meta: "Adicione .mp3 em assets/radio" };
  }

  const station = synthStations[stationIndex.value];
  return {
    ...station,
    meta: `${station.bpm} BPM · lofi techno livre`,
  };
});

let audioContext;
let masterGain;
let delayNode;
let delayFeedback;
let schedulerId;
let nextStepTime = 0;
let currentStep = 0;

function waitForAudioReady(element) {
  if (element.readyState >= 3) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const onReady = () => {
      cleanup();
      resolve();
    };

    const onError = () => {
      cleanup();
      reject(new Error("Audio failed to load"));
    };

    const cleanup = () => {
      element.removeEventListener("canplay", onReady);
      element.removeEventListener("canplaythrough", onReady);
      element.removeEventListener("loadeddata", onReady);
      element.removeEventListener("error", onError);
    };

    element.addEventListener("canplay", onReady, { once: true });
    element.addEventListener("canplaythrough", onReady, { once: true });
    element.addEventListener("loadeddata", onReady, { once: true });
    element.addEventListener("error", onError, { once: true });
    element.load();
  });
}

function midiToFrequency(note) {
  return 440 * 2 ** ((note - 69) / 12);
}

function createGainEnvelope(destination, time, peak, attack, decay) {
  const gain = audioContext.createGain();
  gain.gain.setValueAtTime(0.0001, time);
  gain.gain.exponentialRampToValueAtTime(peak, time + attack);
  gain.gain.exponentialRampToValueAtTime(0.0001, time + attack + decay);
  gain.connect(destination);
  return gain;
}

function playKick(time) {
  const oscillator = audioContext.createOscillator();
  const gain = createGainEnvelope(masterGain, time, 0.58, 0.01, 0.32);

  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(112, time);
  oscillator.frequency.exponentialRampToValueAtTime(44, time + 0.14);
  oscillator.connect(gain);
  oscillator.start(time);
  oscillator.stop(time + 0.42);
}

function playHat(time, accent = false) {
  const bufferSize = audioContext.sampleRate * 0.04;
  const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < bufferSize; i += 1) {
    data[i] = Math.random() * 2 - 1;
  }

  const noise = audioContext.createBufferSource();
  const filter = audioContext.createBiquadFilter();
  const gain = createGainEnvelope(masterGain, time, accent ? 0.13 : 0.07, 0.002, 0.06);

  filter.type = "highpass";
  filter.frequency.value = accent ? 7200 : 5600;
  noise.buffer = buffer;
  noise.connect(filter);
  filter.connect(gain);
  noise.start(time);
  noise.stop(time + 0.06);
}

function playBass(time, note, duration) {
  const oscillator = audioContext.createOscillator();
  const filter = audioContext.createBiquadFilter();
  const gain = createGainEnvelope(masterGain, time, 0.24, 0.018, duration);

  oscillator.type = "sawtooth";
  oscillator.frequency.setValueAtTime(midiToFrequency(note), time);
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(420, time);
  filter.frequency.exponentialRampToValueAtTime(105, time + duration);
  oscillator.connect(filter);
  filter.connect(gain);
  oscillator.start(time);
  oscillator.stop(time + duration + 0.04);
}

function playArp(time, note) {
  const oscillator = audioContext.createOscillator();
  const gain = createGainEnvelope(delayNode, time, 0.08, 0.02, 0.24);

  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(midiToFrequency(note), time);
  oscillator.connect(gain);
  oscillator.start(time);
  oscillator.stop(time + 0.22);
}

function playClap(time) {
  playHat(time, true);
  playHat(time + 0.018, true);
}

function scheduleStep(step, time) {
  const station = synthStations[stationIndex.value];
  const stepDuration = 60 / station.bpm / 4;
  const patternStep = step % 16;

  if (patternStep % 4 === 0) {
    playKick(time);
  }

  if (patternStep === 4 || patternStep === 12) {
    playClap(time);
  }

  if (patternStep % station.hatDensity === 0) {
    playHat(time, patternStep % 4 === 2);
  }

  if (patternStep % 2 === 0) {
    playBass(time, station.bass[(step / 2) % station.bass.length], stepDuration * 1.7);
  }

  if (patternStep % 3 === 0 || patternStep === 14) {
    playArp(time, station.arp[step % station.arp.length]);
  }
}

function scheduler() {
  if (!audioContext) {
    return;
  }

  const station = synthStations[stationIndex.value];
  const stepDuration = 60 / station.bpm / 4;

  while (nextStepTime < audioContext.currentTime + 0.12) {
    scheduleStep(currentStep, nextStepTime);
    nextStepTime += stepDuration;
    currentStep = (currentStep + 1) % 64;
  }
}

function setupAudio() {
  if (audioContext) {
    return;
  }

  const AudioContextConstructor = window.AudioContext || window.webkitAudioContext;
  audioContext = new AudioContextConstructor();
  masterGain = audioContext.createGain();
  delayNode = audioContext.createDelay(0.6);
  delayFeedback = audioContext.createGain();

  masterGain.gain.value = volume.value;
  delayNode.delayTime.value = 0.19;
  delayFeedback.gain.value = 0.26;
  delayNode.connect(delayFeedback);
  delayFeedback.connect(delayNode);
  delayNode.connect(masterGain);
  masterGain.connect(audioContext.destination);
}

async function startSynthPlayback() {
  setupAudio();
  await audioContext.resume();

  if (!schedulerId) {
    nextStepTime = audioContext.currentTime + 0.05;
    currentStep = 0;
    schedulerId = window.setInterval(scheduler, 25);
  }

  isPlaying.value = true;
  isAutoplayPending.value = false;
}

async function startFilePlayback() {
  if (!audioElement.value) {
    return;
  }

  audioElement.value.volume = volume.value;
  await waitForAudioReady(audioElement.value);
  await audioElement.value.play();
  isPlaying.value = true;
  isAutoplayPending.value = false;
}

async function startPlayback() {
  if (hasPlaylist.value) {
    await startFilePlayback();
    return;
  }

  await startSynthPlayback();
}

function stopSynthPlayback() {
  if (schedulerId) {
    window.clearInterval(schedulerId);
    schedulerId = null;
  }
}

function stopPlayback() {
  if (hasPlaylist.value) {
    audioElement.value?.pause();
  } else {
    stopSynthPlayback();
  }

  isPlaying.value = false;
}

function togglePlayback() {
  if (isPlaying.value) {
    stopPlayback();
    return;
  }

  startPlayback().catch(() => {
    isAutoplayPending.value = true;
  });
}

function togglePanel() {
  isOpen.value = !isOpen.value;
}

function closePanel() {
  isOpen.value = false;
}

function nextStation() {
  shouldResumeAfterTrackChange.value = isPlaying.value || hasPlaylist.value;

  stopPlayback();

  if (hasPlaylist.value) {
    trackIndex.value = (trackIndex.value + 1) % playlist.length;
  } else {
    stationIndex.value = (stationIndex.value + 1) % synthStations.length;
    currentStep = 0;

    if (audioContext) {
      nextStepTime = audioContext.currentTime + 0.04;
    }
  }

  if (!hasPlaylist.value && shouldResumeAfterTrackChange.value) {
    startPlayback().catch(() => {
      isAutoplayPending.value = true;
    });
  }
}

function handlePointerDown(event) {
  if (!isOpen.value || !radioRoot.value) {
    return;
  }

  if (radioRoot.value.contains(event.target)) {
    return;
  }

  closePanel();
}

function startOnFirstGesture() {
  startPlayback()
    .catch(() => {
      isAutoplayPending.value = true;
    })
    .finally(() => {
      window.removeEventListener("pointerdown", startOnFirstGesture);
      window.removeEventListener("keydown", startOnFirstGesture);
    });
}

watch(volume, (nextVolume) => {
  if (audioElement.value) {
    audioElement.value.volume = nextVolume;
  }

  if (!masterGain || !audioContext) {
    return;
  }

  masterGain.gain.setTargetAtTime(nextVolume, audioContext.currentTime, 0.04);
});

watch(trackIndex, async () => {
  if (!hasPlaylist.value || !audioElement.value) {
    return;
  }

  await nextTick();

  if (shouldResumeAfterTrackChange.value) {
    startFilePlayback()
      .catch(() => {
        isAutoplayPending.value = true;
      })
      .finally(() => {
        shouldResumeAfterTrackChange.value = false;
      });
    return;
  }

  shouldResumeAfterTrackChange.value = false;
});

onMounted(async () => {
  await nextTick();

  if (audioElement.value) {
    audioElement.value.volume = volume.value;
  }

  document.addEventListener("pointerdown", handlePointerDown);

  startPlayback().catch(() => {
    isAutoplayPending.value = true;
    window.addEventListener("pointerdown", startOnFirstGesture, { once: true });
    window.addEventListener("keydown", startOnFirstGesture, { once: true });
  });
});

onBeforeUnmount(() => {
  stopPlayback();
  document.removeEventListener("pointerdown", handlePointerDown);
  window.removeEventListener("pointerdown", startOnFirstGesture);
  window.removeEventListener("keydown", startOnFirstGesture);

  if (audioContext) {
    audioContext.close();
  }
});
</script>
