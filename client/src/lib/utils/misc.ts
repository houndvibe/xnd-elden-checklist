import type { Item, TalismanVersions } from "../../global-types";
import { legendaryEligibleItemCategories } from "../consts";

//Проверка на возможное наличие поля legendary у категории предмета
function hasLegendaryProperty(
  item: Item
): item is Item & { legendary: boolean } {
  return "legendary" in item;
}

//Проверка на легендарность
export function checkIsLegendary(item: Item) {
  return (
    legendaryEligibleItemCategories.includes(item.type) &&
    hasLegendaryProperty(item) &&
    item.legendary
  );
}

//Проверка на возможное наличие поля versions у категории предмета
export function hasVersionsProperty(
  item: Item
): item is Item & { versions: TalismanVersions[] } {
  return "versions" in item;
}

export function truncateText(text: string, maxLength: number = 20): string {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}
