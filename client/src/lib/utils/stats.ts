import type { Item, ItemSubCategoryMap } from "../../global-types";

export function getItemStats(item: Item): {
  itemTotal: number;
  itemCollected: number;
} {
  // Talisman с версиями
  if (
    item.type === "talismans" &&
    "versions" in item &&
    Array.isArray(item.versions)
  ) {
    const itemTotal = item.versions.length;
    const itemCollected = item.versions.filter((v) => v.collected).length;
    return { itemTotal, itemCollected };
  }

  // Всё остальное (shields, spirit ashes, talismans без версий)
  return { itemTotal: 1, itemCollected: item.collected ? 1 : 0 };
}

//Получить статистику категории ('Оружие')
export function getCategoryStats(data: ItemSubCategoryMap) {
  let total = 0;
  let collected = 0;

  for (const category of Object.values(data)) {
    for (const item of category) {
      const { itemTotal, itemCollected } = getItemStats(item);
      total += itemTotal;
      collected += itemCollected;
    }
  }

  const percentage = total === 0 ? 0 : Math.round((collected / total) * 100);
  return { total, collected, percentage };
}

//Получить статистику подкатегории ('Кинжалы')
export function getSubCategoryStats(items: Item[]) {
  let total = 0;
  let collected = 0;

  for (const item of items) {
    const { itemTotal, itemCollected } = getItemStats(item);
    total += itemTotal;
    collected += itemCollected;
  }

  const percentage = total === 0 ? 0 : Math.round((collected / total) * 100);
  return { total, collected, percentage };
}
