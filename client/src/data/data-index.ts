import { Collection } from "../store/collectionSlice";
import { armourData } from "./data-armour";
import { ashesOfWarData } from "./data-ashes-of-war";
import { consumablesAndAmmoData } from "./data-consumables-and-ammo";
import { craftData } from "./data-craft";
import { incantationsData } from "./data-incantations";
import { infoItemsData } from "./data-info-items";
import { keyItemsData } from "./data-key-items";
import { meleWeaponsData } from "./data-mele-weapons";
import { sorceriesData } from "./data-sorceries";
import { spiritAshesData } from "./data-spirit-ashes";
import { tearsAndUpgradesData } from "./data-tears-and-upgrades";
import { toolsAndBellBearingsData } from "./data-tools-and-bells";
import { gesturesData } from "./gestures/gestures";
import { rangedWeaponData } from "./rangedWeapon";
import { shieldsAndTorchesData } from "./shieldsAndTorches";
import { talismansData } from "./talismans";

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
