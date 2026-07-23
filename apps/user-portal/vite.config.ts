import { federation } from "@module-federation/vite";
import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

const shellUrl = process.env.VITE_SHELL_URL ?? "http://localhost:5170";

export default defineConfig({
  build: { target: "esnext" },
  plugins: [
    vue(),
    tailwindcss(),
    federation({
      exposes: { "./routes": "./src/routes.ts" },
      filename: "remoteEntry.js",
      name: "userPortal",
      remotes: {
        shell: {
          entry: `${shellUrl}/remoteEntry.js`,
          name: "shell",
          type: "module",
        },
      },
      shared: {
        vue: { singleton: true },
        "vue-router": { singleton: true },
      },
    }),
  ],
  server: { origin: "http://localhost:5171", port: 5171, strictPort: true },
});
