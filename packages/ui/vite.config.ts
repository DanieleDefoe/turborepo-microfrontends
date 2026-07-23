/// <reference types="vitest/config" />
import { fileURLToPath, URL } from "node:url";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import { playwright } from "@vitest/browser-playwright";
import VueStories from "storybook-vue-addon/vite";
import { defineConfig } from "vite";
import { mergeVueImportsInStories } from "./plugins/merge-vue-imports";

export default defineConfig({
  plugins: [
    vue({ exclude: [/\.stories\.vue$/] }),
    tailwindcss(),
    mergeVueImportsInStories(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    projects: [
      {
        extends: true,
        plugins: [
          storybookTest({
            configDir: fileURLToPath(new URL(".storybook", import.meta.url)),
          }),
          VueStories(),
        ],
        test: {
          browser: {
            enabled: true,
            headless: true,
            instances: [
              {
                browser: "chromium",
              },
            ],
            provider: playwright({}),
          },
          name: "storybook",
        },
      },
    ],
  },
});
