import type { Item, ItemSubCategoryMap } from "../../global-types";

export function getItemStats(item: Item): {
  itemTotal: number;
  itemCollected: number;
} {
  // Talisman versions
  if (
    item.type === "talismans" &&
    "versions" in item &&
    Array.isArray(item.versions)
  ) {
    const itemTotal = item.versions.length;
    const itemCollected = item.versions.filter((v) => v.collected).length;
    return { itemTotal, itemCollected };
  }

  // Armour
  if (item.type === "armour" && item.subcategory !== "pieces") {
    if ("items" in item && Array.isArray(item.items)) {
      let total = 0;
      let collected = 0;

      for (const subItem of item.items) {
        total += 1;
        if (subItem.collected) collected += 1;

        if ("children" in subItem && Array.isArray(subItem.children)) {
          total += subItem.children.length;
          collected += subItem.children.filter((c) => c.collected).length;
        }
      }

      return { itemTotal: total, itemCollected: collected };
    }

    return {
      itemTotal: 1,
      itemCollected: item.collected ? 1 : 0,
    };
  }

  return {
    itemTotal: 1,
    itemCollected: item.collected ? 1 : 0,
  };
}

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
