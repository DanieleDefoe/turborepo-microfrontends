# Dashboard Adoption (TypeScript + Ultracite) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make `apps/dashboard` (the shadcn-vue-admin template) a first-class workspace app that builds/type-checks on `@ap/typescript`, is linted by the repo-root ultracite/Biome, and launches (`dev`) + builds (`build`) successfully.

**Architecture:** Adopt the standalone template into the pnpm/Turborepo workspace: de-nest its git repo + lockfile, replace its three local tsconfigs with our shared `@ap/typescript` presets, and delete its ESLint/@antfu + git-hooks setup (the root Biome/ultracite + lefthook already cover every package). Everything else in the template — its own `src/components/ui` kit, theme CSS, router/pinia/i18n/tanstack plugins, and `vite.config.ts` (VueRouter/Layouts/AutoImport/unplugin-vue-components) — is left untouched.

**Tech Stack:** Vue 3.5, Vite 8, TypeScript 6 (pnpm catalog), `vue-tsc` 3.3, `@ap/typescript` shared configs, Biome 2.5 via ultracite at repo root, pnpm workspace.

## Global Constraints

- Package manager: pnpm workspace (`apps/*` already globbed). Node `>=22`.
- TypeScript pinned via the pnpm **catalog** (`typescript: catalog:` → `^6.0.0`). Not v7 (vue-tsc can't drive TS7).
- Lint/format is **repo-root only**: root `biome.jsonc` (extends `ultracite/biome/{core,vue,tanstack,vitest}`) + root `lefthook.yml` → `lint-staged` → `ultracite fix`. Apps do **not** get their own lint tooling.
- **Out of scope (do not do):** adopting `@ap/ui`, deleting/replacing the dashboard's local `src/components/ui`, microfrontends/module-federation, theme changes. The dashboard keeps its own UI kit and look for now.
- Shared tsconfig convention (`@ap/typescript`): solution `tsconfig.json` (`files:[]` + `references`), `tsconfig.app.json` → `@ap/typescript/dom.json`, `tsconfig.node.json` → `@ap/typescript/node.json`. `${configDir}` makes `include`/`paths` resolve to the consuming app; `@/*` → `${configDir}/src/*` is provided by `dom.json`.

---

### Task 1: Adopt `apps/dashboard` into the workspace

Turn the standalone template into a workspace member: drop its nested git + local lockfile, rename/trim `package.json` so pnpm manages it and the root toolchain owns linting.

**Files:**
- Delete: `apps/dashboard/.git` (nested repo), `apps/dashboard/pnpm-lock.yaml` (standalone lockfile)
- Modify: `apps/dashboard/package.json`

**Interfaces:**
- Produces: workspace package `@ap/dashboard` with devDep `@ap/typescript: workspace:*` and `typescript: catalog:`, consumed by Tasks 2–3.

- [ ] **Step 1: De-nest git + remove the standalone lockfile**

```bash
cd /Users/mamedov/dev/my-monorepo
rm -rf apps/dashboard/.git apps/dashboard/pnpm-lock.yaml
```

- [ ] **Step 2: Edit `apps/dashboard/package.json`**

Make exactly these changes (leave all other deps/scripts as-is — they back the template's runtime + vite plugins):

- `"name"`: `"shadcn-vue-admin"` → `"@ap/dashboard"`; add `"private": true` if absent.
- `devDependencies`: **add** `"@ap/typescript": "workspace:*"`; **change** `"typescript": "~6.0.3"` → `"typescript": "catalog:"`; **remove** `"@antfu/eslint-config"`, `"eslint"`, `"eslint-plugin-format"`, `"@tanstack/eslint-plugin-query"`, `"simple-git-hooks"`, `"nano-staged"`.
- `scripts`: **remove** `"postinstall"` (simple-git-hooks), `"lint"` (`eslint .`), `"lint:fix"`. **Keep** `dev`, `build`, `preview`, `test`, `release`.

- [ ] **Step 3: Remove any leftover ESLint / git-hook config keys**

Check for and delete a root ESLint config file and stray hook config if present (the template may ship none):

```bash
cd /Users/mamedov/dev/my-monorepo/apps/dashboard
rm -f eslint.config.js eslint.config.mjs eslint.config.ts .eslintrc*
# remove simple-git-hooks / nano-staged blocks if they live in package.json (edit by hand)
node -e "const p=require('./package.json'); console.log('has simple-git-hooks key:', !!p['simple-git-hooks'], '| nano-staged:', !!p['nano-staged'])"
```

If that prints `true` for either, delete those top-level keys from `package.json`.

- [ ] **Step 4: Verify install resolves the workspace app**

Run: `cd /Users/mamedov/dev/my-monorepo && pnpm install`
Expected: install completes; `@ap/dashboard` is linked. Confirm:

```bash
pnpm -r ls --depth -1 2>/dev/null | grep -i "@ap/dashboard" && ls -la apps/dashboard/node_modules/@ap/typescript
```
Expected: `@ap/dashboard` listed; `@ap/typescript` symlink present.

- [ ] **Step 5: Commit**

```bash
git add apps/dashboard/package.json pnpm-lock.yaml
git commit -m "chore(dashboard): adopt shadcn-vue-admin into workspace as @ap/dashboard"
```

---

### Task 2: Switch to our shared TypeScript configs

Replace the template's three hand-rolled tsconfigs with the `@ap/typescript` 3-file pattern, preserving the two app-specific needs: the `vite-plugin-vue-layouts/client` type and excluding `src/components/ui` from type-checking (the template does this because its UI kit isn't strict-clean).

**Files:**
- Replace: `apps/dashboard/tsconfig.json`, `apps/dashboard/tsconfig.app.json`, `apps/dashboard/tsconfig.node.json`

**Interfaces:**
- Consumes: `@ap/typescript/{dom,node}.json` (via `workspace:*` dep from Task 1).
- Produces: `@/*` resolves to `apps/dashboard/src/*`; `vite.config.ts` type-checks under the node project.

- [ ] **Step 1: Replace `tsconfig.json` (solution)**

```jsonc
{
  "files": [],
  "references": [
    { "path": "./tsconfig.node.json" },
    { "path": "./tsconfig.app.json" }
  ]
}
```

- [ ] **Step 2: Replace `tsconfig.app.json`**

`dom.json` already supplies `strict`, bundler resolution, `@/* → ${configDir}/src/*`, the `src` globs, and `types: ["vite/client"]`. We only re-declare `types` (to add the layouts client types — a re-declared array replaces the base's) and `exclude` (to add the local UI kit; a re-declared `exclude` replaces the base's, so restate the dist ignore too):

```jsonc
{
  "extends": "@ap/typescript/dom.json",
  "compilerOptions": {
    "types": ["vite/client", "vite-plugin-vue-layouts/client"]
  },
  "exclude": ["${configDir}/src/components/ui", "${configDir}/dist"]
}
```

- [ ] **Step 3: Replace `tsconfig.node.json`**

```jsonc
{
  "extends": "@ap/typescript/node.json"
}
```

(`node.json` already includes `${configDir}/vite.config.ts` and sets `types: ["node", "vite/client"]`, bundler resolution, `noEmit`.)

- [ ] **Step 4: Verify config resolution (no build yet)**

```bash
cd /Users/mamedov/dev/my-monorepo/apps/dashboard
pnpm exec tsc --showConfig -p tsconfig.app.json | grep -E '"@/\*"|vite-plugin-vue-layouts|components/ui|verbatimModuleSyntax' 
```
Expected: `paths."@/*"` → `.../apps/dashboard/src/*`; `vite-plugin-vue-layouts/client` in `types`; `src/components/ui` in `exclude`. (Note `verbatimModuleSyntax: true` is inherited from `@vue/tsconfig` — Task 3 handles the fallout.)

- [ ] **Step 5: Commit**

```bash
cd /Users/mamedov/dev/my-monorepo
git add apps/dashboard/tsconfig.json apps/dashboard/tsconfig.app.json apps/dashboard/tsconfig.node.json
git commit -m "chore(dashboard): use @ap/typescript shared tsconfigs"
```

---

### Task 3: Launch (dev) and build cleanly

Prove the app runs on our stack, then get the type-checked build green. `dev` (Vite/oxc) ignores TS types, so it should launch immediately; `build` runs `vue-tsc -b` and is where our config's `verbatimModuleSyntax` (from `@vue/tsconfig`, which the template didn't have) may surface import errors.

