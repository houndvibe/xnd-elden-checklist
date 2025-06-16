import { Collection } from "../store/collectionSlice";
import { ashesOfWarData } from "./ashesOfWar";
import { craftData } from "./craft";
import { armourData } from "./data-armour";
import { consumablesAndAmmoData } from "./data-consumables-and-ammo";
import { infoItemsData } from "./data-info-items";
import { keyItemsData } from "./data-key-items";
import { gesturesData } from "./gestures/gestures";
import { incantationsData } from "./incantations";
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
