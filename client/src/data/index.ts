import { Collection } from "../store/collectionSlice";
import { gesturesData } from "./gestures/gestures";
import { incantationsData } from "./incantations";
import { rangedWeaponData } from "./rangedWeapon";
import { shieldsAndTorchesData } from "./shieldsAndTorches";
import { spiritAshesData } from "./spiritAshes";
import { talismansData } from "./talismans";
import { tearsAndUpgradesData } from "./tearsAndUpgrades";

export const itemsDataNew: Collection = {
  rangedWeaponsData: rangedWeaponData,
  shieldsAndTorchesData: shieldsAndTorchesData,
  gesturesData: gesturesData,
  talismansData: talismansData,
  spiritAshesData: spiritAshesData,
  incantationsData: incantationsData,
  tearsAndUpgradesData: tearsAndUpgradesData,
};
