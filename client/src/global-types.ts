export type ItemCategory =
  | "weapons"
  | "armour"
  | "shields"
  | "talismans"
  | "ashesOfWar"
  | "spiritAshes"
  | "sorceries"
  | "incantations"
  | "tears"
  | "gestures"
  | "tools"
  | "craft"
  | "upgrades"
  | "bellBearings"
  | "cookbooks";

//Щиты
export interface ShieldItem {
  type: "shields";
  name: string;
  collected: boolean;
  link: string;
  dlc: boolean;
  imgUrl?: string;
}

export interface ShieldSubCategoryMap {
  smallShields: ShieldItem[];
  mediumShields: ShieldItem[];
  greatShields: ShieldItem[];
  thrustingShields: ShieldItem[];
}

//Духи
export interface SpiritAshItem {
  type: "spiritAshes";
  name: string;
  collected: boolean;
  link: string;
  dlc: boolean;
  legendary: boolean;
  imgUrl?: string;
}

export interface SpiritAshesSubCategoryMap {
  irrationalSpirits: SpiritAshItem[];
  rationalSpirits: SpiritAshItem[];
  eliteSpirits: SpiritAshItem[];
  puppets: SpiritAshItem[];
}

//Талисманы
export interface TalismanVersions {
  tier: 0 | 1 | 2 | 3;
  collected: boolean;
  legendary?: boolean;
  dlc?: true;
}

export interface TalismanItem {
  type: "talismans";
  name: string;
  collected: boolean;
  link: string;
  dlc: boolean;
  legendary: boolean;
  imgUrl?: string;
  versions?: TalismanVersions[];
}

export interface TalismansSubCategoryMap {
  category1: TalismanItem[];
  category2: TalismanItem[];
  category3: TalismanItem[];
  category4: TalismanItem[];
  category5: TalismanItem[];
  category6: TalismanItem[];
  category7: TalismanItem[];
  category8: TalismanItem[];
}

export interface AshOfWarItem {
  type: "ashesOfWar";
  name: string;
  collected: boolean;
  link: string;
  dlc: boolean;
  imgUrl?: string;
}

export interface AshesOfWarSubCategoryMap {
  heavy: AshOfWarItem[];
  keen: AshOfWarItem[];
  quality: AshOfWarItem[];
  magic: AshOfWarItem[];
  flameLightning: AshOfWarItem[];
  sacred: AshOfWarItem[];
  poisonBloodCold: AshOfWarItem[];
  occult: AshOfWarItem[];
  noAffinityHandToHandAndPerfume: AshOfWarItem[];
  noAffinityRanged: AshOfWarItem[];
  noAffinityShield: AshOfWarItem[];
}

//общее
export type ItemSubCategoryMap =
  | ShieldSubCategoryMap
  | SpiritAshesSubCategoryMap
  | TalismansSubCategoryMap
  | AshesOfWarSubCategoryMap;

export type ItemSubCategory =
  | keyof ShieldSubCategoryMap
  | keyof SpiritAshesSubCategoryMap
  | keyof TalismansSubCategoryMap
  | keyof AshesOfWarSubCategoryMap;

export type Item = ShieldItem | SpiritAshItem | TalismanItem | AshOfWarItem;
