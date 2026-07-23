import { setupLayouts } from "virtual:generated-layouts";
import { createRouter, createWebHistory } from "vue-router";
import { handleHotUpdate, routes } from "vue-router/auto-routes";

import { setupRouterGuard } from "./guard";

const router = createRouter({
  history: createWebHistory(),
  routes: setupLayouts(routes),

  scrollBehavior() {
    return { behavior: "smooth", left: 0, top: 0 };
  },
});

setupRouterGuard(router);

export default router;

if (import.meta.hot) {
  handleHotUpdate(router);
}
