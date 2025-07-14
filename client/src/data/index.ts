import { Collection } from "../store/collectionSlice";
import { armourData } from "./armour";
import { ashesOfWarData } from "./ashesOfWar";
import { consumablesAndAmmoData } from "./consumablesAndAmmo";
import { craftData } from "./craft";
import { gesturesAndMultiplayerData } from "./gesturesAndMultiplayer";
import { incantationsData } from "./incantations";
import { infoItemsData } from "./infoItems";
import { keyItemsData } from "./keyItems";
import { meleWeaponsData } from "./meleWeapons";
import { rangedWeaponData } from "./rangedWeapon";
import { shieldsAndTorchesData } from "./shieldsAndTorches";
import { sorceriesData } from "./sorceries";
import { spiritAshesData } from "./spiritAshes";
import { talismansData } from "./talismans";
import { tearsAndUpgradesData } from "./tearsAndUpgrades";
import { toolsAndBellBearingsData } from "./toolsAndBellBearings";

export const itemsData: Collection = {
  consumablesAndAmmoData: consumablesAndAmmoData,
  toolsAndBellBearingsData: toolsAndBellBearingsData,
  gesturesAndMultiplayerData: gesturesAndMultiplayerData,
  spiritAshesData: spiritAshesData,
  craftData: craftData,
  tearsAndUpgradesData: tearsAndUpgradesData,
  keyItemsData: keyItemsData,
  sorceriesData: sorceriesData,
  incantationsData: incantationsData,
  ashesOfWarData: ashesOfWarData,
  meleWeaponsData: meleWeaponsData,
  rangedWeaponsData: rangedWeaponData,
  shieldsAndTorchesData: shieldsAndTorchesData,
  armourData: armourData,
  talismansData: talismansData,
  infoItemsData: infoItemsData,
};
