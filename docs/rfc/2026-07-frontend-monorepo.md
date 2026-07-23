# RFC. Вынос фронтендов в отдельный монорепозиторий

| | |
| --- | --- |
| **Статус** | Draft / на обсуждении |
| **Задача** | ANP20-XXX (проставляется после создания) |
| **Дата** | 2026-07-24 |
| **Прототип** | репозиторий `my-monorepo` (turborepo + shell/remotes + uikit — рабочий PoC) |

## Задача

Фронтенды продуктов живут внутри .NET-репозиториев и собираются как побочный артефакт бэкенд-пайплайна. Требуется спроектировать вынос фронтендов в отдельный монорепозиторий с современным тулингом (Turborepo, Module Federation, единый UI-kit, FSD), не трогая бэкенд и текущую схему деплоя за общей прокси.

Цели:

* независимый релизный цикл фронтендов (сейчас `npm-build` в пайплайне ждёт `dotnet-build`);
* один общий UI-kit и одна дизайн-система вместо разрозненных стилей;
* устранение version-coordination налога 11 npm-пакетов `ap.common.web`;
* единые стандарты качества (линт, типы, тесты) и быстрые сборки с общим кэшем;
* архитектура, готовая к добавлению новых продуктовых фронтов (микрофронтенды за shell-хостом).

## Как сделано сейчас

Факты по репозиториям (`~/job`):

| Репозиторий | Фронтенд | Стек | Проблемы |
| --- | --- | --- | --- |
| `ap.userportal` | `src/Ap.UserPortal/` внутри .NET | Vue 3.5, Vite 7, Pinia 3, vue-router 4, Sass, ESLint+Prettier | нет тестов, нет MF, сборка в пайплайне .NET |
| `ap.webeditor` | `src/Ap.WebEditor/` внутри .NET | Vue 3.5, Vite 8, **@module-federation/vite 1.14**, Pinia, Tailwind 3, Vitest 4, TS 6 | MF уже используется, но хоста-shell нет; фронт заперт в .NET-репо |
| `ap.common.web` | 11 отдельных npm-пакетов `@ap/ap-common-*` | httpclient, query-service, microfront-infrastructure (MF enhanced 2.5), linting-configs, monitoring, notifications, polling, … | каждый пакет версионируется/публикуется отдельно → цепочки PR при сквозном изменении, дрейф версий у потребителей |
| `ap.uikit` | пустой репозиторий (только .git) | — | зарезервирован под UI-kit, не начат |
| `cfg.instance` | `v2/Web.UI/microserviceProxy.json` | единая прокси | все фронты и сервисы ходят под одним хостом; auth — cookie-сессия за прокси |

Ключевые следствия:

* **Связанность CI**: в `Pipe.yaml` WebEditor джоба `npm-build` объявлена с `dependencies: [dotnet-build]` — любое изменение фронта ждёт компиляцию .NET и наоборот; фронтовые изменения гоняют весь dotnet-конвейер.
* **Дублирование инфраструктуры фронта**: ESLint/Prettier-конфиги, vite-настройки, http-клиенты повторяются или тянутся через 11 пакетов с ручным bump'ом версий.
* **Разные UI**: у продуктов нет общего кита; Tailwind есть только в WebEditor; переиспользуемых компонентов с витриной (Storybook) нет.
* **MF без хоста**: WebEditor уже экспортирует федеративные модули (инфраструктура `@ap/ap-common-microfront-infrastructure`), но общего shell-хоста с единым chrome/роутингом/auth нет.

## Целевая архитектура (Вариант А — рекомендуемый)

Один монорепозиторий фронтендов (условно `ap.frontend`) на Turborepo + pnpm workspace.

Диаграмма: `assets/frontend-monorepo-architecture.excalidraw` (PNG приложен к странице Confluence).

