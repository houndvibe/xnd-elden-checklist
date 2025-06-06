import type { DataType, Shields } from "../components/categories/shields/data";

//Получить статистику категории ('Оружие')
export function getCategoryStats(data: Shields) {
  let total = 0;
  let collected = 0;

  for (const category of Object.values(data)) {
    total += category.length;
    collected += category.filter((item: DataType) => item.collected).length;
  }

  const percentage = total === 0 ? 0 : Math.round((collected / total) * 100);

  return { total, collected, percentage };
}

//Получить статистику подкатегории ('Кинжалы')
export function getSubCategoryStats(items: { collected: boolean }[]) {
  const total = items.length;
  const collected = items.filter((item) => item.collected).length;
  const percentage = Math.round((collected / total) * 100);

  return { total, collected, percentage };
}

//Конвертирует название предмета в ссылку на fextralife wiki
export function convertToWikiImageUrl(itemName: string, isDlc: boolean) {
  const baseUrl = "https://eldenring.wiki.fextralife.com/file/Elden-Ring/";
  const formattedName = itemName
    .trim()
    .toLowerCase()
    .replace(/ /g, "_")
    .replace(/[^a-z0-9_-]/g, "");

  return `${baseUrl}${formattedName}_elden_ring_${
    isDlc ? "shadow_of_the_erdtree_dlc_" : ""
  }wiki_guide_200px.png`;
}

//Загрузка данных из localstorage
export function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : fallback;
  } catch {
    return fallback;
  }
}

//Сохранение данных в localstorage
export function saveToStorage<T>(key: string, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn("Storage write failed", err);
  }
}
