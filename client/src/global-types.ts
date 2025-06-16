export type ItemCategory =
  | "meleWeapons"
  | "rangedWeapons"
  | "armour"
  | "shieldsAndTorches"
  | "talismans"
  | "sorceries"
  | "incantations"
  | "spiritAshes"
  | "ashesOfWar"
  | "tearsAndUpgrades"
  | "toolsAndBellBearings"
  | "gesturesAndMultiplayer"
  | "craft"
  | "consumablesAndAmmo"
  | "infoItems"
  | "keyItems";
//Тут и души и оружие/магия с боссов

//Щиты
export interface ShieldOrTorchItem {
  type: Extract<ItemCategory, "shieldsAndTorches">;
  subcategory: keyof ShieldAndTorchesSubCategoryMap;
  name: string;
  /*   description: string; */
  link: string;
  collected: boolean;
  legendary: boolean;
  dlc: boolean;
  imgUrl?: string;
  /*   droppedBy: {
    name: string;
    dropRate: number;
    link: string;
    imgUrl: string;
  } | null;
  vendor: {
    name: string;
    link: string;
    imgUrl: string;
  } | null;
  placementDescription?: string | null; */
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
  statsAmplifiers: TalismanItem[];
  resistsAmplifiers: TalismanItem[];
  weaponAmplifiers: TalismanItem[];
  magicAmplifiers: TalismanItem[];
  "abilities & consumables": TalismanItem[];
  damageAmplifiers: TalismanItem[];
  conditionalAmplifiers: TalismanItem[];
  other: TalismanItem[];
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
export interface GestureOrMultiplayerItem {
  type: Extract<ItemCategory, "gesturesAndMultiplayer">;
  name: string;
  description: string;
  collected: boolean;
  link: string;
  dlc: boolean;
  imgUrl?: string;
}

export interface GesturesAndMultiplayerSubCategoryMap {
  gestures: GestureOrMultiplayerItem[];
  multiplayer: GestureOrMultiplayerItem[];
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
  subcategory: keyof RangedWeaponsSubCategoryMap;
  name: string;
  /*   description: string; */
  link: string;
  collected: boolean;
  legendary: boolean;
  dlc: boolean;
  imgUrl?: string;
  /*   droppedBy: {
    name: string;
    dropRate: number;
    link: string;
    imgUrl: string;
  } | null;
  vendor: {
    name: string;
    link: string;
    imgUrl: string;
  } | null;
  placementDescription?: string | null; */
}

export interface RangedWeaponsSubCategoryMap {
  lightBows: RangedWeaponItem[];
  bows: RangedWeaponItem[];
  greatbows: RangedWeaponItem[];
  crossbows: RangedWeaponItem[];
  ballistas: RangedWeaponItem[];
  glintstoneStaves: RangedWeaponItem[];
  sacredSeals: RangedWeaponItem[];
}

//Бумажки
export interface InfoItems {
  type: Extract<ItemCategory, "infoItems">;
  subcategory: keyof InfoItemsSubCategoryMap;
  name: string;
  collected: boolean;
  link: string;
  dlc: boolean;
  imgUrl?: string;
}

export interface InfoItemsSubCategoryMap {
  notes: InfoItems[];
  paintings: InfoItems[];
  tutorials: InfoItems[];
  maps: InfoItems[];
}

//Инструменты и колокольные сферы

export interface ToolOrBellBearingItems {
  type: Extract<ItemCategory, "toolsAndBellBearings">;
  subcategory: keyof ToolsOrBellBearingsCategoryMap;
  name: string;
  collected: boolean;
  link: string;
  dlc: boolean;
  imgUrl?: string;
}

export interface ToolsOrBellBearingsCategoryMap {
  tools: ToolOrBellBearingItems[];
  bellBearings: ToolOrBellBearingItems[];
}

//Слезы, апгрейды и материалы для апгрейдов

export interface TearsOrUpgradesItem {
  type: Extract<ItemCategory, "tearsAndUpgrades">;
  subcategory: keyof TearsOrUpgradesCategoryMap;
  name: string;
  collected: boolean;
  link: string;
  dlc: boolean;
  imgUrl?: string;
}

export interface TearsOrUpgradesCategoryMap {
  crystalTears: TearsOrUpgradesItem[];
  upgrades: TearsOrUpgradesItem[];
  smithingStones: TearsOrUpgradesItem[];
  gloveworts: TearsOrUpgradesItem[];
}

//Крафт, рецепты и материалы для крафта

export interface CraftItem {
  type: Extract<ItemCategory, "craft">;
  subcategory: keyof CraftItemsCategoryMap;
  name: string;
  collected: boolean;
  link: string;
  dlc: boolean;
  imgUrl?: string;
}

export interface CraftItemsCategoryMap {
  instruments: CraftItem[];
  cookbooks: CraftItem[];
  materials: CraftItem[];
}

//Армор

export interface ArmorBase {
  type: Extract<ItemCategory, "armour">;
  pieceType: "set" | "helm" | "gloves" | "chest" | "boots";
  name: string;
  collected: boolean;
  link: string;
  dlc: boolean;
  imgUrl?: string;
}

export interface ArmourPiece extends ArmorBase {
  children?: ArmorBase[];
}

export interface ArmourSet extends ArmourPiece {
  items: ArmourPiece[];
}

export type ArmourItem = ArmourSet | ArmourPiece;

export interface ArmourSubCategoryMap {
  "Commonfolk&Wanderers": ArmourSet[];
  "Scholars&Seers": ArmourSet[];
  "Cultists&Nobles": ArmourSet[];
  "Rogues&Outcasts": ArmourSet[];
  "Militia&FringeWarriors": ArmourSet[];
  RankedSoldiers: ArmourSet[];
  "EliteKnights&Legends": ArmourSet[];
  KnightlyOrders: ArmourSet[];
  NamedChampions: ArmourSet[];
  "Warlords & Colossi": ArmourSet[];
  pieces: ArmourItem[];
}

//Расходники и мультиплеер

export interface СonsumableAndAmmoItem {
  type: Extract<ItemCategory, "consumablesAndAmmo">;
  name: string;
  collected: boolean;
  link: string;
  legendary: boolean;
  dlc: boolean;
  imgUrl?: string;
}

export interface СonsumablesAndAmmoItemsCategoryMap {
  food: СonsumableAndAmmoItem[];
  greases: СonsumableAndAmmoItem[];
  throwables: СonsumableAndAmmoItem[];
  souls: СonsumableAndAmmoItem[];
  other: СonsumableAndAmmoItem[];
  ammo: СonsumableAndAmmoItem[];
}

//Ключевые

export interface KeyItem {
  type: Extract<ItemCategory, "keyItems">;
  name: string;
  collected: boolean;
  link: string;
  legendary: boolean;
  dlc: boolean;
  imgUrl?: string;
}

export interface KeyItemsSubCategoryMap {
  keys: KeyItem[];
  quests: KeyItem[];
  spellbooks: KeyItem[];
  maps: KeyItem[];
  greatRunes: KeyItem[];
  remembrences: KeyItem[];
}

//общее
export type ItemSubCategoryMap =
  | ShieldAndTorchesSubCategoryMap
  | SpiritAshesSubCategoryMap
  | TalismansSubCategoryMap
  | AshesOfWarSubCategoryMap
  | SorceriesSubCategoryMap
  | IncantationsSubCategoryMap
  | GesturesAndMultiplayerSubCategoryMap
  | MeleWeaponsSubCategoryMap
  | RangedWeaponsSubCategoryMap
  | InfoItemsSubCategoryMap
  | ToolsOrBellBearingsCategoryMap
  | TearsOrUpgradesCategoryMap
  | CraftItemsCategoryMap
  | ArmourSubCategoryMap
  | СonsumablesAndAmmoItemsCategoryMap
  | KeyItemsSubCategoryMap;

export type ItemSubCategory =
  | keyof ShieldAndTorchesSubCategoryMap
  | keyof SpiritAshesSubCategoryMap
  | keyof TalismansSubCategoryMap
  | keyof AshesOfWarSubCategoryMap
  | keyof SorceriesSubCategoryMap
  | keyof IncantationsSubCategoryMap
  | keyof GesturesAndMultiplayerSubCategoryMap
  | keyof MeleWeaponsSubCategoryMap
  | keyof RangedWeaponsSubCategoryMap
  | keyof InfoItemsSubCategoryMap
  | keyof ToolsOrBellBearingsCategoryMap
  | keyof TearsOrUpgradesCategoryMap
  | keyof CraftItemsCategoryMap
  | keyof ArmourSubCategoryMap
  | keyof СonsumablesAndAmmoItemsCategoryMap
  | keyof KeyItemsSubCategoryMap;

export type Item =
  | ShieldOrTorchItem
  | SpiritAshItem
  | TalismanItem
  | AshOfWarItem
  | SorceryItem
  | IncantationsItem
  | GestureOrMultiplayerItem
  | MeleWeaponItem
  | RangedWeaponItem
  | InfoItems
  | ToolOrBellBearingItems
  | TearsOrUpgradesItem
  | CraftItem
  | ArmourItem
  | СonsumableAndAmmoItem
  | KeyItem;

//
