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

export type ItemSubCategoryMap =
  | ShieldSubCategoryMap
  | SpiritAshesSubCategoryMap
  | TalismansSubCategoryMap;

export type ItemSubCategory =
  | keyof ShieldSubCategoryMap
  | keyof SpiritAshesSubCategoryMap
  | keyof TalismansSubCategoryMap;

export type Item = ShieldItem | SpiritAshItem | TalismanItem;
