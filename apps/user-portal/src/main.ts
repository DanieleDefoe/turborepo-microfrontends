import { createApp, h } from "vue";
import { createRouter, createWebHistory, RouterView } from "vue-router";
import routes from "./routes";
import "./assets/index.css";

const router = createRouter({
  history: createWebHistory(),
  routes: [{ children: routes, path: "/" }],
});

createApp({ render: () => h(RouterView) })
  .use(router)
  .mount("#app");
