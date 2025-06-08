import { Item } from "../../global-types";

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

    case "gestures":
      return convertGestureNameToWikiImageUrl(record.name, record.dlc);

    case "infoItems":
      return convertInfoItemNameToWikiImageUrl(record.name, record.dlc);

    case "toolsAndBellBearings":
      return convertToolOrBellNameToWikiImageUrl(record.name, record.dlc);

    case "tearsAndUpgrades":
      return convertTearOrUpgradeNameToWikiImageUrl(record.name, record.dlc);

    case "craft":
      return convertCraftItemNameToWikiImageUrl(record.name, record.dlc);

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

export function convertShieldNameToWikiImageUrl(
  itemName: string,
  isDlc: boolean
) {
  const baseUrl = "https://eldenring.wiki.fextralife.com/file/Elden-Ring/";
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
  const baseUrl = "https://eldenring.wiki.fextralife.com/file/Elden-Ring/";
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
  const baseUrl = "https://eldenring.wiki.fextralife.com/file/Elden-Ring/";
  const formattedName = itemName
    .trim()
    .toLowerCase()
    .replace(/ /g, "_")
    .replace(/[^a-z0-9_-]/g, "");

  return `${baseUrl}${formattedName}_talisman_elden_ring_${
    isDlc ? "shadow_of_the_erdtree_dlc_" : ""
  }wiki_guide_200px.png`;
}
//тайтл из типа
export function toTitleCaseFromCamel(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^./, (s) => s.toUpperCase());
}

export function convertAshOfWarNameToWikiImageUrl(
  itemName: string,
  isDlc: boolean
) {
  const baseUrl = "https://eldenring.wiki.fextralife.com/file/Elden-Ring/";
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
  const baseUrl = "https://eldenring.wiki.fextralife.com/file/Elden-Ring/";
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
  const baseUrl = "https://eldenring.wiki.fextralife.com/file/Elden-Ring/";
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
  const baseUrl = "https://eldenring.wiki.fextralife.com/file/Elden-Ring/";
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
  const baseUrl = "https://eldenring.wiki.fextralife.com/file/Elden-Ring/";
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
  const baseUrl = "https://eldenring.wiki.fextralife.com/file/Elden-Ring/";
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
  const baseUrl = "https://eldenring.wiki.fextralife.com/file/Elden-Ring/";
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
  isDlc: boolean
) {
  const baseUrl = "https://eldenring.wiki.fextralife.com/file/Elden-Ring/";
  const formattedName = itemName
    .trim()
    .toLowerCase()
    .replace(/^note:\s*/i, "") // Remove "Note:" prefix if present
    .replace(/[^a-z0-9 ]/g, "") // Remove all non-alphanumeric characters except space
    .replace(/\s+/g, "_"); // Replace spaces with underscores

  return `${baseUrl}tool-or-bell_${formattedName}-${
    isDlc ? "shadow_of_the_erdtree_dlc_" : ""
  }elden-ring-wiki-guide-200px.png`;
}

export function convertTearOrUpgradeNameToWikiImageUrl(
  itemName: string,
  isDlc: boolean
) {
  const baseUrl = "https://eldenring.wiki.fextralife.com/file/Elden-Ring/";
  const formattedName = itemName
    .trim()
    .toLowerCase()
    .replace(/^note:\s*/i, "") // Remove "Note:" prefix if present
    .replace(/[^a-z0-9 ]/g, "") // Remove all non-alphanumeric characters except space
    .replace(/\s+/g, "_"); // Replace spaces with underscores

  return `${baseUrl}tear_${formattedName}-${
    isDlc ? "shadow_of_the_erdtree_dlc_" : ""
  }elden-ring-wiki-guide-200px.png`;
}

export function convertCraftItemNameToWikiImageUrl(
  itemName: string,
  isDlc: boolean
) {
  const baseUrl = "https://eldenring.wiki.fextralife.com/file/Elden-Ring/";
  const formattedName = itemName
    .trim()
    .toLowerCase()
    .replace(/^note:\s*/i, "") // Remove "Note:" prefix if present
    .replace(/[^a-z0-9 ]/g, "") // Remove all non-alphanumeric characters except space
    .replace(/\s+/g, "_"); // Replace spaces with underscores

  return `${baseUrl}craft_${formattedName}-${
    isDlc ? "shadow_of_the_erdtree_dlc_" : ""
  }elden-ring-wiki-guide-200px.png`;
}
