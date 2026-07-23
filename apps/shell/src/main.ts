import { createApp } from "vue";
import App from "./app.vue";
import { createShellRouter } from "./router";
import "./assets/index.css";

const app = createApp(App);
app.use(await createShellRouter());
app.mount("#app");
