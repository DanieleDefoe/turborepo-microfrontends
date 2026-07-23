# my-monorepo — прототип frontend-монорепозитория

Рабочий PoC целевой архитектуры фронтендов: **Turborepo + pnpm (catalog) + Vue 3 + Vite 8 + Module Federation**.

> 📄 **RFC: [Вынос фронтендов в отдельный монорепозиторий](./docs/rfc/2026-07-frontend-monorepo.md)** — цели, варианты, целевая архитектура, план миграции. Обсуждение — на странице Confluence (AP20), задача — в Jira (ANP20).

## Что внутри

| Workspace | Назначение |
| --- | --- |
| `apps/shell` | MF-хост: chrome (sidebar/header/footer из uikit), vue-router, mock-auth с BFF-seam, деградация недоступных remote'ов |
| `apps/user-portal` | MF-remote: экспортирует `./routes`, потребляет `shell/auth` |
| `apps/web-editor` | MF-remote: экспортирует `./routes` |
| `apps/dashboard` | shadcn-vue-admin шаблон, адаптированный под общий тулинг (standalone) |
| `packages/ui` | UI-kit: shadcn-vue (reka-ui) + Tailwind 4 + Storybook (stories в `*.stories.vue`) |
| `packages/typescript` | Общие tsconfig-пресеты (`dom.json`/`node.json`, `${configDir}`) |

Качество кода: **Ultracite (Biome)** — единый пресет на весь репозиторий, pre-commit через lefthook + lint-staged.

## Команды

```sh
pnpm install
pnpm dev            # turbo run dev (все приложения)
pnpm build          # turbo run build
pnpm lint           # ultracite check
pnpm fix            # ultracite fix
pnpm --filter @ap/ui storybook   # витрина UI-kit (:6006)
```

Демо микрофронтендов: поднять три dev-сервера (`shell` :5170, `user-portal` :5171, `web-editor` :5172) и открыть http://localhost:5170 — разделы `/portal` и `/editor` рендерятся внутри shell'а из отдельных сборок.
