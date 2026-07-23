import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    component: () => import("./pages/profile.vue"),
    name: "portal-profile",
    path: "",
  },
  {
    component: () => import("./pages/settings.vue"),
    name: "portal-settings",
    path: "settings",
  },
];

export default routes;
