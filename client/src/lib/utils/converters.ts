import { Item } from "../../global-types";

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

export function getNameToImgUrlConverter(record: Item) {
  switch (record.type) {
    case "shieldsAndTorches":
      return convertShieldNameToWikiImageUrl(record.name, record.dlc);

    case "spiritAshes":
      return convertSpiritNameToWikiImageUrl(record.name, record.dlc);

    case "talismans":
      return convertTalismanNameToWikiImageUrl(record.name, record.dlc);

    case "ashesOfWar":
      return convertAshOfWarNameToWikiImageUrl(record.name, record.dlc);

    case "sorceries":
      return convertSorceryNameToWikiImageUrl(record.name, record.dlc);

    case "incantations":
      return convertIncantationNameToWikiImageUrl(record.name, record.dlc);

    case "gesturesAndMultiplayer":
      return convertGestureNameToWikiImageUrl(record.name, record.dlc);

    case "infoItems":
      return convertInfoItemNameToWikiImageUrl(record.name, record.dlc);

    case "toolsAndBellBearings":
      return convertToolOrBellNameToWikiImageUrl(
        record.name,
        record.dlc,
        record.subcategory
      );

    case "tearsAndUpgrades":
      return convertTearOrUpgradeNameToWikiImageUrl(
        record.name,
        record.dlc,
        record.subcategory
      );

    case "craft":
      return convertCraftItemNameToWikiImageUrl(
        record.name,
        record.dlc,
        record.subcategory
      );

    case "armour":
      return convertArmourItemNameToWikiImageUrl(record.name, record.dlc);

    case "consumablesAndAmmo":
      return convertConsumableOrMultiplayerItemNameToWikiImageUrl(
        record.name,
        record.dlc
      );

    case "meleWeapons":
      return convertMeleWeaponNameToWikiImageUrl(
        record.name,
        record.dlc,
        //TODO сюда надо добавить сабкатегорию
        "dagger"
      );

    case "rangedWeapons":
      return convertRangedWeaponNameToWikiImageUrl(
        record.name,
        record.dlc,
        //TODO сюда надо добавить сабкатегорию
        "bow"
      );
  }
}

const baseUrl = "https://eldenring.wiki.fextralife.com/file/Elden-Ring/";

export function convertShieldNameToWikiImageUrl(
  itemName: string,
  isDlc: boolean
) {
  const formattedName = itemName
    .trim()
    .toLowerCase()
    .replace(/ /g, "_")
    .replace(/[^a-z0-9_-]/g, "");

  return `${baseUrl}${formattedName}_elden_ring_${
    isDlc ? "shadow_of_the_erdtree_dlc_" : ""
  }wiki_guide_200px.png`;
}

export function convertSpiritNameToWikiImageUrl(
  itemName: string,
  isDlc: boolean
) {
  const formattedName = itemName
    .trim()
    .toLowerCase()
    .replace(/ /g, "_")
    .replace(/[^a-z0-9_-]/g, "");

  return `${baseUrl}${formattedName}_ashes${
    isDlc ? "_spirit_ash" : ""
  }_elden_ring_${
    isDlc ? "shadow_of_the_erdtree_dlc_" : ""
  }wiki_guide_200px.png`;
}

export function convertTalismanNameToWikiImageUrl(
  itemName: string,
  isDlc: boolean
) {
  const formattedName = itemName
    .trim()
    .toLowerCase()
    .replace(/ /g, "_")
    .replace(/[^a-z0-9_-]/g, "");

  return `${baseUrl}${formattedName}_talisman_elden_ring_${
    isDlc ? "shadow_of_the_erdtree_dlc_" : ""
  }wiki_guide_200px.png`;
}

