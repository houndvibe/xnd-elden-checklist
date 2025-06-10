import type { Item, ItemCategory, TalismanVersions } from "../../global-types";
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
    case "gestures":
      return "Gestures";
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
    (dropRate * discoveryRate) / (1 - dropRate + dropRate * discoveryRate);

  return calculatedDropChance;
}
