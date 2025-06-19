import { Item, TalismanVersions } from "../../global-types";
import { Collection } from "../../store/collectionSlice";

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
