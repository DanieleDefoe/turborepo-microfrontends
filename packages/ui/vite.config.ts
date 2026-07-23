/// <reference types="vitest/config" />
import { fileURLToPath, URL } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
import { mergeVueImportsInStories } from './plugins/merge-vue-imports'
import VueStories from 'storybook-vue-addon/vite';

export default defineConfig({
  plugins: [vue({ exclude: [/\.stories\.vue$/] }), tailwindcss(), mergeVueImportsInStories()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  test: {
    projects: [{
      extends: true,
      plugins: [
        storybookTest({
          configDir: fileURLToPath(new URL('.storybook', import.meta.url))
        }),
        VueStories()
      ],
      test: {
        name: 'storybook',
        browser: {
          enabled: true,
          headless: true,
          provider: playwright({}),
          instances: [{
            browser: 'chromium'
          }]
        }
      }
    }]
  }
});
