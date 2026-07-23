import { fileURLToPath, URL } from "node:url";

import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import browserslist from "browserslist";
import { browserslistToTargets } from "lightningcss";
import { visualizer } from "rollup-plugin-visualizer";
import AutoImport from "unplugin-auto-import/vite";
import Component from "unplugin-vue-components/vite";
import type { PluginOption } from "vite";
import { defineConfig } from "vite";
import Layouts from "vite-plugin-vue-layouts";
import { VueRouterAutoImports } from "vue-router/unplugin";
import VueRouter from "vue-router/vite";

const RouteGenerateExclude = [
  "**/components/**",
  "**/layouts/**",
  "**/data/**",
  "**/types/**",
];

export default defineConfig({
  css: {
    lightningcss: {
      targets: browserslistToTargets(browserslist(["> 1%", "last 2 versions"])),
    },
    transformer: "lightningcss",
  },
  plugins: [
    VueRouter({
      dts: "src/types/route-map.d.ts",
      exclude: RouteGenerateExclude,
    }),
    vue(),
    tailwindcss(),
    visualizer({ brotliSize: true, gzipSize: true }) as PluginOption,
    Layouts({
      defaultLayout: "default",
    }),
    AutoImport({
      defaultExportByFilename: true,
      dirs: [
        "src/composables/**/*.ts",
        "src/constants/**/*.ts",
        "src/stores/**/*.ts",
      ],
      dts: "src/types/auto-import.d.ts",
      imports: ["vue", VueRouterAutoImports],
      include: [/\.[tj]sx?$/, /\.vue$/],
    }),
    Component({
      collapseSamePrefixes: true,
      directoryAsNamespace: true,
      dirs: ["src/components"],
      dts: "src/types/auto-import-components.d.ts",
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
