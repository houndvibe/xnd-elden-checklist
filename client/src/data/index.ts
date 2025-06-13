import { Collection } from "../store/collectionSlice";
import { gesturesData } from "./gestures/gestures";
import { rangedWeaponData } from "./rangedWeapon";
import { shieldsAndTorchesData } from "./shieldsAndTorches";
import { talismansData } from "./talismans";

export const itemsDataNew: Collection = {
  rangedWeaponsData: rangedWeaponData,
  shieldsAndTorchesData: shieldsAndTorchesData,
  gesturesData: gesturesData,
  talismansData: talismansData,
};
