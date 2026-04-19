import { createStore } from "vuex";
import works from "../data/works.js";

export function createAppStore() {
  return createStore({
    state() {
      return {
        works,
        activeWorkId: works[0]?.id ?? null
      };
    },
    getters: {
      activeWork(state) {
        return state.works.find((work) => work.id === state.activeWorkId) ?? null;
      }
    },
    mutations: {
      setActiveWorkId(state, workId) {
        state.activeWorkId = workId;
      }
    }
  });
}

const store = createAppStore();

export default store;
