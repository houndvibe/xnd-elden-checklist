export type ItemCategory =
  | "meleWeapons"
  | "rangedWeapons"
  | "armour"
  | "shieldsAndTorches"
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
  | "cookbooks"
  | "infoItems";

//Щиты
export interface ShieldOrTorchItem {
  type: Extract<ItemCategory, "shieldsAndTorches">;
  name: string;
  collected: boolean;
  link: string;
  dlc: boolean;
  imgUrl?: string;
}

export interface ShieldAndTorchesSubCategoryMap {
  torches: ShieldOrTorchItem[];
  smallShields: ShieldOrTorchItem[];
  mediumShields: ShieldOrTorchItem[];
  greatShields: ShieldOrTorchItem[];
  thrustingShields: ShieldOrTorchItem[];
}

//Духи
export interface SpiritAshItem {
  type: Extract<ItemCategory, "spiritAshes">;
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
  type: Extract<ItemCategory, "talismans">;
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

//Пеплы войны
export interface AshOfWarItem {
  type: Extract<ItemCategory, "ashesOfWar">;
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

//Магия
export interface SorceryItem {
  type: Extract<ItemCategory, "sorceries">;
  name: string;
  collected: boolean;
  link: string;
  legendary: boolean;
  dlc: boolean;
  imgUrl?: string;
}

export interface SorceriesSubCategoryMap {
  academyOfRayaLucaria: SorceryItem[];
  carianRoyalFamily: SorceryItem[];
  "sellia&Gelmir": SorceryItem[];
  "snow&Crystal": SorceryItem[];
  gravityFingersBriars: SorceryItem[];
  servantsOfDeath: SorceryItem[];
}

//Молитвы
export interface IncantationsItem {
  type: Extract<ItemCategory, "incantations">;
  name: string;
  collected: boolean;
  link: string;
  legendary: boolean;
  dlc: boolean;
  imgUrl?: string;
}

export interface IncantationsSubCategoryMap {
  twoFingers: IncantationsItem[];
  "erdtree&GoldenOrder": IncantationsItem[];
  miquella: IncantationsItem[];
  dragonCult: IncantationsItem[];
  shadowRealm: IncantationsItem[];
  "fireMonk&FireGiant": IncantationsItem[];
  messmer: IncantationsItem[];
  "godskin&Gurranq": IncantationsItem[];
  "blood&Rot": IncantationsItem[];
  threeFingers: IncantationsItem[];
  dragonCommunion: IncantationsItem[];
}

//Жесты
export interface GestureItem {
  type: Extract<ItemCategory, "gestures">;
  name: string;
  collected: boolean;
  link: string;
  dlc: boolean;
  imgUrl?: string;
}

export interface GesturesSubCategoryMap {
  gestures: GestureItem[];
}

//Оружие
export interface MeleWeaponItem {
  type: Extract<ItemCategory, "meleWeapons">;
  name: string;
  collected: boolean;
  link: string;
  legendary: boolean;
  dlc: boolean;
  imgUrl?: string;
}

export interface MeleWeaponsSubCategoryMap {
  daggers: MeleWeaponItem[];
  throwingBlades: MeleWeaponItem[];
  straightSwords: MeleWeaponItem[];
  lightGreatswords: MeleWeaponItem[];
  greatswords: MeleWeaponItem[];
  colossalSwords: MeleWeaponItem[];
  thrustingSwords: MeleWeaponItem[];
  heavyThrustingSwords: MeleWeaponItem[];
  curvedSwords: MeleWeaponItem[];
  curvedGreatswords: MeleWeaponItem[];
  backhandBlades: MeleWeaponItem[];
  katanas: MeleWeaponItem[];
  greatKatanas: MeleWeaponItem[];
  twinblades: MeleWeaponItem[];
  axes: MeleWeaponItem[];
  greatAxes: MeleWeaponItem[];
  hammers: MeleWeaponItem[];
  flails: MeleWeaponItem[];
  greatHammers: MeleWeaponItem[];
  colossalWeapons: MeleWeaponItem[];
  spears: MeleWeaponItem[];
  greatSpears: MeleWeaponItem[];
  helberds: MeleWeaponItem[];
  reapers: MeleWeaponItem[];
  whips: MeleWeaponItem[];
  fists: MeleWeaponItem[];
  handToHand: MeleWeaponItem[];
  claws: MeleWeaponItem[];
  beastClaws: MeleWeaponItem[];
  perfumeBottles: MeleWeaponItem[];
}

export interface RangedWeaponItem {
  type: Extract<ItemCategory, "rangedWeapons">;
  name: string;
  collected: boolean;
  link: string;
  legendary: boolean;
  dlc: boolean;
  imgUrl?: string;
}

export interface RangedWeaponsSubCategoryMap {
  lightBows: RangedWeaponItem[];
  bows: RangedWeaponItem[];
  greatbows: RangedWeaponItem[];
  crossbows: RangedWeaponItem[];
  ballistae: RangedWeaponItem[];
  glintstoneStaves: RangedWeaponItem[];
  sacredSeals: RangedWeaponItem[];
}

//Бумажки
export interface InfoItems {
  type: Extract<ItemCategory, "infoItems">;
  name: string;
  collected: boolean;
  link: string;
  dlc: boolean;
  info: string;
  location: string;
  imgUrl?: string;
}

export interface InfoItemsSubCategoryMap {
  guides: InfoItems[];
  paintings: InfoItems[];
  tutorials: InfoItems[];
}

//общее
export type ItemSubCategoryMap =
  | ShieldAndTorchesSubCategoryMap
  | SpiritAshesSubCategoryMap
  | TalismansSubCategoryMap
  | AshesOfWarSubCategoryMap
  | SorceriesSubCategoryMap
  | IncantationsSubCategoryMap
  | GesturesSubCategoryMap
  | MeleWeaponsSubCategoryMap
  | RangedWeaponsSubCategoryMap
  | InfoItemsSubCategoryMap;

export type ItemSubCategory =
  | keyof ShieldAndTorchesSubCategoryMap
  | keyof SpiritAshesSubCategoryMap
  | keyof TalismansSubCategoryMap
  | keyof AshesOfWarSubCategoryMap
  | keyof SorceriesSubCategoryMap
  | keyof IncantationsSubCategoryMap
  | keyof GesturesSubCategoryMap
  | keyof MeleWeaponsSubCategoryMap
  | keyof RangedWeaponsSubCategoryMap
  | keyof InfoItemsSubCategoryMap;

export type Item =
  | ShieldOrTorchItem
  | SpiritAshItem
  | TalismanItem
  | AshOfWarItem
  | SorceryItem
  | IncantationsItem
  | GestureItem
  | MeleWeaponItem
  | RangedWeaponItem
  | InfoItems;