**Files:**
- Possibly modify: `apps/dashboard/tsconfig.app.json` (escape hatch, only if needed)

- [ ] **Step 1: Launch the dev server**

```bash
cd /Users/mamedov/dev/my-monorepo
pnpm --filter @ap/dashboard dev &
sleep 6 && curl -sI http://localhost:5173 | head -1 ; kill %1
```
Expected: `HTTP/1.1 200 OK` (Vite default port; adjust if the template configures another). This is the "launch successfully" bar.

- [ ] **Step 2: Run the type-checked build**

Run: `pnpm --filter @ap/dashboard build`
Expected: either it completes, or `vue-tsc -b` reports type errors.

- [ ] **Step 3: If `vue-tsc` fails on `verbatimModuleSyntax` across many files, disable it for the app**

The template's code predates `verbatimModuleSyntax`; if the build reports many `TS1484`/type-only-import errors, don't rewrite hundreds of imports — override the single flag in `apps/dashboard/tsconfig.app.json`:

```jsonc
{
  "extends": "@ap/typescript/dom.json",
  "compilerOptions": {
    "types": ["vite/client", "vite-plugin-vue-layouts/client"],
    "verbatimModuleSyntax": false
  },
  "exclude": ["${configDir}/src/components/ui", "${configDir}/dist"]
}
```
<!-- ponytail: one-flag override beats rewriting the template's imports; revisit if the template is ever refactored to type-only imports. -->

