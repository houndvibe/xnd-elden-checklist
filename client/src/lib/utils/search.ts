import { useNavigate } from "react-router-dom";
import { Item, ItemSubCategoryMap, TalismanVersions } from "../../global-types";
import { Collection } from "../../store/collectionSlice";
import { useAppDispatch } from "../../store/typedDispatch";
import { itemsData } from "../../data";
import {
  setGlobalSearchItem,
  setGlobalSearchSet,
} from "../../store/serviceSlice";

export function flattenCollectionItems(collection: Collection): Item[] {
  const result: Item[] = [];

  // @ts-ignore
  const flatPush = (data: any) => {
    for (const subCategory in data) {
      if (Array.isArray(data[subCategory])) {
        result.push(...data[subCategory]);
      }
    }
  };

  for (const categoryKey in collection) {
    const categoryData = collection[categoryKey as keyof Collection];

    if (!categoryData || typeof categoryData !== "object") continue;

    switch (categoryKey) {
      case "armourData": {
        for (const subCategory in categoryData) {
          // @ts-ignore
          const sets = categoryData[subCategory];
          if (!Array.isArray(sets)) continue;

          for (const set of sets) {
            if (!Array.isArray(set.items)) continue;

            for (const item of set.items) {
              if (Array.isArray(item.children)) {
                result.push(...item.children);
              } else {
                result.push(item);
              }
            }
          }
        }
        break;
      }

      case "talismansData": {
        for (const subCategory in categoryData) {
          // @ts-ignore
          const talismans = categoryData[subCategory];
          if (!Array.isArray(talismans)) continue;

          for (const item of talismans) {
            if (Array.isArray(item.versions)) {
              const { versions, ...baseItem } = item;
              result.push(baseItem);
              result.push(
                ...versions.map((v: TalismanVersions) => ({
                  ...baseItem,
                  tier: v.tier,
                  collected: v.collected,
                  legendary: v.legendary || false,
                  dlc: v.dlc || false,
                }))
              );
            } else {
              result.push(item);
            }
          }
        }
        break;
      }

      default:
        flatPush(categoryData);
        break;
    }
  }

  return result;
}

export const scrollToSearchTarget = () => {
  const searchTarget = document.querySelector(".row-searchTarget");
  if (searchTarget) {
    searchTarget.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }
};

export const navigateToItem = (
  name: string,
  dispatch: ReturnType<typeof useAppDispatch>,
  navigate: ReturnType<typeof useNavigate>
) => {
  const searchValue = name.toLowerCase();

  for (const category in itemsData) {
    const subcategories = itemsData[category as keyof Collection];

    for (const subcategory in subcategories) {
      const items = subcategories[
        subcategory as keyof ItemSubCategoryMap
      ] as Item[];

      for (const item of items) {
        if (item.name.toLowerCase() === searchValue) {
          dispatch(setGlobalSearchItem(item.name));
          navigate(`/${item.type}?open=${encodeURIComponent(subcategory)}`);

          setTimeout(() => scrollToSearchTarget(), 300);
          return;
        }

        if ("items" in item && Array.isArray(item.items)) {
          for (const child of item.items) {
            if (child.name.toLowerCase() === searchValue) {
              dispatch(setGlobalSearchSet(item.name));
              dispatch(setGlobalSearchItem(child.name));
              navigate(
                `/${child.type}?open=${encodeURIComponent(subcategory)}`
              );

              setTimeout(() => scrollToSearchTarget(), 300);
              return;
            }

            if ("children" in child && Array.isArray(child.children)) {
              for (const grandChild of child.children) {
                if (grandChild.name.toLowerCase() === searchValue) {
                  dispatch(setGlobalSearchSet(item.name));
                  dispatch(setGlobalSearchItem(grandChild.name));
                  navigate(
                    `/${grandChild.type}?open=${encodeURIComponent(
                      subcategory
                    )}`
                  );

                  setTimeout(() => scrollToSearchTarget(), 300);
                  return;
                }
              }
            }
          }
        }

        if ("children" in item && Array.isArray(item.children)) {
          for (const child of item.children) {
            if (child.name.toLowerCase() === searchValue) {
              dispatch(setGlobalSearchItem(child.name));
              navigate(
                `/${child.type}?open=${encodeURIComponent(subcategory)}`
              );

              setTimeout(() => scrollToSearchTarget(), 300);
              return;
            }
          }
        }
      }
    }
  }
};
