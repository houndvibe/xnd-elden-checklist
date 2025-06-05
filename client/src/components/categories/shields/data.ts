export interface DataType {
  name: string;
  collected: boolean;
  link: string;
  dlc: boolean;
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
    },
    {
      name: "Smoldering Shield",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/Smoldering+Shield",
      dlc: false,
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
    },
    {
      name: "Shield of Night",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/Shield+of+Night",
      dlc: true,
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
    },
    {
      name: "Round Shield",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/Round+Shield",
      dlc: false,
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
    },
    {
      name: "Twinbird Kite Shield",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/Twinbird+Kite+Shield",
      dlc: false,
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
      dlc: false,
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
      dlc: false,
    },
    {
      name: "Serpent Crest Shield",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/Serpent+Crest+Shield",
      dlc: false,
    },
    {
      name: "Albinauric Shield",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/Albinauric+Shield",
      dlc: false,
    },
    {
      name: "Beastman's Jar-Shield",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/Beastman's+Jar-Shield",
      dlc: false,
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
      name: "Great Turtle Shield",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/Great+Turtle+Shield",
      dlc: false,
    },
    {
      name: "Golden Lion Shield",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/Golden+Lion+Shield",
      dlc: false,
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
    },
    {
      name: "Crossed-Tree Towershield",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/Crossed-Tree+Towershield",
      dlc: false,
    },
    {
      name: "Inverted Hawk Towershield",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/Inverted+Hawk+Towershield",
      dlc: false,
    },
    {
      name: "Dragon Towershield",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/Dragon+Towershield",
      dlc: false,
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
      dlc: false,
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
    },
    {
      name: "Fingerprint Stone Shield",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/Fingerprint+Stone+Shield",
      dlc: false,
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
      dlc: false,
    },
  ],
  thurstingShields: [
    {
      name: "Dueling Shield",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/Dueling+Shield",
      dlc: true,
    },
    {
      name: "Carian Thrusting Shield",
      collected: false,
      link: "https://eldenring.wiki.fextralife.com/Carian+Thrusting+Shield",
      dlc: true,
    },
  ],
};
