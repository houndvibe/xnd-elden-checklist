export type Language = "ru" | "en";

import ru from "./ru.json";
import en from "./en.json";
import { loadFromStorage } from "../lib/utils/localStore";
import store from "../store/appStore";
import { setLang } from "../store/settingsSlice";
import { LOCALSTORAGE_SETTINGS_KEY } from "../lib/consts";

type Translations = Record<string, Record<string, string>>;
const translations: Record<Language, Translations> = { ru, en };

const settings = loadFromStorage(LOCALSTORAGE_SETTINGS_KEY, {
  lang: "en",
}) as {
  lang: Language;
};
const initialLang: Language = settings.lang || "en";

document.documentElement.classList.add(`lang-${initialLang}`);
document.documentElement.setAttribute("lang", initialLang);

export const setLanguage = (lang: Language) => {
  const currentLang = store.getState().settings.lang;

  if (lang !== currentLang) {
    store.dispatch(setLang(lang));

    document.documentElement.classList.remove(`lang-${currentLang}`);
    document.documentElement.classList.add(`lang-${lang}`);
    document.documentElement.setAttribute("lang", lang);

    window.location.reload();
  }
};

export const t = (category: string, key: string): string => {
  const currentLang = store.getState().settings.lang;

  return (
    translations[currentLang]?.[category]?.[key] ||
    translations["en"]?.[category]?.[key] ||
    key
  );
};
