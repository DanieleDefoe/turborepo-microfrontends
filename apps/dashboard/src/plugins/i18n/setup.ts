import type { App } from "vue";

import { createI18n } from "vue-i18n";

import type { Language } from ".";

import { appLocale, DEFAULT_LOCALE, validateAppLocale } from ".";
import en from "./en.json";
import zh from "./zh.json";

export function setupI18n(app: App) {
  validateAppLocale();

  const i18n = createI18n({
    fallbackLocale: DEFAULT_LOCALE,
    legacy: false,
    locale: appLocale.value,
    messages: <Record<Language, Record<string, any>>>{
      en,
      zh,
    },
  });
  app.use(i18n);
}
