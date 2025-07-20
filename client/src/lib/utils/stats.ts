import type { Item, ItemSubCategoryMap, ArmourSet } from "../../global-types";

type ArmourPieceStat = { name: string; collected: boolean };

export function getItemStats(
  item: Item,
  countDlc: boolean,
  altArmor: boolean
): {
  itemTotal: number;
  itemCollected: number;
  armourPieces?: ArmourPieceStat[];
} {
  if (!countDlc && item.dlc) {
    return { itemTotal: 0, itemCollected: 0 };
  }

  if (item.type === "talismans" && Array.isArray(item.versions)) {
    const filteredVersions = countDlc
      ? item.versions
      : item.versions.filter((v) => !v.dlc);
    const itemTotal = filteredVersions.length;
    const itemCollected = filteredVersions.filter((v) => v.collected).length;
    return { itemTotal, itemCollected };
  }

  if (item.type === "armour" && item.subcategory !== "pieces") {
    const armourPieces: ArmourPieceStat[] = [];

    const set = item as ArmourSet;
    for (const part of set.items ?? []) {
      if (!countDlc && part.dlc) continue;
      armourPieces.push({ name: part.name, collected: part.collected });

      for (const child of part.children ?? []) {
        if (!countDlc && child.dlc) continue;
        if (!altArmor) continue;
        armourPieces.push({ name: child.name, collected: child.collected });
      }
    }

    return {
      itemTotal: armourPieces.length,
      itemCollected: armourPieces.filter((p) => p.collected).length,
      armourPieces,
    };
  }

  return {
    itemTotal: 1,
    itemCollected: item.collected ? 1 : 0,
  };
}

function aggregateStats(items: Item[], countDlc: boolean, altArmor: boolean) {
  let total = 0;
  let collected = 0;
  const armourPieceMap = new Map<string, boolean>();

  for (const item of items) {
    const { itemTotal, itemCollected, armourPieces } = getItemStats(
      item,
      countDlc,
      altArmor
    );

    if (item.type === "armour" && armourPieces) {
      for (const piece of armourPieces) {
        const existing = armourPieceMap.get(piece.name);
        if (existing === undefined || piece.collected) {
          armourPieceMap.set(piece.name, piece.collected);
        }
      }
    } else {
      total += itemTotal;
      collected += itemCollected;
    }
  }

  for (const isCollected of armourPieceMap.values()) {
    total++;
    if (isCollected) collected++;
  }

  return {
    total,
    collected,
    percentage:
      total === 0 ? 0 : Number(((collected / total) * 100).toFixed(2)),
  };
}
export function getCategoryStats(
  data: Partial<ItemSubCategoryMap>,
  countDlc: boolean,
  altArmor: boolean
) {
  return aggregateStats(Object.values(data).flat(), countDlc, altArmor);
}

export function getSubCategoryStats(
  items: Item[],
  countDlc: boolean,
  altArmor: boolean
) {
  return aggregateStats(items, countDlc, altArmor);
}
