import { Collection } from "../store/collectionSlice";
import { ashesOfWarData } from "./ashesOfWar";
import { craftData } from "./craft";
import { armourData } from "./data-armour";
import { consumablesAndAmmoData } from "./data-consumables-and-ammo";

import { keyItemsData } from "./data-key-items";
import { gesturesAndMultiplayerData } from "./gesturesAndMultiplayer";
import { incantationsData } from "./incantations";
import { infoItemsData } from "./infoItems";
import { meleWeaponsData } from "./meleWeapons";
import { rangedWeaponData } from "./rangedWeapon";
import { shieldsAndTorchesData } from "./shieldsAndTorches";
import { sorceriesData } from "./sorceries/indext";
import { spiritAshesData } from "./spiritAshes";
import { talismansData } from "./talismans";
import { tearsAndUpgradesData } from "./tearsAndUpgrades";
import { toolsAndBellBearingsData } from "./toolsAndBellBearings";

export const itemsData: Collection = {
  shieldsAndTorchesData: shieldsAndTorchesData,
  spiritAshesData: spiritAshesData,
  talismansData: talismansData,
  ashesOfWarData: ashesOfWarData,
  sorceriesData: sorceriesData,
  incantationsData: incantationsData,
  gesturesAndMultiplayerData: gesturesAndMultiplayerData,
  meleWeaponsData: meleWeaponsData,
  rangedWeaponsData: rangedWeaponData,
  infoItemsData: infoItemsData,
  toolsAndBellBearingsData: toolsAndBellBearingsData,
  tearsAndUpgradesData: tearsAndUpgradesData,
  craftData: craftData,
  armourData: armourData,
  consumablesAndAmmoData: consumablesAndAmmoData,
  keyItemsData: keyItemsData,
};
