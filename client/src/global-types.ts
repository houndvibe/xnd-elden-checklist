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

export type ItemSubCategoryMap =
  | ShieldSubCategoryMap
  | SpiritAshesSubCategoryMap;

export type ItemSubCategory =
  | keyof ShieldSubCategoryMap
  | keyof SpiritAshesSubCategoryMap;

export type Item = ShieldItem | SpiritAshItem;
