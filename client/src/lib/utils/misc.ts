import type { Item, ItemCategory, TalismanVersions } from "../../global-types";
import { legendaryEligibleItemCategories } from "../consts";

//Проверка на возможное наличие поля legendary у категории предмета
function hasLegendaryProperty(
  item: Item
): item is Item & { legendary: boolean } {
  return "legendary" in item;
}

//Проверка на легендарность
export function isLegendaryItem(item: Item) {
  return (
    legendaryEligibleItemCategories.includes(item.type) &&
    hasLegendaryProperty(item) &&
    item.legendary
  );
}

//Проверка на возможное наличие поля versions у категории предмета
export function isMultiVersionTalisman(
  item: Item
): item is Item & { versions: TalismanVersions[] } {
  return "versions" in item;
}

export function truncateText(text: string, maxLength: number = 20): string {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}

export function toTitleCaseFromCamel(
  str: string,
  maxLength: number = 20
): string {
  const result = str
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^./, (s) => s.toUpperCase());

  if (result.length > maxLength) {
    return result.slice(0, maxLength).trimEnd() + "...";
  }
  return result;
}

export function transformCategoryToName(category: ItemCategory) {
  switch (category) {
    case "meleWeapons":
      return "Mele Weapons";
    case "rangedWeapons":
      return "Ranged Weapons";
    case "armour":
      return "Armour";
    case "shieldsAndTorches":
      return "Shields & Torches";
    case "talismans":
      return "Talismans";
    case "sorceries":
      return "Sorceries";
    case "incantations":
      return "Incantations";
    case "spiritAshes":
      return "Spirit Ashes";
    case "ashesOfWar":
      return "Ashes of war";
    case "craft":
      return "Craft";
    case "tearsAndUpgrades":
      return "Tears & Upgrades";
    case "toolsAndBellBearings":
      return "Tools & Bell Bearings";
    case "keyItems":
      return "Key Items";
    case "consumablesAndAmmo":
      return "Consumables & Ammo";
    case "gesturesAndMultiplayer":
      return "Gestures & Multiplayer";
    case "infoItems":
      return "Info Items";
    default:
      return "";
  }
}

export function calculateItemDropChance(
  baseItemDropChance: number,
  calculatedDiscovery: number
) {
  const dropRate = baseItemDropChance / 100;
  const discoveryRate = calculatedDiscovery / 100;

  const calculatedDropChance =
    ((dropRate * discoveryRate) / (1 - dropRate + dropRate * discoveryRate)) *
    100;

  return calculatedDropChance.toFixed(2);
}

export const findItemByName = (
  dataSource: Item[],
  name: string
): Item | undefined => {
  const directMatch = dataSource.find((item) => item.name === name);
  if (directMatch) return directMatch;

  for (const item of dataSource) {
    if (item.type !== "armour" || !("items" in item)) continue;

    for (const subItem of item.items) {
      if (subItem.name === name) return subItem;

      const childMatch = subItem.children
        ? Object.values(subItem.children).find((child) => child.name === name)
        : undefined;

      if (childMatch) return childMatch;
    }
  }

  return undefined;
};
