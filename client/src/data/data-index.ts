import { Collection } from "../store/collectionSlice";
import { armourData } from "./data-armour";
import { ashesOfWarData } from "./data-ashes-of-war";
import { consumablesAndAmmoData } from "./data-consumables-and-ammo";
import { craftData } from "./data-craft";

import { infoItemsData } from "./data-info-items";
import { keyItemsData } from "./data-key-items";
import { meleWeaponsData } from "./data-mele-weapons";

import { toolsAndBellBearingsData } from "./data-tools-and-bells";
import { gesturesData } from "./gestures/gestures";
import { incantationsData } from "./incantations";
import { rangedWeaponData } from "./rangedWeapon";
import { shieldsAndTorchesData } from "./shieldsAndTorches";
import { sorceriesData } from "./sorceries/indext";
import { spiritAshesData } from "./spiritAshes";
import { talismansData } from "./talismans";
import { tearsAndUpgradesData } from "./tearsAndUpgrades";

export const itemsData: Collection = {
  shieldsAndTorchesData: shieldsAndTorchesData,
  spiritAshesData: spiritAshesData,
  talismansData: talismansData,
  ashesOfWarData: ashesOfWarData,
  sorceriesData: sorceriesData,
  incantationsData: incantationsData,
  gesturesData: gesturesData,
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
