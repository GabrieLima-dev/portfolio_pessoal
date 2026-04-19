import { mount } from "@vue/test-utils";
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
  });

  it("deve renderizar projetos na página works", async () => {
    const router = createAppRouter();
    const store = createAppStore();

    await router.push("/works");
    await router.isReady();

    const wrapper = mount(App, {
      global: {
        plugins: [router, store]
      }
    });

    expect(wrapper.findAll("[data-testid='work-card']").length).toBeGreaterThan(0);
  });
});
