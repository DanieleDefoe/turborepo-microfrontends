import type {Plugin} from 'vite'

export const mergeVueImportsInStories = (): Plugin => {
    const vueImport = /import\s*\{([^}]*)\}\s*from\s*["']vue["'];?/g;
    return {
      name: 'merge-vue-imports-in-stories',
      enforce: 'post',
      transform(code, id) {
        if (!id.includes('.stories.vue')) return;
        const specifiers = new Set<string>();
        let hits = 0;
        for (const match of code.matchAll(vueImport)) {
          hits++;
          for (const spec of match[1].split(',')) {
            const trimmed = spec.trim();
            if (trimmed) specifiers.add(trimmed);
          }
        }
        if (hits < 2) return;
        return {
          code: `import { ${[...specifiers].join(', ')} } from 'vue';\n${code.replace(vueImport, '')}`,
          map: null,
        };
      },
    };
}