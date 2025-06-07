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
