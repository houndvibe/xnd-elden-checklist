import ru from "./ru.json";
import en from "./en.json";

const translations = { ru, en };
const currentLang: "ru" | "en" =
  (localStorage.getItem("xnd.lang") as "ru" | "en") || "en";

// Устанавливаем класс и lang на html
document.documentElement.classList.add(`lang-${currentLang}`);
document.documentElement.setAttribute("lang", currentLang);

// 👇 Вызывается при смене языка вручную
export const setLanguage = (lang: "ru" | "en") => {
  if (lang !== currentLang) {
    localStorage.setItem("xnd.lang", lang);
    window.location.reload(); // страница перезагрузится и применит язык из localStorage
  }
};

export const t = (category: string, key: string): string => {
  return (
    translations[currentLang]?.[category]?.[key] ||
    translations["en"]?.[category]?.[key] ||
    key
  );
};
