import { Item, TalismanVersions } from "../../global-types";
import { Collection } from "../../store/collectionSlice";

export function flattenCollectionItems(collection: Collection): Item[] {
  const result: Item[] = [];

  // Перебираем все категории в коллекции
  for (const categoryKey in collection) {
    // @ts-ignore
    const categoryData = collection[categoryKey];

    // Пропускаем, если это не объект или массив
    if (typeof categoryData !== "object" || categoryData === null) continue;

    // Обработка armourData
    if (categoryKey === "armourData") {
      for (const subCategory in categoryData) {
        if (Array.isArray(categoryData[subCategory])) {
          for (const set of categoryData[subCategory]) {
            if (set.items && Array.isArray(set.items)) {
              for (const item of set.items) {
                if (item.children && Array.isArray(item.children)) {
                  result.push(...item.children);
                } else {
                  result.push(item);
                }
              }
            }
          }
        }
      }
    }
    // Обработка shieldsAndTorchesData
    else if (categoryKey === "shieldsAndTorchesData") {
      for (const subCategory in categoryData) {
        if (Array.isArray(categoryData[subCategory])) {
          result.push(...categoryData[subCategory]);
        }
      }
    }
    // Обработка spiritAshesData
    else if (categoryKey === "spiritAshesData") {
      for (const subCategory in categoryData) {
        if (Array.isArray(categoryData[subCategory])) {
          result.push(...categoryData[subCategory]);
        }
      }
    }
    // Обработка talismansData
    else if (categoryKey === "talismansData") {
      for (const subCategory in categoryData) {
        if (Array.isArray(categoryData[subCategory])) {
          for (const item of categoryData[subCategory]) {
            if (item.versions && Array.isArray(item.versions)) {
              // Добавляем сам item и его версии
              const baseItem = { ...item };
              delete baseItem.versions;
              result.push(baseItem);
              result.push(
                ...item.versions.map((v: TalismanVersions) => ({
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
      }
    }
    // Обработка ashesOfWarData
    else if (categoryKey === "ashesOfWarData") {
      for (const subCategory in categoryData) {
        if (Array.isArray(categoryData[subCategory])) {
          result.push(...categoryData[subCategory]);
        }
      }
    }
    // Обработка sorceriesData и incantationsData
    else if (
      categoryKey === "sorceriesData" ||
      categoryKey === "incantationsData"
    ) {
      for (const subCategory in categoryData) {
        if (Array.isArray(categoryData[subCategory])) {
          result.push(...categoryData[subCategory]);
        }
      }
    }
    // Обработка gesturesData
    else if (categoryKey === "gesturesAndMultiplayerData") {
      if (
        categoryData.gestures &&
        Array.isArray(categoryData.gesturesAndMultiplayer)
      ) {
        result.push(...categoryData.gesturesAndMultiplayer);
      }
    }
    // Обработка meleWeaponsData и rangedWeaponsData
    else if (
      categoryKey === "meleWeaponsData" ||
      categoryKey === "rangedWeaponsData"
    ) {
      for (const subCategory in categoryData) {
        if (Array.isArray(categoryData[subCategory])) {
          result.push(...categoryData[subCategory]);
        }
      }
    }
    // Обработка infoItemsData
    else if (categoryKey === "infoItemsData") {
      for (const subCategory in categoryData) {
        if (Array.isArray(categoryData[subCategory])) {
          result.push(...categoryData[subCategory]);
        }
      }
    }
    // Обработка toolsAndBellBearingsData
    else if (categoryKey === "toolsAndBellBearingsData") {
      for (const subCategory in categoryData) {
        if (Array.isArray(categoryData[subCategory])) {
          result.push(...categoryData[subCategory]);
        }
      }
    }
    // Обработка tearsAndUpgradesData
    else if (categoryKey === "tearsAndUpgradesData") {
      for (const subCategory in categoryData) {
        if (Array.isArray(categoryData[subCategory])) {
          result.push(...categoryData[subCategory]);
        }
      }
    }
    // Обработка craftData
    else if (categoryKey === "craftData") {
      for (const subCategory in categoryData) {
        if (Array.isArray(categoryData[subCategory])) {
          result.push(...categoryData[subCategory]);
        }
      }
    }
    // Обработка consumablesAndAmmoData
    else if (categoryKey === "consumablesAndAmmoData") {
      for (const subCategory in categoryData) {
        if (Array.isArray(categoryData[subCategory])) {
          result.push(...categoryData[subCategory]);
        }
      }
    }
    // Обработка keyItemsData
    else if (categoryKey === "keyItemsData") {
      for (const subCategory in categoryData) {
        if (Array.isArray(categoryData[subCategory])) {
          result.push(...categoryData[subCategory]);
        }
      }
    }
  }

  return result;
}
