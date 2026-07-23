import { federation } from "@module-federation/vite";
import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

export default defineConfig({
  build: { target: "esnext" },
  plugins: [
    vue(),
    tailwindcss(),
    federation({
      exposes: { "./routes": "./src/routes.ts" },
      filename: "remoteEntry.js",
      name: "webEditor",
      shared: {
        vue: { singleton: true },
        "vue-router": { singleton: true },
      },
    }),
  ],
  server: { origin: "http://localhost:5172", port: 5172, strictPort: true },
});