export function convertAshOfWarNameToWikiImageUrl(
  itemName: string,
  isDlc: boolean
) {
  const formattedName = itemName
    .trim()
    .toLowerCase()
    .replace(/ /g, "_")
    .replace(/[^a-z0-9_-]/g, "");

  return `${baseUrl}ash_of_war_${formattedName}_elden_ring_${
    isDlc ? "ashes_of_war_elden_ring_shadow_of_the_erdtree_dlc_" : ""
  }wiki_guide_200px.png`;
}

export function convertSorceryNameToWikiImageUrl(
  itemName: string,
  isDlc: boolean
) {
  const formattedName = itemName
    .trim()
    .toLowerCase()
    .replace(/ /g, "_")
    .replace(/[^a-z0-9_-]/g, "");

  return `${baseUrl}${formattedName}_sorcery_elden_ring_${
    isDlc ? "shadow_of_the_erdtree_dlc_" : ""
  }wiki_guide_200px.png`;
}

export function convertIncantationNameToWikiImageUrl(
  itemName: string,
  isDlc: boolean
) {
  const formattedName = itemName
    .trim()
    .toLowerCase()
    .replace(/ /g, "_")
    .replace(/[^a-z0-9_-]/g, "");

  return `${baseUrl}${formattedName}_incantation_elden_ring_${
    isDlc ? "shadow_of_the_erdtree_dlc_" : ""
  }wiki_guide_200px.png`;
}

export function convertGestureNameToWikiImageUrl(
  itemName: string,
  isDlc: boolean
) {
  const formattedName = itemName
    .trim()
    .toLowerCase()
    .replace(/ /g, "_")
    .replace(/[^a-z0-9_-]/g, "");

  return `${baseUrl}${formattedName}_gesture_elden_ring_${
    isDlc ? "shadow_of_the_erdtree_dlc_" : ""
  }wiki_guide_200px.png`;
}

export function convertMeleWeaponNameToWikiImageUrl(
  itemName: string,
  isDlc: boolean,
  weaponSubcategory: string
) {
  const formattedName = itemName
    .trim()
    .toLowerCase()
    .replace(/ /g, "_")
    .replace(/[^a-z0-9_-]/g, "");

  return `${baseUrl}${formattedName}_${weaponSubcategory}_weapon_elden_ring_${
    isDlc ? "shadow_of_the_erdtree_dlc_" : ""
  }wiki_guide_200px.png`;
}
export function convertRangedWeaponNameToWikiImageUrl(
  itemName: string,
  isDlc: boolean,
  weaponSubcategory: string
) {
  const formattedName = itemName
    .trim()
    .toLowerCase()
    .replace(/ /g, "_")
    .replace(/[^a-z0-9_-]/g, "");

  return `${baseUrl}${formattedName}_${weaponSubcategory}_weapon_elden_ring_${
    isDlc ? "shadow_of_the_erdtree_dlc_" : ""
  }wiki_guide_200px.png`;
}

export function convertInfoItemNameToWikiImageUrl(
  itemName: string,
  isDlc: boolean
) {
  const formattedName = itemName
    .trim()
    .toLowerCase()
    .replace(/^note:\s*/i, "") // Remove "Note:" prefix if present
    .replace(/[^a-z0-9 ]/g, "") // Remove all non-alphanumeric characters except space
    .replace(/\s+/g, "_"); // Replace spaces with underscores

  return `${baseUrl}note_${formattedName}-${
    isDlc ? "shadow_of_the_erdtree_dlc_" : ""
  }elden-ring-wiki-guide-200px.png`;
}

export function convertToolOrBellNameToWikiImageUrl(
  itemName: string,
  isDlc: boolean,
  subcategory: string
) {
  const formattedName = itemName
    .trim()
    .toLowerCase()
    .replace(/^note:\s*/i, "") // Remove "Note:" prefix if present
    .replace(/[^a-z0-9 ]/g, "") // Remove all non-alphanumeric characters except space
    .replace(/\s+/g, "_"); // Replace spaces with underscores

  if (subcategory === "tools") {
    if (isDlc) {
      return `${baseUrl}${formattedName}_tool_elden_ring_shadow_of_the_erdtree_dlc_wiki_guide_200px.png`;
    }
    return `${baseUrl}${formattedName}_elden_ring_wiki_guide_200px.png`;
  }
  return "";
}

