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

  // Armour с вложенными уровнями
  if (item.type === "armour") {
    if ("items" in item && Array.isArray(item.items)) {
      let total = 0;
      let collected = 0;

      for (const subItem of item.items) {
        // Если есть children — считаем их
        if ("children" in subItem && subItem.children) {
          const children = Object.values(subItem.children);
          total += children.length;
          collected += children.filter((c) => c.collected).length;
        } else {
          // Иначе считаем сам subItem
          total += 1;
          if (subItem.collected) collected += 1;
        }
      }

      return { itemTotal: total, itemCollected: collected };
    }

    // Если нет items — считаем сам item
    return { itemTotal: 1, itemCollected: item.collected ? 1 : 0 };
  }

  // Всё остальное (shields, spirit ashes, talismans без версий и пр.)
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
