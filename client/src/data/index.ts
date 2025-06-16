import { Collection } from "../store/collectionSlice";
import { ashesOfWarData } from "./ashesOfWar";
import { craftData } from "./craft";
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

export const itemsDataNew: Collection = {
  rangedWeaponsData: rangedWeaponData,
  shieldsAndTorchesData: shieldsAndTorchesData,
  sorceriesData: sorceriesData,
  gesturesAndMultiplayerData: gesturesAndMultiplayerData,
  talismansData: talismansData,
  spiritAshesData: spiritAshesData,
  incantationsData: incantationsData,
  tearsAndUpgradesData: tearsAndUpgradesData,
  ashesOfWarData: ashesOfWarData,
  meleWeaponsData: meleWeaponsData,
  toolsAndBellBearingsData: toolsAndBellBearingsData,
  craftData: craftData,
  infoItemsData: infoItemsData,
};