```text
ap.frontend/
├── apps/
│   ├── shell/          # MF-хост: chrome (header/sidebar/footer), vue-router, auth, degradation
│   ├── user-portal/    # MF-remote: кабинет (FSD внутри src/)
│   └── web-editor/     # MF-remote: редактор (FSD внутри src/)
├── packages/
│   ├── uikit/          # shadcn-vue компоненты + Storybook (+ vitest snapshot)
│   ├── typescript/     # общие tsconfig-пресеты (base/dom/node, ${configDir})
│   ├── configs/        # ultracite/biome, lefthook, общие vite-плагины
│   └── core/           # то, что переезжает из ap.common.web (httpclient, monitoring, …)
├── .claude/  AGENTS.md  .mcp.json  skills/   # общие AI-настройки репозитория
├── turbo.json  pnpm-workspace.yaml (catalog)  lefthook.yml  biome.jsonc
└── docs/rfc/
```

### Микрофронтенды: shell + remotes

* Плагин: официальный `@module-federation/vite` (уже в WebEditor).
* Контракт remote'а: экспорт `./routes` — массив `RouteRecordRaw` с lazy-страницами; shell монтирует их детьми под `/portal`, `/editor` внутри своего layout'а. Один Vue-инстанс, один роутер, одна history.
* Shell экспортирует `./auth` — композабл `useAuth()`; remote'ы читают пользователя, но не трогают креденшелы.
* Shared singletons: только `vue` и `vue-router` (версии зафиксированы pnpm catalog). UI-kit сознательно НЕ шарится через MF, пока он source-пакет (bundle per app, tree-shaking); переход на shared — после появления версионируемых сборок.
* Деградация: недоступный remote даёт fallback-страницу «раздел недоступен» внутри layout'а, не роняя shell (проверено в прототипе).

### Feature-Sliced Design внутри приложений

Каждое приложение в `apps/*` организовано по FSD (7 слоёв, импорты только «вниз»):

```text
src/
├── app/        # инициализация, провайдеры, роуты (здесь же экспорт ./routes для MF)
├── pages/      # слайсы страниц (pages-first: код живёт тут, пока не понадобился повторно)
├── widgets/    # самодостаточные крупные блоки
├── features/   # пользовательские действия с бизнес-ценностью
├── entities/   # бизнес-сущности (document, assignment, user)
└── shared/     # ui (реэкспорт uikit), api (httpclient), lib, config
```

Правила: публичный API каждого слайса через `index.ts`; кросс-импорты сущностей только через `@x`-нотацию; `packages/uikit` потребляется через `shared/ui` (канонический паттерн FSD для внешнего кита). Соблюдение слоёв контролирует Steiger (FSD-линтер) в CI.

### Технологический стек

