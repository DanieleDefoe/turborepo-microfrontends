# MFE Shell + Remotes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Working microfrontend example: `@ap/shell` host (chrome + router + mock auth) federating `@ap/user-portal` and `@ap/web-editor` remotes via `@module-federation/vite`, per `docs/superpowers/specs/2026-07-24-mfe-shell-remotes-design.md`.

**Architecture:** Remotes expose `./routes` (`RouteRecordRaw[]`); the shell mounts them as children under `/portal` and `/editor` inside its layout. Shell exposes `./auth`. `vue`/`vue-router` are MF singletons pinned via the pnpm catalog. Remotes are built standalone-first (no shell dependency), shell last, then the cross-import.

**Tech Stack:** Vue 3.5, Vite 8, `@module-federation/vite`, vue-router 5, `@ap/typescript`, `@ap/ui`, Tailwind 4.

## Global Constraints

- All apps: `@ap/typescript` 3-file tsconfig pattern, byte-identical (`tsconfig.json` solution + `tsconfig.app.json` extends `@ap/typescript/dom.json` + `tsconfig.node.json` extends `@ap/typescript/node.json`).
- Catalog-pinned: `typescript: catalog:` (exists), add `vue: ^3.5.40`, `vue-router: ^5.2.0`, `@module-federation/vite: ^<latest>` (Task 1 Step 1 resolves the version).
- Ports: shell 5170, user-portal 5171, web-editor 5172 (`strictPort`). Remote URLs override via `VITE_USER_PORTAL_URL`/`VITE_WEB_EDITOR_URL`/`VITE_SHELL_URL`, localhost defaults.
- MF `shared`: `{ vue: { singleton: true }, 'vue-router': { singleton: true } }` — nothing else shared. `@ap/ui` bundled per app (spec non-goal).
- `build.target: 'esnext'` in every federated app (module-type remote entries use top-level await).
- No pinia, no axios, no token code — auth is the shell's mock `useAuth()` with the BFF seam comment (spec Auth section).
- `verbatimModuleSyntax` is inherited: use `import type` for type-only imports.
- Every app CSS: `@import "@ap/ui/styles.css";` + `@source "../../../../packages/ui/src";` (utilities for `@ap/ui` markup).
- Deviation from spec noted: documents page uses Table only (no Skeleton — there's no async load to skeletonize; fake loading is worse than none).

---

### Task 1: user-portal remote (standalone-complete)

**Files:**
- Modify: `pnpm-workspace.yaml` (catalog additions)
- Create: `apps/user-portal/package.json`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, `index.html`, `vite.config.ts`, `src/main.ts`, `src/routes.ts`, `src/assets/index.css`, `src/pages/profile.vue`, `src/pages/settings.vue`

**Interfaces:**
- Produces: MF remote `userPortal` at `:5171`, module `userPortal/routes` = default-exported `RouteRecordRaw[]` with relative child paths (`''`, `'settings'`). Task 3 consumes it.

- [ ] **Step 1: Pin versions in the catalog**

```bash
npm view @module-federation/vite version   # note MAJOR.MINOR, use ^MAJOR.MINOR below
```

In `pnpm-workspace.yaml` extend the catalog (keep existing keys):

```yaml
catalog:
  typescript: ^6.0.0
  vue: ^3.5.40
  vue-router: ^5.2.0
  "@module-federation/vite": ^<resolved-version>
```

- [ ] **Step 2: Create the app files**

`apps/user-portal/package.json`:

```json
{
  "name": "@ap/user-portal",
  "type": "module",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc -b && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@ap/ui": "workspace:*",
    "vue": "catalog:",
    "vue-router": "catalog:"
  },
  "devDependencies": {
    "@ap/typescript": "workspace:*",
    "@module-federation/vite": "catalog:",
    "@tailwindcss/vite": "^4.3.3",
    "@types/node": "^26.1.1",
    "@vitejs/plugin-vue": "^6.0.8",
    "tailwindcss": "^4.3.3",
    "typescript": "catalog:",
    "vite": "^8.1.5",
    "vue-tsc": "^3.3.8"
  }
}
```

`apps/user-portal/tsconfig.json`:

```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.node.json" },
    { "path": "./tsconfig.app.json" }
  ]
}
```

`apps/user-portal/tsconfig.app.json`:

```json
{
  "extends": "@ap/typescript/dom.json"
}
```

`apps/user-portal/tsconfig.node.json`:

```json
{
  "extends": "@ap/typescript/node.json"
}
```

`apps/user-portal/index.html`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>User Portal (standalone)</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

`apps/user-portal/vite.config.ts` (declares the `shell` remote now — consumed in Task 4):

```ts
import { federation } from '@module-federation/vite';
import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

const shellUrl = process.env.VITE_SHELL_URL ?? 'http://localhost:5170';

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    federation({
      name: 'userPortal',
      filename: 'remoteEntry.js',
      exposes: { './routes': './src/routes.ts' },
      remotes: {
        shell: { type: 'module', name: 'shell', entry: `${shellUrl}/remoteEntry.js` },
      },
      shared: {
        vue: { singleton: true },
        'vue-router': { singleton: true },
      },
    }),
  ],
  build: { target: 'esnext' },
  server: { port: 5171, origin: 'http://localhost:5171', strictPort: true },
});
```

`apps/user-portal/src/assets/index.css`:

```css
@import "@ap/ui/styles.css";
@source "../../../../packages/ui/src";
```

`apps/user-portal/src/routes.ts` (the exposed contract):

```ts
import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  { path: '', name: 'portal-profile', component: () => import('./pages/profile.vue') },
  { path: 'settings', name: 'portal-settings', component: () => import('./pages/settings.vue') },
];

export default routes;
```

`apps/user-portal/src/main.ts`:

```ts
import { createApp, h } from 'vue';
import { createRouter, createWebHistory, RouterView } from 'vue-router';
import routes from './routes';
import './assets/index.css';

// Standalone dev harness only — the shell never imports this file.
const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/', children: routes }],
});

createApp({ render: () => h(RouterView) })
  .use(router)
  .mount('#app');
```

`apps/user-portal/src/pages/profile.vue` (auth chip added in Task 4):

```vue
<script setup lang="ts">
  import { Button } from '@ap/ui/components/button';
  import { Input } from '@ap/ui/components/input';
  import { ref } from 'vue';

  const name = ref('Ada Lovelace');
  const email = ref('ada@example.com');
</script>

<template>
  <section class="max-w-md space-y-4">
    <h1 class="font-semibold text-lg">Profile</h1>
    <label class="grid gap-1.5 font-medium text-sm">Name<Input v-model="name" /></label>
    <label class="grid gap-1.5 font-medium text-sm">Email<Input v-model="email" type="email" /></label>
    <Button>Save</Button>
  </section>
</template>
```

`apps/user-portal/src/pages/settings.vue`:

```vue
<script setup lang="ts">
  import { NativeSelect, NativeSelectOption } from '@ap/ui/components/native-select';
  import { Switch } from '@ap/ui/components/switch';
  import { ref } from 'vue';

  const notifications = ref(true);
  const language = ref('en');
</script>

<template>
  <section class="max-w-md space-y-4">
    <h1 class="font-semibold text-lg">Settings</h1>
    <label class="flex items-center gap-3 font-medium text-sm">
      <Switch v-model="notifications" />
      Email notifications
    </label>
    <label class="grid gap-1.5 font-medium text-sm">
      Language
      <NativeSelect v-model="language">
        <NativeSelectOption value="en">English</NativeSelectOption>
        <NativeSelectOption value="ru">Русский</NativeSelectOption>
      </NativeSelect>
    </label>
  </section>
</template>
```

- [ ] **Step 3: Install + verify standalone**

```bash
pnpm install
pnpm --filter @ap/user-portal build
ls apps/user-portal/dist/remoteEntry.js        # must exist
```

Expected: build green (`vue-tsc -b` + vite), `remoteEntry.js` emitted. Then dev:

```bash
pnpm --filter @ap/user-portal dev &   # :5171
curl -sI http://localhost:5171 | head -1      # HTTP/1.1 200 OK
curl -s http://localhost:5171/remoteEntry.js | head -3   # JS module, not 404
```

- [ ] **Step 4: Commit**

```bash
git add pnpm-workspace.yaml pnpm-lock.yaml apps/user-portal
git commit -m "feat(user-portal): federated remote exposing ./routes"
```

---

### Task 2: web-editor remote

**Files:**
- Create: `apps/web-editor/package.json`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, `index.html`, `vite.config.ts`, `src/main.ts`, `src/routes.ts`, `src/assets/index.css`, `src/pages/editor.vue`, `src/pages/documents.vue`

**Interfaces:**
- Produces: MF remote `webEditor` at `:5172`, module `webEditor/routes` (same contract as Task 1). No `shell` remote — this app consumes no auth (spec: only wire what's consumed).

- [ ] **Step 1: Create the app files**

`package.json`, three tsconfigs, `index.html`, `src/assets/index.css`: identical to Task 1's files with `user-portal` → `web-editor`, `@ap/user-portal` → `@ap/web-editor`, title `Web Editor (standalone)`.

`apps/web-editor/vite.config.ts` (no `remotes` block):

```ts
import { federation } from '@module-federation/vite';
import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    federation({
      name: 'webEditor',
      filename: 'remoteEntry.js',
      exposes: { './routes': './src/routes.ts' },
      shared: {
        vue: { singleton: true },
        'vue-router': { singleton: true },
      },
    }),
  ],
  build: { target: 'esnext' },
  server: { port: 5172, origin: 'http://localhost:5172', strictPort: true },
});
```

`apps/web-editor/src/routes.ts`:

```ts
import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  { path: '', name: 'editor', component: () => import('./pages/editor.vue') },
  { path: 'documents', name: 'editor-documents', component: () => import('./pages/documents.vue') },
];

export default routes;
```

`apps/web-editor/src/main.ts`: identical to Task 1's `main.ts`.

`apps/web-editor/src/pages/editor.vue`:

```vue
<script setup lang="ts">
  import { Button } from '@ap/ui/components/button';
  import { ref } from 'vue';

  const content = ref('# Hello\n\nStart typing…');
  const saved = ref(false);
  const SAVED_FLASH_MS = 1500;

  function save() {
    saved.value = true;
    setTimeout(() => {
      saved.value = false;
    }, SAVED_FLASH_MS);
  }
</script>

<template>
  <section class="flex h-full flex-col gap-3">
    <div class="flex items-center gap-2">
      <h1 class="font-semibold text-lg">Editor</h1>
      <Button size="sm" @click="save">Save</Button>
      <span v-if="saved" class="text-muted-foreground text-sm">Saved ✓</span>
    </div>
    <textarea
      v-model="content"
      class="min-h-64 w-full flex-1 rounded-lg border border-input bg-transparent p-3 font-mono text-sm outline-none focus-visible:ring-2"
    />
  </section>
</template>
```

`apps/web-editor/src/pages/documents.vue`:

```vue
<script setup lang="ts">
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from '@ap/ui/components/table';

  const documents = [
    { id: 1, title: 'Quarterly report', updated: '2026-07-20' },
    { id: 2, title: 'Design notes', updated: '2026-07-18' },
    { id: 3, title: 'Meeting minutes', updated: '2026-07-12' },
  ];
</script>

<template>
  <section class="max-w-2xl space-y-4">
    <h1 class="font-semibold text-lg">Documents</h1>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Updated</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="doc in documents" :key="doc.id">
          <TableCell>{{ doc.title }}</TableCell>
          <TableCell>{{ doc.updated }}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </section>
</template>
```

- [ ] **Step 2: Install + verify standalone**

```bash
pnpm install
pnpm --filter @ap/web-editor build && ls apps/web-editor/dist/remoteEntry.js
pnpm --filter @ap/web-editor dev &
curl -sI http://localhost:5172 | head -1   # 200 OK
```

- [ ] **Step 3: Commit**

```bash
git add apps/web-editor pnpm-lock.yaml
git commit -m "feat(web-editor): federated remote exposing ./routes"
```

---

### Task 3: shell host (chrome + router + auth + degradation)

**Files:**
- Create: `apps/shell/package.json`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, `index.html`, `vite.config.ts`, `src/main.ts`, `src/App.vue`, `src/router.ts`, `src/auth.ts`, `src/remotes.d.ts`, `src/assets/index.css`, `src/pages/home.vue`, `src/pages/login.vue`, `src/pages/unavailable.vue`

**Interfaces:**
- Consumes: `userPortal/routes`, `webEditor/routes` (Tasks 1–2).
- Produces: MF host+remote `shell` at `:5170` exposing `./auth`: `useAuth(): { user: ComputedRef<AuthUser | null>; login(u: string, p: string): boolean; logout(): void }`, `interface AuthUser { username: string }`. Task 4 consumes it.

- [ ] **Step 1: Create the app files**

`package.json`, three tsconfigs, `index.html` (title `AP Console`), `src/assets/index.css`: same pattern as Task 1 with `@ap/shell` / `shell`.

`apps/shell/vite.config.ts`:

```ts
import { federation } from '@module-federation/vite';
import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

const remoteUrls = {
  userPortal: process.env.VITE_USER_PORTAL_URL ?? 'http://localhost:5171',
  webEditor: process.env.VITE_WEB_EDITOR_URL ?? 'http://localhost:5172',
};

function remote(name: keyof typeof remoteUrls) {
  return { type: 'module' as const, name, entry: `${remoteUrls[name]}/remoteEntry.js` };
}

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    federation({
      name: 'shell',
      filename: 'remoteEntry.js',
      exposes: { './auth': './src/auth.ts' },
      remotes: {
        userPortal: remote('userPortal'),
        webEditor: remote('webEditor'),
      },
      shared: {
        vue: { singleton: true },
        'vue-router': { singleton: true },
      },
    }),
  ],
  build: { target: 'esnext' },
  server: { port: 5170, origin: 'http://localhost:5170', strictPort: true },
});
```

`apps/shell/src/auth.ts`:

```ts
import { computed, reactive } from 'vue';

export interface AuthUser {
  username: string;
}

// ponytail: mock auth — swap internals to BFF endpoints (user ← GET /api/me,
// login → redirect to BFF login, logout → BFF logout); callers unchanged.
// Tokens must never live in JS — see the design spec (BFF pattern).
const state = reactive<{ user: AuthUser | null }>({
  user: JSON.parse(localStorage.getItem('shell.user') ?? 'null') as AuthUser | null,
});

export function useAuth() {
  return {
    user: computed(() => state.user),
    login(username: string, password: string): boolean {
      if (!(username && password)) {
        return false;
      }
      state.user = { username };
      localStorage.setItem('shell.user', JSON.stringify(state.user));
      return true;
    },
    logout() {
      state.user = null;
      localStorage.removeItem('shell.user');
    },
  };
}
```

`apps/shell/src/remotes.d.ts`:

```ts
declare module 'userPortal/routes' {
  import type { RouteRecordRaw } from 'vue-router';

  const routes: RouteRecordRaw[];
  export default routes;
}

declare module 'webEditor/routes' {
  import type { RouteRecordRaw } from 'vue-router';

  const routes: RouteRecordRaw[];
  export default routes;
}
```

`apps/shell/src/router.ts`:

```ts
import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';
import { useAuth } from './auth';
import Unavailable from './pages/unavailable.vue';

async function sectionRoutes(
  path: string,
  load: () => Promise<{ default: RouteRecordRaw[] }>
): Promise<RouteRecordRaw[]> {
  try {
    return [{ path, children: (await load()).default }];
  } catch {
    // Remote down at startup — degrade this section only, keep nav alive.
    return [
      { path, component: Unavailable },
      { path: `${path}/:rest(.*)*`, component: Unavailable },
    ];
  }
}

export async function createShellRouter() {
  const routes: RouteRecordRaw[] = [
    { path: '/', component: () => import('./pages/home.vue') },
    { path: '/login', component: () => import('./pages/login.vue'), meta: { public: true } },
    ...(await sectionRoutes('/portal', () => import('userPortal/routes'))),
    ...(await sectionRoutes('/editor', () => import('webEditor/routes'))),
    { path: '/:rest(.*)*', redirect: '/' },
  ];

  const router = createRouter({ history: createWebHistory(), routes });

  router.beforeEach((to) => {
    const { user } = useAuth();
    if (!(to.meta.public || user.value)) {
      return { path: '/login', query: { redirect: to.fullPath } };
    }
    return true;
  });

  // A remote redeployed/killed after startup: one full reload lands on the
  // startup fallback instead of a dead lazy chunk.
  router.onError((error, to) => {
    if (String(error).includes('Failed to fetch')) {
      window.location.assign(to.fullPath);
    }
  });

  return router;
}
```

`apps/shell/src/main.ts`:

```ts
import { createApp } from 'vue';
import App from './App.vue';
import { createShellRouter } from './router';
import './assets/index.css';

async function bootstrap() {
  const app = createApp(App);
  app.use(await createShellRouter());
  app.mount('#app');
}

void bootstrap();
```

`apps/shell/src/App.vue`:

```vue
<script setup lang="ts">
  import { Button } from '@ap/ui/components/button';
  import { Separator } from '@ap/ui/components/separator';
  import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger,
  } from '@ap/ui/components/sidebar';
  import { useRoute, useRouter } from 'vue-router';
  import { useAuth } from './auth';

  const route = useRoute();
  const router = useRouter();
  const auth = useAuth();

  const nav = [
    { title: 'Home', to: '/' },
    { title: 'User Portal', to: '/portal' },
    { title: 'Portal Settings', to: '/portal/settings' },
    { title: 'Web Editor', to: '/editor' },
    { title: 'Documents', to: '/editor/documents' },
  ];

  function signOut() {
    auth.logout();
    void router.push('/login');
  }
</script>

<template>
  <router-view v-if="route.meta.public" />
  <SidebarProvider v-else>
    <Sidebar>
      <SidebarHeader class="p-2 font-semibold text-sm">AP Console</SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Sections</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem v-for="item in nav" :key="item.to">
                <SidebarMenuButton :is-active="route.path === item.to" as-child>
                  <router-link :to="item.to">{{ item.title }}</router-link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter class="p-2 text-muted-foreground text-xs">
        {{ auth.user.value?.username }}
      </SidebarFooter>
    </Sidebar>
    <SidebarInset>
      <header class="flex h-12 items-center gap-2 border-b px-4">
        <SidebarTrigger />
        <Separator class="h-4" orientation="vertical" />
        <span class="font-medium text-sm">Microfrontends Example</span>
        <Button class="ml-auto" size="sm" variant="ghost" @click="signOut">Sign out</Button>
      </header>
      <main class="flex-1 p-4">
        <router-view />
      </main>
      <footer class="border-t px-4 py-2 text-muted-foreground text-xs">
        shell · user-portal · web-editor — powered by @module-federation/vite
      </footer>
    </SidebarInset>
  </SidebarProvider>
</template>
```

`apps/shell/src/pages/home.vue`:

```vue
<template>
  <section class="space-y-2">
    <h1 class="font-semibold text-lg">Welcome</h1>
    <p class="text-muted-foreground text-sm">
      This shell hosts federated sections. Pick one in the sidebar — User Portal
      and Web Editor are separate builds loaded at runtime.
    </p>
  </section>
</template>
```

`apps/shell/src/pages/login.vue`:

```vue
<script setup lang="ts">
  import { Button } from '@ap/ui/components/button';
  import { Input } from '@ap/ui/components/input';
  import { ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useAuth } from '../auth';

  const auth = useAuth();
  const route = useRoute();
  const router = useRouter();
  const username = ref('');
  const password = ref('');
  const failed = ref(false);

  function submit() {
    failed.value = !auth.login(username.value, password.value);
    if (!failed.value) {
      void router.push(String(route.query.redirect ?? '/'));
    }
  }
</script>

<template>
  <main class="grid min-h-svh place-items-center">
    <form class="w-80 space-y-4 rounded-xl border p-6" @submit.prevent="submit">
      <h1 class="font-semibold text-lg">Sign in</h1>
      <label class="grid gap-1.5 font-medium text-sm">
        Username<Input v-model="username" autocomplete="username" />
      </label>
      <label class="grid gap-1.5 font-medium text-sm">
        Password<Input v-model="password" type="password" autocomplete="current-password" />
      </label>
      <p v-if="failed" class="text-destructive text-sm">Enter any username and password.</p>
      <Button class="w-full" type="submit">Sign in</Button>
    </form>
  </main>
</template>
```

`apps/shell/src/pages/unavailable.vue`:

```vue
<template>
  <section class="grid place-items-center py-16 text-center">
    <div class="space-y-2">
      <h1 class="font-semibold text-lg">Section unavailable</h1>
      <p class="text-muted-foreground text-sm">
        This microfrontend could not be loaded. It may be deploying — try again shortly.
      </p>
    </div>
  </section>
</template>
```

- [ ] **Step 2: Install + build**

```bash
pnpm install
pnpm --filter @ap/shell build && ls apps/shell/dist/remoteEntry.js
```

Expected: green build; `remoteEntry.js` (shell's `./auth` export) emitted.

- [ ] **Step 3: System dev verification**

```bash
pnpm --filter @ap/user-portal dev &   # :5171
pnpm --filter @ap/web-editor dev &    # :5172
pnpm --filter @ap/shell dev &         # :5170
curl -sI http://localhost:5170 | head -1   # 200 OK
```

Browser checks (Playwright MCP): `http://localhost:5170` → redirected to `/login`; sign in (any credentials) → chrome renders; `/portal` shows Profile page inside sidebar layout; `/editor/documents` shows the table; sidebar footer shows the username.

- [ ] **Step 4: Degradation check**

Kill the user-portal dev server, reload `http://localhost:5170/portal` → "Section unavailable" panel inside the chrome; `/editor` still works. Restart portal.

- [ ] **Step 5: Commit**

```bash
git add apps/shell pnpm-lock.yaml
git commit -m "feat(shell): MF host — chrome, router, mock auth, remote degradation"
```

---

### Task 4: portal consumes shell/auth + final verification

**Files:**
- Create: `apps/user-portal/src/shell.d.ts`
- Modify: `apps/user-portal/src/pages/profile.vue`

**Interfaces:**
- Consumes: `shell/auth` (Task 3's exposed `useAuth`, exact signature in `shell.d.ts` below).

- [ ] **Step 1: Type the federated module**

`apps/user-portal/src/shell.d.ts`:

```ts
declare module 'shell/auth' {
  import type { ComputedRef } from 'vue';

  export interface AuthUser {
    username: string;
  }

  export function useAuth(): {
    user: ComputedRef<AuthUser | null>;
    login(username: string, password: string): boolean;
    logout(): void;
  };
}
```

- [ ] **Step 2: Consume it resiliently in `profile.vue`**

Replace the `<script setup>` block and add the chip to the template:

```vue
<script setup lang="ts">
  import { Button } from '@ap/ui/components/button';
  import { Input } from '@ap/ui/components/input';
  import { onMounted, ref } from 'vue';

  const name = ref('Ada Lovelace');
  const email = ref('ada@example.com');
  const username = ref<string | null>(null);

  onMounted(async () => {
    try {
      // Federated import, resolved by the shell at runtime. Guarded so the
      // standalone harness (no shell running) still renders.
      const { useAuth } = await import('shell/auth');
      username.value = useAuth().user.value?.username ?? null;
    } catch {
      username.value = null;
    }
  });
</script>

<template>
  <section class="max-w-md space-y-4">
    <h1 class="font-semibold text-lg">Profile</h1>
    <p v-if="username" class="text-muted-foreground text-sm">
      Signed in as {{ username }} (via shell/auth)
    </p>
    <label class="grid gap-1.5 font-medium text-sm">Name<Input v-model="name" /></label>
    <label class="grid gap-1.5 font-medium text-sm">Email<Input v-model="email" type="email" /></label>
    <Button>Save</Button>
  </section>
</template>
```

- [ ] **Step 3: Full verification sweep**

```bash
pnpm --filter @ap/user-portal build   # vue-tsc must accept shell.d.ts + federated import
```

With all three dev servers up: `/portal` profile page shows "Signed in as `<username>` (via shell/auth)". Standalone `:5171/` still renders profile (no chip, no crash).

```bash
pnpm build          # turbo: all workspace builds green
```

- [ ] **Step 4: Commit**

```bash
git add apps/user-portal
git commit -m "feat(user-portal): consume shell/auth across the MF boundary"
```

---

## Self-Review

**Spec coverage:** topology/ports/catalog → T1–T3; routes contract + typing → T1/T2 (`routes.ts`), T3 (`remotes.d.ts`), T4 (`shell.d.ts`); auth + guard + public login + BFF-seam comment → T3; shell exposes `./auth` + remote consumption → T3/T4; failure handling (startup fallback + `onError`) → T3 router + Step 4; styling (`@ap/ui/styles.css` + `@source`) → every app's css; verification incl. kill-remote → T3 S3–S4, T4 S3. Skeleton dropped from documents page — recorded in Global Constraints as a deviation.

**Placeholders:** none — every file's full content is present; T2's repeats-by-reference name exact substitutions only for identical boilerplate.

**Type consistency:** `useAuth` signature identical in `auth.ts` (T3), `shell.d.ts` (T4); route modules default-export `RouteRecordRaw[]` everywhere; MF names `userPortal`/`webEditor`/`shell` consistent across configs and `.d.ts` declarations.
