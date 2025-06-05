export function toWikiImageUrl(itemName: string): string {
  const baseUrl = "https://eldenring.wiki.fextralife.com/file/Elden-Ring/";
  const formattedName = itemName
    .trim()
    .toLowerCase()
    .replace(/ /g, "_")
    .replace(/[^a-z0-9_-]/g, "");

  return `${baseUrl}${formattedName}_elden_ring_wiki_guide_200px.png`;
}

export const getPercentage = (items: { collected: boolean }[]) => {
  if (!items.length) return 0;
  const collectedCount = items.filter((item) => item.collected).length;
  return Math.round((collectedCount / items.length) * 100);
};