export function convertTearOrUpgradeNameToWikiImageUrl(
  itemName: string,
  isDlc: boolean,
  subcategory: string
) {
  const formattedName = itemName
    .trim()
    .toLowerCase()
    .replace(/^note:\s*/i, "") // Remove "Note:" prefix if present
    .replace(/[^a-z0-9 -]/g, "") // Allow hyphens for DLC naming
    .replace(/\s+/g, "_"); // Replace spaces with underscores

  if (subcategory === "crystalTears") {
    if (isDlc) {
      return `https://eldenring.wiki.fextralife.com/file/Elden-Ring/${formattedName}_crystal_tear_elden_ring_shadow_of_the_erdtree_dlc_wiki_guide_200px.png`;
    } else {
      return `https://eldenring.wiki.fextralife.com/file/Elden-Ring/${formattedName}_elden_ring_wiki_guide_200px.png`;
    }
  }

  if (subcategory === "upgrades") {
    return `https://eldenring.wiki.fextralife.com/file/Elden-Ring/${formattedName}_elden_ring_wiki_guide_200px.png`;
  }

  return `${baseUrl}tear_${formattedName}-${
    isDlc ? "shadow_of_the_erdtree_dlc_" : ""
  }elden-ring-wiki-guide-200px.png`;
}

export function convertCraftItemNameToWikiImageUrl(
  itemName: string,
  isDlc: boolean,
  subcategory: string
) {
  if (subcategory === "instriments") {
    const formatted = itemName
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, "")
      .replace(/\s+/g, "_");
    return `${baseUrl}${formatted}elden_ring_wiki_guide_200px.png`;
  }

  if (subcategory === "cookbooks") {
    const formatted = itemName
      .trim()
      .toLowerCase()
      .replace(/\[.*?\]/g, "")
      .replace(/[^a-z0-9 ]/g, "")
      .replace(/\s+/g, "_");

    return `${baseUrl}${formatted}elden_ring_wiki_guide_200px.png`;
  }

  const formattedName = itemName.trim().toLowerCase().replace(/\s+/g, "_");
  return isDlc
    ? `${baseUrl}${formattedName}_crafting_material_elden_ring_shadow_of_the_erdtree_dlc_wiki_guide_200px.png`
    : `${baseUrl}${formattedName}_elden_ring_wiki_guide_200px.png`;
}

export function convertArmourItemNameToWikiImageUrl(
  itemName: string,
  isDlc: boolean
) {
  const formattedName = itemName
    .trim()
    .toLowerCase()
    .replace(/^note:\s*/i, "") // Remove "Note:" prefix if present
    .replace(/[^a-z0-9 ]/g, "") // Remove all non-alphanumeric characters except space
    .replace(/\s+/g, "_"); // Replace spaces with underscores

  return `${baseUrl}armour_${formattedName}-${
    isDlc ? "shadow_of_the_erdtree_dlc_" : ""
  }elden-ring-wiki-guide-200px.png`;
}

export function convertConsumableOrMultiplayerItemNameToWikiImageUrl(
  itemName: string,
  isDlc: boolean
) {
  const formattedName = itemName
    .trim()
    .toLowerCase()
    .replace(/^note:\s*/i, "") // Remove "Note:" prefix if present
    .replace(/[^a-z0-9 ]/g, "") // Remove all non-alphanumeric characters except space
    .replace(/\s+/g, "_"); // Replace spaces with underscores

  return `${baseUrl}consumables_${formattedName}-${
    isDlc ? "shadow_of_the_erdtree_dlc_" : ""
  }elden-ring-wiki-guide-200px.png`;
}
