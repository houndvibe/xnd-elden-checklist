import { СonsumablesAndAmmoItemsCategoryMap } from "../../global-types";
import { ammo } from "./ammo.ts";
import { food } from "./food";
import { greases } from "./greases";
import { other } from "./other";
import { remembrances } from "./remembrances";
import { runes } from "./runes";
import { throwables } from "./throwables";

export const consumablesAndAmmoData: СonsumablesAndAmmoItemsCategoryMap = {
  food,
  throwables,
  greases,
  other,
  runes,
  ammo,
  remembrances,
};
