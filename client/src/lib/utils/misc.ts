import type { Item } from "../../global-types";
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
