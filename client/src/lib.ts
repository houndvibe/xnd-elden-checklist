import type { DataType, Shields } from "./components/categories/shields/data";

export function toWikiImageUrl(itemName: string) {
  const baseUrl = "https://eldenring.wiki.fextralife.com/file/Elden-Ring/";
  const formattedName = itemName
    .trim()
    .toLowerCase()
    .replace(/ /g, "_")
    .replace(/[^a-z0-9_-]/g, "");

  return `${baseUrl}${formattedName}_elden_ring_wiki_guide_200px.png`;
}

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

export function getSubCategoryStats(items: { collected: boolean }[]) {
  const total = items.length;
  const collected = items.filter((item) => item.collected).length;
  const percentage = Math.round((collected / total) * 100);

  return { total, collected, percentage };
}
