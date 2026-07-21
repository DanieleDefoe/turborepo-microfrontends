# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this is

A **Turborepo + pnpm** monorepo. All applications are **Vue 3 + Vite**.

- **Package manager:** pnpm (see `packageManager` in root `package.json`). Node `>=22`.
- **TypeScript:** v6, pinned via the pnpm **catalog** in `pnpm-workspace.yaml` (`typescript: ^6.0.0`; packages use `typescript: catalog:`). Not v7 yet — see Gotchas.
- **Lint/format:** Ultracite + Biome (via `@ap/ultracite`).

## Layout

```
apps/
  dashboard   @ap/dashboard  — Vue 3 + Vite app (stub)
  landing     @ap/landing    — Vue 3 + Vite app (stub)
packages/
  ui          @ap/ui         — Vue component kit (shadcn-vue + Storybook), Vite
  typescript  @ap/typescript — shared tsconfig presets (base + dom + node)
  ultracite   @ap/ultracite  — shared Ultracite/Biome config (stub)
```

Internal packages are referenced with the `workspace:*` protocol.

## Commands

Run from the repo root (Turborepo fans out to every package):

```bash
pnpm build         # turbo run build
pnpm dev           # turbo run dev
pnpm lint          # turbo run lint
pnpm check-types   # turbo run check-types
```

Scope to one package with `pnpm --filter <name> <script>` (e.g. `pnpm --filter @ap/ui dev`).

## TypeScript config convention

Shared configs live in `@ap/typescript` and use the `${configDir}` template variable so
`include` / `exclude` / `paths` / `tsBuildInfoFile` resolve against the **consuming** package.
This means shared bits are defined **once** and consumers stay trivial.

- `@ap/typescript/tsconfig.json` — house rules (`composite`, `isolatedModules`, `noUnused*`, `noFallthroughCasesInSwitch`).
- `@ap/typescript/dom.json` — browser/app code: `@vue/tsconfig/tsconfig.dom.json` + house rules + `src` globs + `@/*` alias + `vite/client` types (so no per-package `env.d.ts` is needed for `*.css`/asset imports).
- `@ap/typescript/node.json` — config files (Vite/Vitest/Storybook): `@tsconfig/node22` + house rules + node overrides.

Each Vue package uses the create-vue 3-file layout — **identical across packages**:

```jsonc
// tsconfig.json — solution (references can't be inherited, so this file is per-package)
{ "files": [], "references": [{ "path": "./tsconfig.node.json" }, { "path": "./tsconfig.app.json" }] }
// tsconfig.app.json
{ "extends": "@ap/typescript/dom.json" }
// tsconfig.node.json
{ "extends": "@ap/typescript/node.json" }
```

A consumer that references `@ap/typescript/node.json` also needs `@types/node` in its own devDeps
(the `types: ["node"]` array resolves from the consumer, not the config package).

The configs `@ap/typescript` extends (`@vue/tsconfig`, `@tsconfig/node22`) are `dependencies`
(not `devDependencies`) — consumers resolve them transitively through `@ap/typescript`.

## Gotchas

- **Stay on TypeScript 6 until `vue-tsc` supports TS 7.** `vue-tsc@3.3.8` (latest) does
  `require('typescript/lib/tsc')`; TS 7 (native port) removed that subpath from `exports`, so
  `vue-tsc -b` fails with `ERR_PACKAGE_PATH_NOT_EXPORTED ... './lib/tsc'`. TS 6 still ships
  `lib/tsc.js` with no `exports` restriction, so the full `vue-tsc -b && vite build` works there.
  Plain `tsc` is **not** a substitute — it can't type-check `.vue` SFCs (that's what `vue-tsc` +
  Volar are for).
- `packages/ui` contains a **nested `.git`** (shows as `?? packages/ui/` in root `git status`).
  It is not a registered submodule; flatten it before committing ui as part of the monorepo.
