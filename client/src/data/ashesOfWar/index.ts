import { flameLightning } from "./flameLightning";
import { magic } from "./magic";
import { noAffinityHandToHandAndPerfume } from "./noAffinityHandToHandAndPerfume";
import { noAffinityRanged } from "./noAffinityRanged";
import { noAffinityShield } from "./noAffinityShield";
import { occult } from "./occults";
import { poisonBloodCold } from "./poisonBloodCold";
import { quality } from "./quality";
import { sacred } from "./sacrerd";
import { heavy } from "./heavy";
import { AshesOfWarSubCategoryMap } from "../../global-types";
import { keen } from "./keen";

export const ashesOfWarData: AshesOfWarSubCategoryMap = {
  heavy,
  keen,
  quality,
  magic,
  flameLightning,
  sacred,
  poisonBloodCold,
  occult,
  noAffinityRanged,
  noAffinityShield,
  noAffinityHandToHandAndPerfume,
};
