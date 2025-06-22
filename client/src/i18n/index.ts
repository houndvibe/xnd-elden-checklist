type Language = "ru" | "en";
type Translations = Record<string, Record<string, string>>;

import ru from "./ru.json";
import en from "./en.json";

const translations: Record<Language, Translations> = { ru, en };

const currentLang: Language =
  (localStorage.getItem("xnd.lang") as Language) || "en";

document.documentElement.classList.add(`lang-${currentLang}`);
document.documentElement.setAttribute("lang", currentLang);

export const setLanguage = (lang: Language) => {
  if (lang !== currentLang) {
    localStorage.setItem("xnd.lang", lang);
    window.location.reload();
  }
};

export const t = (category: string, key: string): string => {
  console.log(category);
  return (
    translations[currentLang]?.[category]?.[key] ||
    translations["en"]?.[category]?.[key] ||
    key
  );
};
