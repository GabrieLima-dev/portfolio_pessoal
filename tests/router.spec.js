import { describe, expect, it } from "vitest";
import { createAppRouter } from "../src/router/index.js";

describe("router", () => {
  it("deve redirecionar / para /works", async () => {
    const router = createAppRouter();

    await router.push("/");
    await router.isReady();

    expect(router.currentRoute.value.path).toBe("/works");
  });

  it("deve conter rotas /works e /about", () => {
    const router = createAppRouter();
    const paths = router.getRoutes().map((route) => route.path);

    expect(paths).toContain("/works");
    expect(paths).toContain("/about");
  });
});
