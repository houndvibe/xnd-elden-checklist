import {
  ArmourSubCategoryMap,
  ItemCategory,
  ItemSubCategory,
  TalismansSubCategoryMap,
} from "../global-types";
import { AppDispatch } from "./appStore";
import {
  toggleArmourItemCollected,
  toggleItemCollected,
  toggleTalismanCollected,
} from "./collectionSlice";

export function getStoreAction({
  name,
  category,
  subcategory,
  dispatch,
}: {
  name: string;
  category: ItemCategory;
  subcategory: ItemSubCategory;
  dispatch: AppDispatch;
}) {
  console.log(category);
  if (category === "talismans") {
    dispatch(
      toggleTalismanCollected({
        subcategory: subcategory as keyof TalismansSubCategoryMap,
        name: name,
      })
    );
  } else if (category === "armour") {
    console.log(123);
    dispatch(
      toggleArmourItemCollected({
        subcategory: subcategory as keyof ArmourSubCategoryMap,
        name: name,
      })
    );
  } else {
    dispatch(
      toggleItemCollected({
        category: category,
        subcategory: subcategory,
        name: name,
      })
    );
  }
}
