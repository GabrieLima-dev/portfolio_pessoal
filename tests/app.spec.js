import { mount } from "@vue/test-utils";
import { readFileSync } from "node:fs";
import { nextTick } from "vue";
import { describe, expect, it } from "vitest";
import App from "../src/App.vue";
import { createAppRouter } from "../src/router/index.js";
import { createAppStore } from "../src/store/index.js";

describe("app", () => {
  it("deve renderizar menu com works e about", async () => {
    const router = createAppRouter();
    const store = createAppStore();

    await router.push("/works");
    await router.isReady();

    const wrapper = mount(App, {
      global: {
        plugins: [router, store]
      }
    });

    expect(wrapper.text()).toContain("WORKS");
    expect(wrapper.text()).toContain("ABOUT");
    expect(wrapper.text()).not.toContain("EXPLORE");
  });

  it("deve renderizar works como palco visual inspirado no benchmark", async () => {
    const router = createAppRouter();
    const store = createAppStore();

    await router.push("/works");
    await router.isReady();

    const wrapper = mount(App, {
      global: {
        plugins: [router, store]
      }
    });

    expect(wrapper.find("[data-testid='work-stage-visual']").exists()).toBe(true);
    const stageVideo = wrapper.find("[data-testid='work-stage-video']");
    expect(stageVideo.exists()).toBe(true);
    expect(stageVideo.attributes("autoplay")).toBeDefined();
    expect(stageVideo.element.muted).toBe(true);
    expect(stageVideo.attributes("loop")).toBeDefined();
    expect(stageVideo.attributes("playsinline")).toBeDefined();
    expect(stageVideo.attributes("aria-label")).toContain("Lima Retratos");
    expect(wrapper.find("[data-testid='works-rail']").exists()).toBe(true);
    expect(wrapper.find("[data-testid='work-reflective-floor']").exists()).toBe(true);
    expect(wrapper.findAll("[data-testid='work-video-panel']").length).toBeGreaterThanOrEqual(8);
    expect(wrapper.findAll("[data-testid='work-panel-reflection']").length).toBeGreaterThanOrEqual(6);
    expect(wrapper.findAll("[data-testid='rain-drop']").length).toBeGreaterThanOrEqual(18);
    expect(wrapper.findAll("[data-testid='work-sequencer-item']").length).toBeGreaterThan(0);
    expect(wrapper.find(".work-media-label").exists()).toBe(false);
    expect(wrapper.find(".work-media-code").exists()).toBe(false);
    expect(wrapper.text()).toContain("INFOS");
    expect(wrapper.text()).toContain("VISIT");
  });

  it("deve manter o video principal translucido sem overlays internos", () => {
    const css = readFileSync("src/styles/main.css", "utf8");
    const videoRule = css.match(/\.work-stage-video\s*\{[^}]+\}/)?.[0] ?? "";

    expect(videoRule).toContain("opacity: 0.78");
    expect(css).not.toContain(".work-media-plane::before");
    expect(css).not.toContain(".work-media-plane::after");
    expect(css).not.toContain(".work-stage-video::before");
    expect(css).not.toContain(".work-stage-video::after");
  });

  it("deve referenciar o favicon GBRL no head", () => {
    const html = readFileSync("index.html", "utf8");
    const favicon = readFileSync("public/favicon.svg", "utf8");

    expect(html).toContain('rel="icon"');
    expect(html).toContain('href="/favicon.svg"');
    expect(favicon).toContain("GBRL");
    expect(favicon).toContain('fill="#ff0033"');
  });

  it("deve alternar projetos em works pelas setas do teclado", async () => {
    const router = createAppRouter();
    const store = createAppStore();

    await router.push("/works");
    await router.isReady();

    const wrapper = mount(App, {
      attachTo: document.body,
      global: {
        plugins: [router, store]
      }
    });

    expect(wrapper.text()).toContain("Lima Retratos");

    document.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight" }));
    await nextTick();
    await nextTick();

    expect(wrapper.text()).toContain("SDR Virtual");
    wrapper.unmount();
  });

  it("deve inclinar o painel de works na direção do mouse", async () => {
    const router = createAppRouter();
    const store = createAppStore();

    await router.push("/works");
    await router.isReady();

    const wrapper = mount(App, {
      attachTo: document.body,
      global: {
        plugins: [router, store]
      }
    });

    const rail = wrapper.find("[data-testid='works-rail']").element;
    rail.getBoundingClientRect = () => ({
      left: 0,
      top: 0,
      width: 1000,
      height: 700,
      right: 1000,
      bottom: 700,
      x: 0,
      y: 0,
      toJSON: () => {}
    });

    document.dispatchEvent(new MouseEvent("mousemove", { clientX: 900, clientY: 350 }));
    await nextTick();

    expect(rail.style.getPropertyValue("--panel-tilt-y")).toBe("13.6deg");
    expect(rail.style.getPropertyValue("--panel-shift-x")).toBe("38.4px");

    document.dispatchEvent(new MouseEvent("mousemove", { clientX: 100, clientY: 350 }));
    await nextTick();

    expect(rail.style.getPropertyValue("--panel-tilt-y")).toBe("-13.6deg");
    expect(rail.style.getPropertyValue("--panel-shift-x")).toBe("-38.4px");
    wrapper.unmount();
  });

  it("deve renderizar about em composição editorial sem card", async () => {
    const router = createAppRouter();
    const store = createAppStore();

    await router.push("/about");
    await router.isReady();

    const wrapper = mount(App, {
      global: {
        plugins: [router, store]
      }
    });

    expect(wrapper.find("[data-testid='about-editorial']").exists()).toBe(true);
    expect(wrapper.find(".about-content").exists()).toBe(false);
    expect(wrapper.text()).toContain("Operator dossier");
    expect(wrapper.findAll(".about-panel").length).toBe(4);
    expect(wrapper.text()).toContain("[GITHUB]");
    expect(wrapper.text()).toContain("[LINKEDIN]");
  });

  it("deve exibir camadas visuais avançadas no shell", async () => {
    const router = createAppRouter();
    const store = createAppStore();

    await router.push("/works");
    await router.isReady();

    const wrapper = mount(App, {
      global: {
        plugins: [router, store]
      }
    });

    expect(wrapper.find(".chromatic-layer").exists()).toBe(true);
    expect(wrapper.find(".hud-bars").exists()).toBe(false);
  });
});
