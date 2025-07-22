import { t } from "../../i18n";

export interface DiscoveryItem {
  name: string;
  effect: { arcaneGain: number; discoveryGain: number };
  imgUrl: string;
  time?: number;
}

export interface Discovery {
  arcane: number;
  rune: boolean;
  buff: boolean;
  chest: boolean;
  amulets: DiscoveryItem[];
  helmets: DiscoveryItem[];
  consumables: DiscoveryItem[];
}

export interface ItemDropTable {
  key: string;
  name: string;
  base: number;
  imgUrl: string;
}

export const EXAMPLE_ITEM_DROPS: ItemDropTable[] = [
  {
    key: "1",
    name: "Black Dumpling",
    base: 0.5,
    imgUrl: "./images_resized/armour/pieces/Black Dumpling.png",
  },
  {
    key: "2",
    name: "Magma Blade",
    base: 1,
    imgUrl: "./images_resized/meleWeapons/curvedSwords/Magma Blade.png",
  },
  {
    key: "3",
    name: "Bandit's Curved Sword",
    base: 1.5,
    imgUrl:
      "./images_resized/meleWeapons/curvedSwords/Bandit's Curved Sword.png",
  },
  {
    key: "4",
    name: "Pest's Glaive",
    base: 4,
    imgUrl: "./images_resized/meleWeapons/helberds/Pest's Glaive.png",
  },
];

export const discoveryData: Discovery = {
  arcane: 10,
  rune: false,
  buff: false,
  chest: false,
  amulets: [
    {
      name: t("misc", "Marika's Soreseal"),
      effect: { arcaneGain: 5, discoveryGain: 0 },
      imgUrl:
        "./images_resized/talismans/statsAmplifiers/Marika's Soreseal.png",
    },
    {
      name: t("misc", "Marika's Scarseal"),
      effect: { arcaneGain: 3, discoveryGain: 0 },
      imgUrl:
        "./images_resized/talismans/statsAmplifiers/Marika's Scarseal.png",
    },
    {
      name: t("misc", "Silver Scarab"),
      effect: { arcaneGain: 0, discoveryGain: 75 },
      imgUrl:
        "./images_resized/talismans/conditionalAmplifiers/Silver Scarab.png",
    },
  ],
  helmets: [
    {
      name: t("misc", "Silver Tear Mask"),
      effect: { arcaneGain: 8, discoveryGain: 0 },
      imgUrl: "./images_resized/armour/pieces/Silver Tear Mask.png",
    },
    {
      name: t("misc", "Albinauric Mask"),
      effect: { arcaneGain: 4, discoveryGain: 0 },
      imgUrl:
        "./images_resized/armour/commonfolkAndWanderers/Albinauric Mask.png",
    },
    {
      name: t("misc", "Witch's Gl. Crown"),
      effect: { arcaneGain: 3, discoveryGain: 0 },
      imgUrl:
        "./images_resized/armour/scholarsAndSeers/Witch's Glintstone Crown.png",
    },
    {
      name: t("misc", "Mask Of Confidence"),
      effect: { arcaneGain: 3, discoveryGain: 3 },
      imgUrl: "./images_resized/armour/pieces/Mask Of Confidence.png",
    },
    {
      name: t("misc", "Thiollier's Mask"),
      effect: { arcaneGain: 3, discoveryGain: 0 },
      imgUrl: "./images_resized/armour/roguesAndOutcasts/Thiollier's Mask.png",
    },
    {
      name: t("misc", "Imp Head (Elder)"),
      effect: { arcaneGain: 2, discoveryGain: 0 },
      imgUrl: "./images_resized/armour/pieces/Imp Head (Elder).png",
    },
    {
      name: t("misc", "Circlet of Light"),
      effect: { arcaneGain: 1, discoveryGain: 0 },
      imgUrl: "./images_resized/armour/pieces/Circlet of Light.png",
    },
    {
      name: t("misc", "Marais Mask"),
      effect: { arcaneGain: 1, discoveryGain: 0 },
      imgUrl: "./images_resized/armour/cultistsAndNobles/Marais Mask.png",
    },
  ],
  consumables: [
    {
      name: t("misc", "Silver-Pickled Fowl Foot"),
      effect: { arcaneGain: 0, discoveryGain: 50 },
      imgUrl:
        "./images_resized/consumablesAndAmmo/food/Silver-Pickled Fowl Foot.png",
      time: 180,
    },
    {
      name: t("misc", "Silver Horn Tender"),
      effect: { arcaneGain: 0, discoveryGain: 60 },
      imgUrl: "./images_resized/consumablesAndAmmo/food/Silver Horn Tender.png",
      time: 180,
    },
  ],
};
