# RFC «Вынос фронтендов в монорепозиторий» — Delivery Plan

> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:executing-plans (inline). Steps use checkbox syntax.

**Goal:** Опубликовать RFC ADR (на русском, по конвенциям AP20) о выносе фронтендов из .NET-репозиториев в отдельный turborepo-монорепозиторий: файл в `docs/rfc/`, ссылка в README, страница в Confluence (sibling референсного RFC, с вложениями: excalidraw-диаграмма + PNG, скриншоты turborepo), задача в Jira ANP20.

**Architecture (of the deliverable):** Документ следует структуре референсного RFC (285886535): Задача → Как сделано сейчас → Варианты А/Б/В (+плюсы/минусы/риски) → Сравнительная таблица → Решение → План миграции → Риски. Решение = Вариант А (один монорепо), стек: turborepo+pnpm catalog, FSD в apps, @module-federation/vite (shell + remotes), shadcn-vue uikit + Storybook, ultracite/biome, Pinia + TanStack Query, vitest (unit+snapshot), Playwright e2e, auth cookie→BFF seam, CI Bitbucket+Jenkins (Ap.Configuration), remote cache в Docker (ducktors/turborepo-remote-cache), общие AI-настройки (.claude/skills/.mcp.json) в репо.

**Tech Stack (delivery):** Confluence MCP (get children/create/upload), Jira MCP (create issue), Playwright MCP (скриншоты turborepo.com), kroki.io (excalidraw→PNG), git.

## Global Constraints

- Язык RFC: русский. Терминология и разделы — как в референсном RFC AP20.
- Факты «как сейчас» — только проверенные из ~/job (embedded фронты, 11 пакетов ap.common.web, MF уже в WebEditor, пустой ap.uikit, npm-build→dotnet-build в Pipe.yaml, единая прокси cfg.instance).
- CI-секция: Bitbucket + Jenkins + Ap.Configuration (НЕ GitHub Actions). Remote cache — CI-агностичный Docker-контейнер.
- Вне скоупа RFC: выбор IdP, дизайн BFF, миграция движка WebEditor, изменения бэкенда.
- Jira: ANP20 / Task / Major, summary «Составить RFC по выносу фронтендов в отдельный монорепозиторий», description = executive summary + ссылка на Confluence.
- Файлы: `docs/rfc/2026-07-frontend-monorepo.md`; README.md — короткое описание прототипа + ссылка на RFC.

### Task 1: Написать RFC + README + закоммитить
- [ ] `docs/rfc/2026-07-frontend-monorepo.md` — полный текст (структура выше; таблица стека с обоснованием каждого пункта; FSD-схема слоёв и правило импортов; MF-контракт ./routes+./auth из прототипа; фазовый план миграции: 0 каркас → 1 uikit → 2 WebEditor FE → 3 UserPortal FE → 4 ap.common.web поглощение → 5 shell в prod за прокси).
- [ ] README.md: секция «Prototype» + ссылка на RFC.
- [ ] Commit.

### Task 2: Диаграмма
- [ ] Авторский `.excalidraw` JSON (прокси → shell → remotes → singletons → packages → CI/remote-cache контур) в `docs/rfc/assets/`.
- [ ] Рендер PNG: POST kroki.io/excalidraw/png; fallback — скриншот excalidraw.com через Playwright с загруженным JSON.
- [ ] Commit.

### Task 3: Скриншоты turborepo
- [ ] Playwright: turborepo.com доки — страницы про caching / running tasks (2–3 скриншота) в scratchpad.

### Task 4: Confluence
- [ ] Найти родителя 285886535 (space page tree / children tools).
- [ ] Создать страницу-sibling «RFC. Вынос фронтендов в отдельный монорепозиторий» (markdown).
- [ ] Загрузить вложения: PNG диаграммы, .excalidraw, скриншоты; вставить их в тело страницы (update).

### Task 5: Jira + перекрёстные ссылки
- [ ] Создать ANP20 Task (Major), description = summary + ссылка на страницу.
- [ ] Вписать ключ задачи в шапку RFC (файл + Confluence update). Commit.

## Self-Review
Покрытие: все элементы запроса пользователя (FSD, turborepo, MF, shadcn, ultracite, pinia, tanstack, router, shell, shared skills/mcp, vitest, storybook, auth, remote cache, Jenkins CI, docker cache, playwright, скриншоты, диаграмма, README, Confluence, Jira) размещены по Task 1–5. Placeholder'ов нет. CI = Jenkins (поправка пользователя) учтена в Global Constraints.
