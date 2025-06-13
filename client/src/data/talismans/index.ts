import { TalismansSubCategoryMap } from "../../global-types";
import { abilitiesAndConsumables } from "./abilities & consumables";
import { conditionalAmplifiers } from "./conditionalAmplifiers";
import { damageAmplifiers } from "./damageAmplifiers";
import { magicAmplifiers } from "./magicAmplifiers";
import { other } from "./other";
import { resistsAmplifiers } from "./resistsAmplifiers";
import { statsAmplifiers } from "./statsAmplifiers";
import { weaponAmplifiers } from "./weaponAmplifiers";

export const talismansData: TalismansSubCategoryMap = {
  statsAmplifiers,
  resistsAmplifiers,
  weaponAmplifiers,
  magicAmplifiers,
  "abilities & consumables": abilitiesAndConsumables,
  damageAmplifiers: damageAmplifiers,
  conditionalAmplifiers: conditionalAmplifiers,
  other: other,
};
