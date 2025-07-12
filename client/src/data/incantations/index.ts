import { IncantationsSubCategoryMap } from "../../global-types";
import { bloodAndRot } from "./bloodAndRot";
import { dragonCommunion } from "./dragonCommunion";
import { dragonCult } from "./dragonCult";
import { erdtreeAndGoldenOrder } from "./erdtreeAndGoldenOrder";
import { fireMonkAndFireGiants } from "./fireMonkAndFireGiant";
import { godskinAndGurranq } from "./godskinAndGurranq";
import { messmer } from "./messmer";
import { miquella } from "./miquella";
import { shadowRealm } from "./shadowRealm";
import { threeFingers } from "./threeFingers";
import { twoFingers } from "./twoFingers";

export const incantationsData: IncantationsSubCategoryMap = {
  twoFingers,
  "erdtree&GoldenOrder": erdtreeAndGoldenOrder,
  miquella,
  dragonCult,
  shadowRealm,
  "fireMonk&FireGiant": fireMonkAndFireGiants,
  messmer,
  "godskin&Gurranq": godskinAndGurranq,
  "blood&Rot": bloodAndRot,
  threeFingers,
  dragonCommunion,
};
