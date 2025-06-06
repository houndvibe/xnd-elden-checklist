import type { Item, ItemSubCategoryMap } from "../../global-types";

//Получить статистику категории ('Оружие')
export function getCategoryStats(data: ItemSubCategoryMap) {
  let total = 0;
  let collected = 0;

  for (const category of Object.values(data)) {
    total += category.length;
    collected += category.filter((item: Item) => item.collected).length;
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
