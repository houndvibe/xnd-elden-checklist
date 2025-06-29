import type { Item, ItemSubCategoryMap, ArmourSet } from "../../global-types";

type ArmourPieceStat = { name: string; collected: boolean };

export function getItemStats(item: Item): {
  itemTotal: number;
  itemCollected: number;
  armourPieces?: ArmourPieceStat[];
} {
  if (item.type === "talismans" && Array.isArray(item.versions)) {
    const itemTotal = item.versions.length;
    const itemCollected = item.versions.filter((v) => v.collected).length;
    return { itemTotal, itemCollected };
  }

  if (item.type === "armour" && item.subcategory !== "pieces") {
    const armourPieces: ArmourPieceStat[] = [];

    const set = item as ArmourSet;
    for (const part of set.items ?? []) {
      armourPieces.push({ name: part.name, collected: part.collected });
      for (const child of part.children ?? []) {
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

function aggregateStats(items: Item[]) {
  let total = 0;
  let collected = 0;
  const armourPieceMap = new Map<string, boolean>();

  for (const item of items) {
    const { itemTotal, itemCollected, armourPieces } = getItemStats(item);

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
    percentage: total === 0 ? 0 : Math.trunc((collected / total) * 100),
  };
}

export function getCategoryStats(data: ItemSubCategoryMap) {
  return aggregateStats(Object.values(data).flat());
}

export function getSubCategoryStats(items: Item[]) {
  return aggregateStats(items);
}
