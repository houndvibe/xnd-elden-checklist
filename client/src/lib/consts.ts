import type { ProgressProps } from "antd";
import type { ItemCategory, ItemSubCategory } from "../global-types";

export const CURRENT_APP_VERSION = "(v. 0.9.4 beta)";

export const BOOSTY_LINK = "https://boosty.to/xnd";
export const PATREON_LINK = "https://www.patreon.com/XnDs";
export const YOUTUBE_LINK = "https://www.youtube.com/@XnDsChanel";

export const LOCALSTORAGE_COLLECTION_KEY = "XnDEldenCompendium.collection";
export const LOCALSTORAGE_SETTINGS_KEY = "XnDEldenCompendium.settings";
export const LOCALSTORAGE_CHECKPOINTS_KEY = "XnDEldenCompendium.checkpoints";

export const BASE_DISCOVERY = 100;

export const itemCategories: ItemCategory[] = [
  "consumablesAndAmmo",
  "toolsAndBellBearings",
  "gesturesAndMultiplayer",
  "spiritAshes",
  "craft",
  "tearsAndUpgrades",
  "keyItems",
  "sorceries",
  "incantations",
  "ashesOfWar",
  "meleWeapons",
  "rangedWeapons",
  "shieldsAndTorches",
  "armour",
  "talismans",
  "infoItems",
];

export const itemSubCategories: ItemSubCategory[] = [
  "lightBows",
  "bows",
  "greatbows",
  "crossbows",
  "ballistas",
  "glintstoneStaves",
  "sacredSeals",
  "torches",
  "smallShields",
  "mediumShields",
  "greatShields",
  "thrustingShields",
  "academyOfRayaLucaria",
  "carianRoyalFamily",
  "sellia&Gelmir",
  "snow&Crystal",
  "gravityFingersBriars",
  "servantsOfDeath",
  "gestures",
  "multiplayer",
  "statsAmplifiers",
  "resistsAmplifiers",
  "weaponAmplifiers",
  "magicAmplifiers",
  "abilities & consumables",
  "damageAmplifiers",
  "conditionalAmplifiers",
  "other",
  "irrationalSpirits",
  "rationalSpirits",
  "eliteSpirits",
  "puppets",
  "twoFingers",
  "erdtree&GoldenOrder",
  "miquella",
  "dragonCult",
  "shadowRealm",
  "fireMonk&FireGiant",
  "messmer",
  "godskin&Gurranq",
  "blood&Rot",
  "threeFingers",
  "dragonCommunion",
  "crystalTears",
  "smithingStones",
  "gloveworts",
  "upgrades",
  "heavy",
  "keen",
  "quality",
  "magic",
  "flameLightning",
  "sacred",
  "poisonBloodCold",
  "noAffinityHandToHandAndPerfume",
  "noAffinityRanged",
  "noAffinityShield",
  "occult",
  "daggers",
  "throwingBlades",
  "straightSwords",
  "lightGreatswords",
  "greatswords",
  "colossalSwords",
  "thrustingSwords",
  "heavyThrustingSwords",
  "curvedSwords",
  "curvedGreatswords",
  "backhandBlades",
  "katanas",
  "greatKatanas",
  "twinblades",
  "axes",
  "greatAxes",
  "hammers",
  "flails",
  "greatHammers",
  "colossalWeapons",
  "spears",
  "greatSpears",
  "helberds",
  "reapers",
  "whips",
  "fists",
  "handToHand",
  "claws",
  "beastClaws",
  "perfumeBottles",
  "tools",
  "bellBearings",
  "instruments",
  "materials",
  "cookbooks",
  "paintings",
  "tutorials",
  "maps",
  "notes",
  "food",
  "throwables",
  "greases",
  "runes",
  "ammo",
  "remembrances",
  "quests",
  "keys",
  "spellBooks",
  "greatRunes",
  "commonfolkAndWanderers",
  "scholarsAndSeers",
  "cultistsAndNobles",
  "roguesAndOutcasts",
  "militiaAndFringeWarriors",
  "rankedSoldiers",
  "eliteKnightsAndLegends",
  "knightlyOrders",
  "namedChampions",
  "warlords",
  "juggernouts",
  "pieces",
];

export const legendaryEligibleItemCategories: ItemCategory[] = [
  "meleWeapons",
  "rangedWeapons",
  "talismans",
  "spiritAshes",
  "sorceries",
  "incantations",
];

export const APP_PALETTE = {
  textPrimary: "#aa7714",
  textHighlighted: "#e8b339",
  successGreen: "#112123",
  bgDark: "#141414",
  bgLight: "#1f1f1f",
  text: "#856a51",
};

export const PROGRESSBAR_COLORS: ProgressProps["strokeColor"] = {
  "0%": APP_PALETTE.textPrimary,
  "100%": APP_PALETTE.textPrimary,
};

export const exceptionalSubcategories = ["bellBearings", "cookbooks", "notes"];

export const TRUNCATE_LIMITS = {
  DASHBOARD: 16,
  SUB_CATEGOTY_LABEL: 23,
};

export const FASTCHECK_SIZE_S = 40;
export const FASTCHECK_SIZE_M = 95;
export const FASTCHECK_SIZE_L = 140;
export const FASTCHECK_SIZE_XL = 210;

export const DLC_ONLY_SUBCATEGORIES: ItemSubCategory[] = [
  "thrustingShields",
  "messmer",
  "miquella",
  "shadowRealm",
  "noAffinityHandToHandAndPerfume",
  "throwingBlades",
  "lightGreatswords",
  "backhandBlades",
  "greatKatanas",
  "handToHand",
  "beastClaws",
  "perfumeBottles",
];

export const STAT_MAX_VALUE = 99;
