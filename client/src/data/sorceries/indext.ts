import { SorceriesSubCategoryMap } from "../../global-types";
import { academyOfRayaLucaria } from "./academyOfRayaLucaria";
import { carianRoyalFamily } from "./carianRoyalFamily";
import { gravityFingersBriars } from "./gravityFingersBriars";
import { selliaAndGelmir } from "./sellia&Gelmir";
import { servantsOfDeath } from "./servantsOfDeath";
import { snowAndCrystal } from "./snow&Crystal";

export const sorceriesData: SorceriesSubCategoryMap = {
  academyOfRayaLucaria,
  carianRoyalFamily,
  "sellia&Gelmir": selliaAndGelmir,
  "snow&Crystal": snowAndCrystal,
  gravityFingersBriars,
  servantsOfDeath,
};
