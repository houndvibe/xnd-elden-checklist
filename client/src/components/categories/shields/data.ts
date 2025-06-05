export interface DataType {
  name: string;
  collected: boolean;
  link: string;
  dlc: boolean;
  imgUrl?: string;
}

export interface Shields {
  smallShields: DataType[];
  mediumShields: DataType[];
  greatShields: DataType[];
  thurstingShields: DataType[];
}

export const shieldsData: Shields = {
  smallShields: [
    {
      name: "Rickety Shield",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/Rickety+Shield",
      dlc: false,
    },
    {
      name: "Riveted Wooden Shield",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/Riveted+Wooden+Shield",
      dlc: false,
    },
    {
      name: "Blue-White Wooden Shield",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/Blue-White+Wooden+Shield",
      dlc: false,
    },
    {
      name: "Scripture Wooden Shield",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/Scripture+Wooden+Shield",
      dlc: false,
    },
    {
      name: "Red Thorn Roundshield",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/Red+Thorn+Roundshield",
      dlc: false,
    },
    {
      name: "Pillory Shield",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/Pillory+Shield",
      dlc: false,
      imgUrl:
        "https://eldenring.wiki.fextralife.com/file/Elden-Ring/pillory-small-shield_12004_elden_ring_wiki_guide_200px.png",
    },
    {
      name: "Buckler",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/Buckler",
      dlc: false,
    },
    {
      name: "Iron Roundshield",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/Iron+Roundshield",
      dlc: false,
    },
    {
      name: "Gilded Iron Shield",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/Gilded+Iron+Shield",
      dlc: false,
    },
    {
      name: "Ice Crest Shield",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/Ice+Crest+Shield",
      dlc: false,
    },
    {
      name: "Man-Serpent's Shield",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/Man-Serpent's+Shield",
      dlc: false,
      imgUrl:
        "https://eldenring.wiki.fextralife.com/file/Elden-Ring/man-serpents-shield-small_12002_elden_ring_wiki_guide_200px.png",
    },
    {
      name: "Rift Shield",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/Rift+Shield",
      dlc: false,
    },
    {
      name: "Perfumer's Shield",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/Perfumer's+Shield",
      dlc: false,
      imgUrl:
        "https://eldenring.wiki.fextralife.com/file/Elden-Ring/perfumers-shield-small_elden_ring_wiki_guide_200px.png",
    },
    {
      name: "Shield of the Guilty",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/Shield+of+the+Guilty",
      dlc: false,
    },
    {
      name: "Spiralhorn Shield",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/Spiralhorn+Shield",
      dlc: false,
      imgUrl:
        "https://eldenring.wiki.fextralife.com/file/Elden-Ring/spiralhorn-shield-small_12019_elden_ring_wiki_guide_200px.png",
    },
    {
      name: "Smoldering Shield",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/Smoldering+Shield",
      dlc: false,
      imgUrl:
        "https://eldenring.wiki.fextralife.com/file/Elden-Ring/smoldering-small-shield_12015_elden_ring_wiki_guide_200px.png",
    },
    {
      name: "Coil Shield",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/Coil+Shield",
      dlc: false,
    },
    {
      name: "Smithscript Shield",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/Smithscript+Shield",
      dlc: true,
      imgUrl:
        "https://eldenring.wiki.fextralife.com/file/Elden-Ring/smithscript_shield_elden_ring_shadow_of_the_erdtree_dlc_wiki_guide_200px.png",
    },
    {
      name: "Shield of Night",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/Shield+of+Night",
      dlc: true,
      imgUrl:
        "https://eldenring.wiki.fextralife.com/file/Elden-Ring/shield_of_night_unique_elden_ring_shadow_of_the_erdtree_dlc_wiki_guide_200px.png",
    },
  ],
  mediumShields: [
    {
      name: "Hawk Crest Wooden Shield",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/Hawk+Crest+Wooden+Shield",
      dlc: false,
    },
    {
      name: "Horse Crest Wooden Shield",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/Horse+Crest+Wooden+Shield",
      dlc: false,
    },
    {
      name: "Candletree Wooden Shield",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/Candletree+Wooden+Shield",
      dlc: false,
      imgUrl:
        "https://eldenring.wiki.fextralife.com/file/Elden-Ring/candletree_wooden_shield_medium_shield_elden_ring_wiki_guide_200px.png",
    },
    {
      name: "Flame Crest Wooden Shield",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/Flame+Crest+Wooden+Shield",
      dlc: false,
    },
    {
      name: "Marred Wooden Shield",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/Marred+Wooden+Shield",
      dlc: false,
    },
    {
      name: "Sun Realm Shield",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/Sun+Realm+Shield",
      dlc: false,
      imgUrl:
        "https://eldenring.wiki.fextralife.com/file/Elden-Ring/sun_realm_shield_medium_shield_elden_ring_wiki_guide_200px.png",
    },
    {
      name: "Round Shield",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/Round+Shield",
      dlc: false,
      imgUrl:
        "https://eldenring.wiki.fextralife.com/file/Elden-Ring/round_shield_medium_shield_elden_ring_wiki_guide_200px.png",
    },
    {
      name: "Large Leather Shield",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/Large+Leather+Shield",
      dlc: false,
    },
    {
      name: "Black Leather Shield",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/Black+Leather+Shield",
      dlc: false,
    },
    {
      name: "Marred Leather Shield",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/Marred+Leather+Shield",
      dlc: false,
    },
    {
      name: "Heater Shield",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/Heater+Shield",
      dlc: false,
    },
    {
      name: "Blue Crest Heater Shield",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/Blue+Crest+Heater+Shield",
      dlc: false,
    },
    {
      name: "Red Crest Heater Shield",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/Red+Crest+Heater+Shield",
      dlc: false,
      imgUrl:
        "https://eldenring.wiki.fextralife.com/file/Elden-Ring/red_crest_heater_shield_medium_shield_elden_ring_wiki_guide_200px.png",
    },
    {
      name: "Beast Crest Heater Shield",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/Beast+Crest+Heater+Shield",
      dlc: false,
    },
    {
      name: "Inverted Hawk Heater Shield",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/Inverted+Hawk+Heater+Shield",
      dlc: false,
    },
    {
      name: "Eclipse Crest Heater Shield",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/Eclipse+Crest+Heater+Shield",
      dlc: false,
    },
    {
      name: "Kite Shield",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/Kite+Shield",
      dlc: false,
    },
    {
      name: "Blue-Gold Kite Shield",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/Blue-Gold+Kite+Shield",
      dlc: false,
    },
    {
      name: "Scorpion Kite Shield",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/Scorpion+Kite+Shield",
      dlc: false,
      imgUrl:
        "https://eldenring.wiki.fextralife.com/file/Elden-Ring/scorpion_kite_shield_medium_shield_elden_ring_wiki_guide_200px.png",
    },
    {
      name: "Twinbird Kite Shield",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/Twinbird+Kite+Shield",
      dlc: false,
      imgUrl:
        "https://eldenring.wiki.fextralife.com/file/Elden-Ring/twinbird_kite_shield_medium_shield_elden_ring_wiki_guide_200px.png",
    },
    {
      name: "Brass Shield",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/Brass+Shield",
      dlc: false,
    },
    {
      name: "Messmer Soldier Shield",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/Messmer+Soldier+Shield",
      dlc: true,
    },
    {
      name: "Banished Knight's Shield",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/Banished+Knight's+Shield",
      dlc: false,
    },
    {
      name: "Wolf Crest Shield",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/Wolf+Crest+Shield",
      dlc: true,
    },
    {
      name: "Serpent Crest Shield",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/Serpent+Crest+Shield",
      dlc: true,
    },
    {
      name: "Albinauric Shield",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/Albinauric+Shield",
      dlc: false,
      imgUrl:
        "https://eldenring.wiki.fextralife.com/file/Elden-Ring/albinauric_shield_small_shield_elden_ring_wiki_guide_200px.png",
    },
    {
      name: "Beastman's Jar-Shield",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/Beastman's+Jar-Shield",
      dlc: false,
      imgUrl:
        "https://eldenring.wiki.fextralife.com/file/Elden-Ring/beastmans-jar-shield_12006_elden_ring_wiki_guide_200px.png",
    },
    {
      name: "Carian Knight's Shield",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/Carian+Knight's+Shield",
      dlc: false,
    },
    {
      name: "Silver Mirrorshield",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/Silver+Mirrorshield",
      dlc: false,
    },
    {
      name: "Great Turtle Shell",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/Great+Turtle+Shell",
      dlc: false,
    },
    {
      name: "Golden Lion Shield",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/Golden+Lion+Shield",
      dlc: true,
    },
  ],
  greatShields: [
    {
      name: "Wooden Greatshield",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/Wooden+Greatshield",
      dlc: false,
    },
    {
      name: "Lordsworn's Shield",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/Lordsworn's+Shield",
      dlc: false,
      imgUrl:
        "https://eldenring.wiki.fextralife.com/file/Elden-Ring/lordsworns_shield_greatshield_elden_ring_wiki_guide_200px.png",
    },
    {
      name: "Briar Greatshield",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/Briar+Greatshield",
      dlc: false,
    },
    {
      name: "Spiked Palisade Shield",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/Spiked+Palisade+Shield",
      dlc: false,
    },
    {
      name: "Icon Shield",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/Icon+Shield",
      dlc: false,
    },
    {
      name: "Golden Beast Crest Shield",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/Golden+Beast+Crest+Shield",
      dlc: false,
    },
    {
      name: "Manor Towershield",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/Manor+Towershield",
      dlc: false,
      imgUrl:
        "https://eldenring.wiki.fextralife.com/file/Elden-Ring/manor_towershield_greatshield_elden_ring_wiki_guide_200px.png",
    },
    {
      name: "Crossed-Tree Towershield",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/Crossed-Tree+Towershield",
      dlc: false,
      imgUrl:
        "https://eldenring.wiki.fextralife.com/file/Elden-Ring/crossed-tree_towershield_greatshield_elden_ring_wiki_guide_200px.png",
    },
    {
      name: "Inverted Hawk Towershield",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/Inverted+Hawk+Towershield",
      dlc: false,
      imgUrl:
        "https://eldenring.wiki.fextralife.com/file/Elden-Ring/invert_hawk_towershield_greatshield_elden_ring_wiki_guide_200px.png",
    },
    {
      name: "Dragon Towershield",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/Dragon+Towershield",
      dlc: false,
      imgUrl:
        "https://eldenring.wiki.fextralife.com/file/Elden-Ring/dragon_towershield_greatshield_elden_ring_wiki_guide_200px.png",
    },
    {
      name: "Distinguished Greatshield",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/Distinguished+Greatshield",
      dlc: false,
    },
    {
      name: "Gilded Greatshield",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/Gilded+Greatshield",
      dlc: false,
    },
    {
      name: "Cuckoo Greatshield",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/Cuckoo+Greatshield",
      dlc: false,
    },
    {
      name: "Redmane Greatshield",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/Redmane+Greatshield",
      dlc: false,
    },
    {
      name: "Golden Greatshield",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/Golden+Greatshield",
      dlc: false,
    },
    {
      name: "Haligtree Crest Greatshield",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/Haligtree+Crest+Greatshield",
      dlc: false,
    },
    {
      name: "Black Steel Greatshield",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/Black+Steel+Greatshield",
      dlc: true,
      imgUrl:
        "https://eldenring.wiki.fextralife.com/file/Elden-Ring/black_steel_greatshield_elden_ring_shadow_of_the_erdtree_dlc_wiki_guide_200px.png",
    },
    {
      name: "Crucible Hornshield",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/Crucible+Hornshield",
      dlc: false,
    },
    {
      name: "Dragonclaw Shield",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/Dragonclaw+Shield",
      dlc: false,
      imgUrl:
        "https://eldenring.wiki.fextralife.com/file/Elden-Ring/dragonclaw__shield_elden_ring_wiki_guide_200px.png",
    },
    {
      name: "Fingerprint Stone Shield",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/Fingerprint+Stone+Shield",
      dlc: false,
      imgUrl:
        "https://eldenring.wiki.fextralife.com/file/Elden-Ring/fingerprint_stone_shield_greatshield_elden_ring_wiki_guide_200px.png",
    },
    {
      name: "Eclipse Crest Greatshield",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/Eclipse+Crest+Greatshield",
      dlc: false,
    },
    {
      name: "Ant's Skull Plate",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/Ant's+Skull+Plate",
      dlc: false,
    },
    {
      name: "Erdtree Greatshield",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/Erdtree+Greatshield",
      dlc: false,
    },
    {
      name: "Jellyfish Shield",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/Jellyfish+Shield",
      dlc: false,
    },
    {
      name: "Visage Shield",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/Visage+Shield",
      dlc: false,
    },
    {
      name: "One-Eyed Shield",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/One-Eyed+Shield",
      dlc: false,
    },
    {
      name: "Verdigris Greatshield",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/Verdigris+Greatshield",
      dlc: true,
      imgUrl:
        "https://eldenring.wiki.fextralife.com/file/Elden-Ring/verdigris_greatshield_greatshields_elden_ring_shadow_of_the_erdtree_dlc_wiki_guide_200px.png",
    },
  ],
  thurstingShields: [
    {
      name: "Dueling Shield",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/Dueling+Shield",
      dlc: true,
      imgUrl:
        "https://eldenring.wiki.fextralife.com/file/Elden-Ring/dueling_shield_thrusting_shields_elden_ring_shadow_of_the_erdtree_dlc_wiki_guide_200px.png",
    },
    {
      name: "Carian Thrusting Shield",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/Carian+Thrusting+Shield",
      dlc: true,
      imgUrl:
        "https://eldenring.wiki.fextralife.com/file/Elden-Ring/carian_thrusting_shield_thrusting_shields_elden_ring_shadow_of_the_erdtree_dlc_wiki_guide_200px.png",
    },
  ],
};
