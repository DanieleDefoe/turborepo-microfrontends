# Microfrontends: shell + user-portal + web-editor — Design Spec

**Goal:** An example microfrontend system on the official `@module-federation/vite` plugin: a thin host (`@ap/shell`) owning layout chrome (header/sidebar/footer), routing, and auth; two remotes (`@ap/user-portal`, `@ap/web-editor`) whose pages render inside the shell layout via runtime-federated route arrays.

**Framework decision:** Plain Vue 3 + Vite 8 — not Nuxt. Nuxt has no official Module Federation support (open discussions nuxt#18430/#31277; SSR mode known-broken with federation plugins), and its build-time file-based routing conflicts with our runtime route-injection contract. Nuxt remains a candidate for `apps/landing` (SEO/SSG) only, which does not participate in federation.

## Non-goals (explicit, to keep the build minimal)

- No pinia — shell auth state is a plain reactive composable.
- No MF-sharing of `@ap/ui` — it's a source/JIT package; each app bundles the tree-shaken components it uses. Upgrade path: share as MF singleton once `@ap/ui` ships versioned builds.
- No runtime `registerRemotes`/dynamic remote discovery — static remote config with env-var URLs. Upgrade path: MF 2.0 runtime API when remotes must be added without redeploying the shell.
- No MF auto-DTS — one `remotes.d.ts` per consumer (2–4 lines each).
- No dashboard/landing involvement. No shared vite-config package (3 small configs; extract only if apps multiply).
- Mock credentials auth — the design isolates the swap seam (mock → BFF/OIDC) in the shell only. No hand-rolled JWT/interceptor/refresh stack, by decision (see Auth).

## Topology

```
apps/shell        @ap/shell        host   port 5170   exposes ./auth
apps/user-portal  @ap/user-portal  remote port 5171   exposes ./routes
apps/web-editor   @ap/web-editor   remote port 5172   exposes ./routes
```

- All three: Vue 3 + Vite 8 + `@module-federation/vite`, `@ap/typescript` 3-file tsconfig pattern (byte-identical per CLAUDE.md convention), root ultracite/Biome, `@ap/ui` components + `@ap/ui/styles.css`.
- **Version pinning via pnpm catalog** (single source for MF singleton alignment): add `vue`, `vue-router`, `@module-federation/vite` to the catalog in `pnpm-workspace.yaml`; all three apps use `catalog:`. (`typescript: catalog:` already established.)
- Remote URLs in the shell come from `VITE_USER_PORTAL_URL` / `VITE_WEB_EDITOR_URL` with `http://localhost:5171` / `:5172` defaults — dev works with zero env; prod is config.
- Each app sets Vite `server.port` (fixed, above) and `server.origin` (plugin requirement).

## The contract

**Each remote exposes exactly one module, `./routes`: a default-exported `RouteRecordRaw[]`** with lazy `component: () => import(...)` entries and paths relative to their mount point.

- Shell router mounts them under `/portal` and `/editor` as `children`, loaded at router-setup time via `import('userPortal/routes')` / `import('webEditor/routes')`.
- One Vue app, one router, one history. Remote pages render in the shell's `<router-view>` inside the chrome. Deep links work with no extra glue.
- **Shared singletons: `vue` and `vue-router` only**, `singleton: true` + `requiredVersion` from the catalog range.
- Typing: `src/remotes.d.ts` in the shell declares the two `*/routes` modules; each remote has a 2-line `shell.d.ts` for `shell/auth`.

## Auth (shell-owned, BFF-shaped)

**Target architecture (researched 2026-07):** the modern consensus for SPA auth is the **BFF / token-handler pattern** — a small same-origin backend performs OIDC Authorization-Code+PKCE against the IdP (e.g. self-hosted Keycloak) and keeps all tokens server-side; the browser holds only an HttpOnly SameSite session cookie. Tokens never exist in JavaScript, so the classic hand-rolled stack (axios interceptors, access token in pinia, refresh-token rotation, silent-renew iframes) is deliberately **not** built — it is the legacy pattern the guidance moves away from (XSS-exfiltratable tokens; renew iframes broken by third-party-cookie phase-outs). Sources: Duende "Secure Vue apps with OIDC & BFF", Abblix BFF guide, OWASP token-storage guidance.

This is also the best MFE fit: the session cookie is ambient, so every remote's API calls carry it automatically — zero token plumbing across MF boundaries, zero per-remote interceptors; remotes contain no auth code at all. Browser-side fallback if a BFF is ever impossible: `oidc-client-ts` with in-memory tokens (plan B only).

**In this example app** (no backend yet), the shell ships a mock with the BFF-compatible seam:

- `apps/shell/src/auth.ts`: `useAuth()` — plain `reactive` `{ user, login(), logout() }`. Mock: credential check + `localStorage`. The API is async-shaped so the real impl is a drop-in: `user` ← `GET /api/me`, `login()` ← redirect to BFF login, `logout()` ← BFF logout. Marked `ponytail: mock auth — swap internals to BFF endpoints, callers unchanged`.
- Shell `/login` page (`@ap/ui` Input/Button); global `router.beforeEach`: unauthenticated and route not `meta.public` → redirect `/login`. Remote routes are protected by default; a remote opts out per-route with `meta: { public: true }`.
- **Shell exposes `./auth`** (hosts can expose): remotes import `shell/auth` to read the user (portal profile page consumes it). Swapping mock → BFF touches `auth.ts` + `/login` only; remotes and contract unchanged.
- Login renders without chrome: `App.vue` renders plain `<router-view>` when `route.meta.public`, full chrome otherwise (one conditional, no layout system).

## Failure handling

A dead remote must not kill the shell:

- Router setup wraps each `import('*/routes')` in a `catch` that registers a fallback route rendering `pages/unavailable.vue` ("section unavailable") inside the layout.
- `router.onError` catches post-startup lazy-chunk failures and redirects to the same page.
- Nav stays visible for all sections; only the dead section degrades.

## Styling

Every app imports `@ap/ui/styles.css` (design tokens + base; idempotent if loaded again at runtime) and runs its own Tailwind (`@tailwindcss/vite`) with `@source` covering its own `src` + `packages/ui/src` — each remote's CSS chunk carries the utilities its own markup needs and loads with its federated modules.

## File inventory

**apps/shell** — `package.json`, 3 tsconfigs, `index.html`, `vite.config.ts` (federation: name `shell`, remotes `userPortal`/`webEditor`, exposes `./auth`, shared singletons), `src/main.ts`, `src/App.vue` (chrome: `@ap/ui` sidebar/separator/button + header/footer; conditional plain view for public routes), `src/router.ts` (own routes + federated children + guard + fallback), `src/auth.ts`, `src/remotes.d.ts`, `src/assets/index.css`, `src/pages/home.vue`, `src/pages/login.vue`, `src/pages/unavailable.vue`.

**apps/user-portal** — `package.json`, 3 tsconfigs, `index.html`, `vite.config.ts` (name `userPortal`, exposes `./routes`, remotes `shell`, shared singletons), `src/main.ts` (standalone dev harness: tiny router over its own routes), `src/routes.ts`, `src/shell.d.ts`, `src/assets/index.css`, `src/pages/profile.vue` (shows `shell/auth` user; `@ap/ui` Input/Button form), `src/pages/settings.vue` (`@ap/ui` Switch/NativeSelect).

**apps/web-editor** — same shape, except: no `shell` remote and no `shell.d.ts` (its pages don't consume auth — only wire what's consumed); `src/pages/editor.vue` (textarea "editor" + `@ap/ui` Button toolbar), `src/pages/documents.vue` (`@ap/ui` Table + Skeleton).

Remote `main.ts` standalone harnesses mount the remote alone (isolated dev/build proof); the shell never uses them.

## Verification

1. Per app: `vue-tsc -b` green; `vite build` emits `remoteEntry.js` for remotes.
2. `turbo dev` (3 servers): shell `:5170` serves 200; `/portal/profile` and `/editor` render remote pages inside shell chrome (Playwright check); unauthenticated hit redirects to `/login`; after mock login, guard passes.
3. Kill the user-portal dev server → `/portal` shows the unavailable panel; shell + editor unaffected.
4. `pnpm exec ultracite check apps/shell apps/user-portal apps/web-editor` — 0 errors.

## Deferred (recorded upgrade paths)

| Deferred | Trigger to revisit |
|---|---|
| BFF service + IdP (Keycloak) integration | first real backend/API for these apps |
| Passkeys/WebAuthn — enable at the IdP (Keycloak WebAuthn), no frontend work; first-party fallback: SimpleWebAuthn RP endpoints in the BFF | SSO/IdP lands |
| `@ap/ui` as MF shared singleton | `@ap/ui` ships versioned dist builds |
| Runtime `registerRemotes` / manifest discovery | remotes must deploy without shell redeploy |
| Pinia / cross-MFE event bus | first real cross-remote state need |
| MF auto-DTS | contract grows beyond `./routes` + `./auth` |
| Nuxt for `apps/landing` | landing gets built (SEO/SSG need) |
| Shared vite-config package | 5+ apps repeating the same config |
