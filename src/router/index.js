import { createRouter, createWebHistory } from "vue-router";
import AboutView from "../views/AboutView.vue";
import WorksView from "../views/WorksView.vue";

const routes = [
  {
    path: "/",
    redirect: "/works"
  },
  {
    path: "/works",
    name: "works",
    component: WorksView
  },
  {
    path: "/about",
    name: "about",
    component: AboutView
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/works"
  }
];

export function createAppRouter() {
  return createRouter({
    history: createWebHistory(),
    routes
  });
}

const router = createAppRouter();

export default router;
