import type { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHistory } from "vue-router";
import { useAuth } from "./auth";
import Unavailable from "./pages/unavailable.vue";

async function sectionRoutes(
  path: string,
  load: () => Promise<{ default: RouteRecordRaw[] }>
): Promise<RouteRecordRaw[]> {
  try {
    return [{ children: (await load()).default, path }];
  } catch {
    return [
      { component: Unavailable, path },
      { component: Unavailable, path: `${path}/:rest(.*)*` },
    ];
  }
}

export async function createShellRouter() {
  const routes: RouteRecordRaw[] = [
    { component: () => import("./pages/home.vue"), path: "/" },
    {
      component: () => import("./pages/login.vue"),
      meta: { public: true },
      path: "/login",
    },
    ...(await sectionRoutes("/portal", () => import("userPortal/routes"))),
    ...(await sectionRoutes("/editor", () => import("webEditor/routes"))),
    { path: "/:rest(.*)*", redirect: "/" },
  ];

  const router = createRouter({ history: createWebHistory(), routes });

  router.beforeEach((to) => {
    const { user } = useAuth();
    if (!(to.meta.public || user.value)) {
      return { path: "/login", query: { redirect: to.fullPath } };
    }
    return true;
  });

  router.onError((error, to) => {
    if (String(error).includes("Failed to fetch")) {
      window.location.assign(to.fullPath);
    }
  });

  return router;
}
