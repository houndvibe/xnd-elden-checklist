import type {
  ArmourSet,
  Item,
  ItemCategory,
  TalismanVersions,
} from "../../global-types";
import { legendaryEligibleItemCategories } from "../consts";

function hasLegendaryProperty(
  item: Item
): item is Item & { legendary: boolean } {
  return "legendary" in item;
}

export function isLegendaryItem(item: Item) {
  return (
    legendaryEligibleItemCategories.includes(item.type) &&
    hasLegendaryProperty(item) &&
    item.legendary
  );
}

export function isMultiVersionTalisman(
  item: Item
): item is Item & { versions: TalismanVersions[] } {
  return "versions" in item;
}

export function toTitleCaseFromCamel(str: string): string {
  const result = str
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^./, (s) => s.toUpperCase());
  return result;
}

export function truncateString(str: string, n: number): string {
  if (str.length > n) {
    return str.slice(0, n - 3) + "...";
  }

  return str;
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
      return "Ashes Of War";
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

export const isArmourSet = (item: Item | undefined): item is ArmourSet => {
  return (
    !!item &&
    item.type === "armour" &&
    item.pieceType === "set" &&
    "items" in item &&
    Array.isArray(item.items)
  );
};

// Улучшенная функция форматирования даты с проверкой на валидность
export function formatDate(
  date: Date | string | number | null | undefined
): string {
  // Проверяем, что дата существует
  if (!date) return "";

  // Преобразуем строку или число в объект Date, если необходимо
  const dateObj = date instanceof Date ? date : new Date(date);

  // Проверяем, что дата валидна
  if (isNaN(dateObj.getTime())) {
    console.warn("Invalid date value:", date);
    return "";
  }

  // Форматируем дату
  return new Intl.DateTimeFormat("default", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(dateObj);
}
export function trimDataSuffix(label: string): string {
  return label.endsWith("Data") ? label.slice(0, -4) : label;
}

export const normalizeText = (text: string) =>
  text
    .toLowerCase()
    .replace(/ё/g, "е")
    .replace(/[-–—]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
