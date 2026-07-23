import { federation } from "@module-federation/vite";
import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

const remoteUrls = {
  userPortal: process.env.VITE_USER_PORTAL_URL ?? "http://localhost:5171",
  webEditor: process.env.VITE_WEB_EDITOR_URL ?? "http://localhost:5172",
};

function remote(name: keyof typeof remoteUrls) {
  return {
    entry: `${remoteUrls[name]}/remoteEntry.js`,
    name,
    type: "module" as const,
  };
}

export default defineConfig({
  build: { target: "esnext" },
  plugins: [
    vue(),
    tailwindcss(),
    federation({
      dts: false,
      exposes: { "./auth": "./src/auth.ts" },
      filename: "remoteEntry.js",
      name: "shell",
      remotes: {
        userPortal: remote("userPortal"),
        webEditor: remote("webEditor"),
      },
      shared: {
        vue: { singleton: true },
        "vue-router": { singleton: true },
      },
    }),
  ],
  server: { origin: "http://localhost:5170", port: 5170, strictPort: true },
});
