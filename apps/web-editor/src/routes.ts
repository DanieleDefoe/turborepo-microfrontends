import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    component: () => import("./pages/editor.vue"),
    name: "editor",
    path: "",
  },
  {
    component: () => import("./pages/documents.vue"),
    name: "editor-documents",
    path: "documents",
  },
];

export default routes;
