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
    imgUrl: "./images/armour/pieces/Black Dumpling.png",
  },
  {
    key: "2",
    name: "Magma Blade",
    base: 1,
    imgUrl: "./images/meleWeapons/curvedSwords/Magma Blade.png",
  },
  {
    key: "3",
    name: "Bandit's Curved Sword",
    base: 1.5,
    imgUrl: "./images/meleWeapons/curvedSwords/Bandit's Curved Sword.png",
  },
  {
    key: "4",
    name: "Pest's Glaive",
    base: 4,
    imgUrl: "./images/meleWeapons/helberds/Pest's Glaive.png",
  },
];

export const discoveryData: Discovery = {
  arcane: 10,
  rune: false,
  buff: false,
  chest: false,
  amulets: [
    {
      name: "Marika's Soreseal",
      effect: { arcaneGain: 5, discoveryGain: 0 },
      imgUrl:
        "https://eldenring.wiki.fextralife.com/file/Elden-Ring/marika's_soreseal_talismans_elden_ring_wiki_200px.png",
    },
    {
      name: "Marika's Scarsea",
      effect: { arcaneGain: 3, discoveryGain: 0 },
      imgUrl:
        "https://eldenring.wiki.fextralife.com/file/Elden-Ring/marikas_scarseal_talisman_elden_ring_wiki_guide_200px.png",
    },
    {
      name: "Silver Scarab",
      effect: { arcaneGain: 0, discoveryGain: 75 },
      imgUrl:
        "https://eldenring.wiki.fextralife.com/file/Elden-Ring/silver_scarab_talisman_elden_ring_wiki_guide_200px.png",
    },
  ],
  helmets: [
    {
      name: "Silver Tear Mask",
      effect: { arcaneGain: 8, discoveryGain: 0 },
      imgUrl:
        "https://eldenring.wiki.fextralife.com/file/Elden-Ring/silver_tear_mask_elden_ring_wiki_guide_200px.png",
    },
    {
      name: "Albinauric Mask",
      effect: { arcaneGain: 4, discoveryGain: 0 },
      imgUrl:
        "https://eldenring.wiki.fextralife.com/file/Elden-Ring/albinauric_mask_elden_ring_wiki_guide_200px.png",
    },
    {
      name: "Witch's Glintstone Crown",
      effect: { arcaneGain: 3, discoveryGain: 0 },
      imgUrl:
        "https://eldenring.wiki.fextralife.com/file/Elden-Ring/witchs_glintstone_crown_helmet_elden_ring_wiki_guide_200px.png",
    },
    {
      name: "Mask of Confidence ",
      effect: { arcaneGain: 3, discoveryGain: 3 },
      imgUrl:
        "https://eldenring.wiki.fextralife.com/file/Elden-Ring/mask_of_confidence_elden_ring_wiki_guide_200px.png",
    },
    {
      name: "Thiollier's Mask",
      effect: { arcaneGain: 3, discoveryGain: 0 },
      imgUrl:
        "https://eldenring.wiki.fextralife.com/file/Elden-Ring/thiolliers_mask_helm_elden_ring_shadow_of_the_erdtree_dlc_wiki_guide_200px.png",
    },
    {
      name: "Imp Head (Elder)",
      effect: { arcaneGain: 2, discoveryGain: 0 },
      imgUrl:
        "https://eldenring.wiki.fextralife.com/file/Elden-Ring/imp_head_(elder)_elden_ring_wiki_guide_200px.png",
    },
    {
      name: "Circlet of Light",
      effect: { arcaneGain: 1, discoveryGain: 0 },
      imgUrl:
        "https://eldenring.wiki.fextralife.com/file/Elden-Ring/circlet_of_light_helm_elden_ring_shadow_of_the_erdtree_dlc_wiki_guide_200px.png",
    },
    {
      name: "Marais Mask",
      effect: { arcaneGain: 1, discoveryGain: 0 },
      imgUrl:
        "https://eldenring.wiki.fextralife.com/file/Elden-Ring/marais_mask_elden_ring_wiki_guide_200px.png",
    },
  ],
  consumables: [
    {
      name: "Silver-Pickled Fowl Foot",
      effect: { arcaneGain: 0, discoveryGain: 50 },
      imgUrl:
        "https://eldenring.wiki.fextralife.com/file/Elden-Ring/silver_pickled_fowl_foot__elden_ring_wiki_guide_200px.png",
      time: 180,
    },
    {
      name: "Silver Horn Tender",
      effect: { arcaneGain: 0, discoveryGain: 60 },
      imgUrl:
        "https://eldenring.wiki.fextralife.com/file/Elden-Ring/silver_horn_tender_elden_ring_shadow_of_the_erdtree_dlc_wiki_guide_200px.png",
      time: 180,
    },
  ],
};
