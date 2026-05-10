import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  assetsInclude: ["**/*.m4v"],
  test: {
    environment: "jsdom",
    globals: true
  }
});