| Слой | Выбор | Обоснование |
| --- | --- | --- |
| Оркестрация | **Turborepo + pnpm (catalog)** | инкрементальные сборки, `--affected` в PR, remote cache; catalog фиксирует версии singletons |
| Микрофронтенды | **@module-federation/vite** | официальный плагин; уже в проде WebEditor; runtime-инъекция роутов |
| UI-kit | **shadcn-vue (reka-ui) + Tailwind 4 + Storybook** | код-в-репо (не зависимость) → полный контроль; Storybook как витрина и контракт |
| Состояние | **Pinia** (клиентское) + **TanStack Query** (серверное) | замена самописного `ap-common-query-service`; кэш/инвалидация/ретраи из коробки |
| Роутинг | **vue-router** | стандарт Vue; общий инстанс в shell |
| Качество кода | **Ultracite (Biome)** + lefthook + lint-staged | один пресет на весь монорепо вместо 11 пакетов конфигов; формат+линт за секунды |
| Типы | **TypeScript 6 + vue-tsc**, общие пресеты `packages/typescript` | `${configDir}`-пресеты: 3 одинаковые строки tsconfig на приложение |
| Unit/snapshot | **Vitest** (+ storybook addon-vitest для uikit) | быстрые unit + snapshot компонентов кита |
| E2E | **Playwright** | сценарии против собранного контура shell+remotes (auth, деградация remote'а, deep-links) |
| Auth | cookie-сессия за прокси (как сейчас) → **BFF/OIDC seam** | shell владеет `useAuth()`; смена mock→BFF не трогает remote'ы; токены никогда не живут в JS |
| AI-инфра | `.claude/`, `AGENTS.md`, `.mcp.json`, skills в корне | общие правила кода и MCP-серверы для всех разработчиков репо |

### CI: Bitbucket + Jenkins (Ap.Configuration)

Репозиторий получает свои `Build.yaml`/`Pipe.yaml` (Ap.Configuration), **без dotnet-джоб**:

```yaml
# Pipe.yaml (эскиз)
jobs:
- name: pnpm-install        # node:22-alpine + corepack, pnpm fetch (кэш store в Docker-слое)
- name: turbo-check         # turbo run lint check-types test --affected
  dependencies: [pnpm-install]
- name: turbo-build         # turbo run build --affected (+ build-storybook uikit)
  dependencies: [turbo-check]
- name: e2e                 # playwright: compose shell+remotes, smoke-сценарии
  dependencies: [turbo-build]
- name: docker-pack         # по образу на app: nginx-static с dist/
  dependencies: [e2e]
- name: docker-publish
  dependencies: [docker-pack]
```

* `--affected` считается против target-ветки PR в Bitbucket (`TURBO_SCM_BASE`), т.е. PR в uikit не пересобирает приложения, не зависящие от изменения.
* Slack-нотификации, версия/чейнджлог — стандартные механизмы Ap.Configuration.

### Remote cache в Docker (open source)

Самохостимый кэш — контейнер [`ducktors/turborepo-remote-cache`](https://github.com/ducktors/turborepo-remote-cache) в нашей Docker-инфре (рядом с Nexus):

```yaml
# docker-compose фрагмент
services:
  turborepo-cache:
    image: ducktors/turborepo-remote-cache:latest
    environment:
      TURBO_TOKEN: ${TURBO_CACHE_TOKEN}   # Jenkins credentials
      STORAGE_PROVIDER: minio             # или local fs
      STORAGE_PATH: turbo-cache
    ports: ["3000:3000"]
```

Jenkins-агенты и локальные машины разработчиков используют один кэш (`turbo.json → remoteCache`, env `TURBO_API/TURBO_TOKEN/TURBO_TEAM`): артефакт, собранный в CI, не пересобирается ни у кого локально, и наоборот. Скриншоты поведения кэша и графа задач Turborepo — во вложениях страницы.

## Вариант Б. Монорепо приложений + отдельный `ap.uikit`

Apps в монорепо, UI-kit — в существующем пустом репозитории `ap.uikit`, публикуется npm-пакетом в Nexus.

**Плюсы:** репозиторий `ap.uikit` уже создан; кит можно потреблять из репозиториев, не вошедших в монорепо; независимый релизный цикл кита.

**Минусы:** возвращается version-coordination налог (bump → publish → update во всех потребителях) — ровно та проблема, от которой уходим с `ap.common.web`; сквозное изменение «компонент + приложение» снова требует двух PR и ожидания публикации; Storybook и приложение видят разные версии кита; дублируется тулинг (свой CI, свой линт, свои tsconfig).

**Риски:** дрейф версий кита между продуктами; медленная итерация дизайн-системы на старте, когда кит меняется ежедневно.

## Вариант В. Status quo+ (фронты остаются в .NET-репозиториях)

Не выносить фронты; консолидировать только общие пакеты и добавить кит как 12-й пакет `ap.common.web`.

**Плюсы:** нулевая миграция; привычные пайплайны.

**Минусы:** сохраняется зависимость `npm-build → dotnet-build`; нет `--affected`/общего кэша — каждый фронт собирается со своим CI с нуля; кит через npm-пакет наследует все проблемы Варианта Б; shell-хост и сквозные MF-контракты между репозиториями согласовывать негде; AI-инфра и стандарты кода остаются рассинхронизированными.

**Риски:** консервация текущей скорости разработки; каждый новый продуктовый фронт добавляет ещё один изолированный стек.

## Сравнительная таблица

| Критерий | А. Один монорепо | Б. Монорепо + uikit отдельно | В. Status quo+ |
| --- | --- | --- | --- |
| Независимость фронт-релизов от .NET | ✅ | ✅ | ❌ |
| Атомарные сквозные изменения (кит+приложения) | ✅ один PR | ⚠️ два PR + publish | ⚠️ N PR |
| Version-coordination налог | нет | кит | все пакеты |
| Скорость CI (affected + remote cache) | ✅ максимальная | ⚠️ кэш не покрывает кит | ❌ |
| Итерация дизайн-системы | быстрая | медленная на старте | медленная |
| Потребление кита вне монорепо | через publish из монорепо (опция) | ✅ нативно | ✅ |
| Объём миграции | средний | средний+ | минимальный |
| Риск | новый процесс для команды | двойной тулинг | консервация проблем |

## Решение

**Вариант А**: один frontend-монорепозиторий. Вариант Б остаётся запасным упрощением, если появится жёсткое требование потреблять кит из репозиториев вне монорепо раньше, чем появится publish-пайплайн из монорепо (turborepo это поддерживает: пакет из монорепо можно публиковать в Nexus, не вынося его). Вариант В отвергается: он не достигает ни одной из целей RFC.

Прототип решения собран и проверен в репозитории `my-monorepo`: turborepo + pnpm catalog, shell-хост с chrome/auth/деградацией, два MF-remote'а с контрактом `./routes`, uikit на shadcn-vue со Storybook, ultracite+lefthook, зелёные сборки всех workspace'ов.

## План миграции (фазы)

| Фаза | Содержимое | Результат |
| --- | --- | --- |
| 0. Каркас | репозиторий `ap.frontend`, turbo+pnpm+catalog, packages/{typescript,configs}, CI-пайплайн, remote cache | пустой, но собирающийся монорепо с CI |
| 1. UI-kit | packages/uikit (shadcn-vue), Storybook, vitest snapshot, первые 15–20 компонентов | витрина кита доступна команде |
| 2. WebEditor FE | перенос `src/Ap.WebEditor` фронта в apps/web-editor, FSD-раскладка, удаление npm-джоб из dotnet-пайплайна | первый продукт на новом контуре (у него уже есть MF) |
| 3. Shell | apps/shell: chrome, auth (cookie за прокси), маршрут /editor | shell в проде за cfg.instance-прокси |
| 4. UserPortal FE | перенос в apps/user-portal, добавление тестов, маршрут /portal | оба продукта за shell |
| 5. ap.common.web | поглощение пакетов в packages/core (query-service → TanStack Query, linting-configs → ultracite), archive репо | 11 пакетов → 0 |

Каждая фаза — отдельная задача с собственным критерием готовности; фазы 2–4 не блокируют друг друга после фазы 1.

## Риски и открытые вопросы

* **Пайплайн-пресет**: нужен новый pipe-preset Ap.Configuration без dotnet-джоб — согласовать с владельцами Ap.Configuration.
* **Прокси-маршрутизация shell**: добавление shell в `microserviceProxy.json` (по аналогии с кабинетом) — согласовать с инфраструктурой.
* **Auth**: текущая cookie-сессия за прокси сохраняется; переход на BFF/OIDC — отдельный RFC (seam в shell уже заложен).
* **Двойной период**: пока фронт не удалён из .NET-репо, изменения идут в двух местах — минимизировать длительность фаз 2 и 4 (feature freeze на фронт в старом репо после старта переноса).
* **Владелец монорепо**: нужен процесс code ownership (CODEOWNERS по apps/packages) — иначе монорепо превращается в ничей.
* **Nexus/registry**: публикация пакетов из монорепо (если понадобится потребление извне) — механика turborepo `publish` + Nexus, отдельная задача.

## Вне скоупа

Выбор конкретного IdP и дизайн BFF; миграция движка редактора; любые изменения бэкенд-сервисов и их API; SSR/SEO (лендинги — отдельная тема, кандидат Nuxt).

## Ссылки

* Feature-Sliced Design: https://feature-sliced.design
* Turborepo: https://turborepo.com/docs
* Module Federation (vite): https://github.com/module-federation/vite
* Remote cache (self-hosted): https://github.com/ducktors/turborepo-remote-cache
* shadcn-vue: https://shadcn-vue.com
* Ultracite: https://www.ultracite.ai
* Прототип: репозиторий `my-monorepo` (см. README)