Re-run `pnpm --filter @ap/dashboard build`.

- [ ] **Step 4: Resolve any remaining genuine type errors**

For non-`verbatimModuleSyntax` errors (real type issues from stricter config), fix them at the source file the compiler names. If they cluster in generated files (`src/types/*.d.ts`) or a specific area, note them; do not broaden the `exclude` beyond `src/components/ui` without reason. Re-run the build until green.

- [ ] **Step 5: Verify lint is clean under the root toolchain**

Run (from repo root): `pnpm exec ultracite check apps/dashboard`
Expected: reports issues or passes — the dashboard is now covered by the root Biome config (no app-local ESLint). Optionally `pnpm exec ultracite fix apps/dashboard` to auto-fix, but do not hand-fix style.

- [ ] **Step 6: Commit**

```bash
cd /Users/mamedov/dev/my-monorepo
git add apps/dashboard
git commit -m "chore(dashboard): launch + type-checked build on shared toolchain"
```

---

## Self-Review

**Spec coverage:** (1) our TypeScript → Task 2. (2) ultracite/remove ESLint → Task 1 (deps/scripts) + Task 3 Step 5 (verify). (3) launch successfully → Task 3 Steps 1–2. (4) workspace member → Task 1. No `@ap/ui`/MF tasks (explicitly out of scope). ✓

**Placeholder scan:** no TBD/TODO; every edit lists exact files, deps, and config bodies; verification steps have exact commands + expected output. The only conditional (Task 3 Step 3) is gated on an observable build failure and shows the full override. ✓

**Type consistency:** `@ap/dashboard` name, `@ap/typescript` dep, and the `dom.json`/`node.json` extends targets are used consistently across tasks. `${configDir}` usage matches the `@ap/typescript` convention. ✓

**Known risk:** `vue-tsc -b` over ~506 `.vue` + 154 `.ts` files under `@vue/tsconfig`'s `verbatimModuleSyntax` may surface many import errors; Task 3 Step 3 is the pre-planned escape hatch so "build green" doesn't balloon into a mass import rewrite.
