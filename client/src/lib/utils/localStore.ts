import { Item } from "../../global-types";
import { Collection } from "../../store/collectionSlice";
import { compressToUTF16, decompressFromUTF16 } from "lz-string";

export function saveToStorage<T>(key: string, value: T) {
  try {
    const dataToSave =
      key === "XnDEldenCompendium.collection"
        ? filterCollectedDataMinimal(value as Collection)
        : value;

    const compressedData =
      key === "XnDEldenCompendium.checkpoints"
        ? compressToUTF16(JSON.stringify(dataToSave))
        : JSON.stringify(dataToSave);

    localStorage.setItem(key, compressedData);
  } catch (err) {
    console.warn("Storage write failed", err);
  }
}

function filterCollectedDataMinimal(
  collection: Collection
): Partial<Collection> {
  const result: Partial<Collection> = {};

  for (const [categoryKey, subcategoryMap] of Object.entries(collection)) {
    const filteredSubcategories = Object.fromEntries(
      Object.entries(subcategoryMap).map(([subKey, items]) => {
        const seenNames = new Set<string>();

        const filtered = (items as Item[]).flatMap((item) => {
          const output: any[] = [];

          const tryAdd = (name: string, extra?: object) => {
            if (!seenNames.has(name)) {
              seenNames.add(name);
              output.push({ name, collected: extra ? false : true, ...extra });
            }
          };

          // Armour sets
          if ("pieceType" in item && item.pieceType === "set") {
            if (item.collected) tryAdd(item.name);
            // @ts-ignore
            for (const piece of item.items ?? []) {
              if (piece.collected) tryAdd(piece.name);
              for (const child of piece.children ?? []) {
                if (child.collected) tryAdd(child.name);
              }
            }

            return output;
          }

          // Children structure
          if ("children" in item && Array.isArray(item.children)) {
            const hasCollectedChildren = item.children.some((c) => c.collected);
            if (item.collected || hasCollectedChildren) {
              if (item.collected) tryAdd(item.name);
              item.children.forEach((c) => {
                if (c.collected) tryAdd(c.name);
              });
              return output;
            }
          }

          // Versions (e.g., talismans)
          if ("versions" in item && Array.isArray(item.versions)) {
            const collectedVersions = item.versions.filter((v) => v.collected);
            if (collectedVersions.length === item.versions.length) {
              tryAdd(item.name);
            } else {
              tryAdd(item.name, {
                tiers: collectedVersions.map((i) => i.tier),
              });
            }

            return output;
          }

          // Base case
          if (item.collected) {
            tryAdd(item.name);
          }

          return output;
        });

        return [subKey, filtered];
      })
    );

    // @ts-ignore
    result[categoryKey as keyof Collection] = filteredSubcategories;
  }

  return result;
}

export function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;

    const parsed =
      key === "XnDEldenCompendium.checkpoints"
        ? JSON.parse(decompressFromUTF16(raw))
        : JSON.parse(raw);

    if (key === "XnDEldenCompendium.collection") {
      return applyMinimalCollectedFlags(parsed, fallback as Collection) as T;
    }

    return parsed as T;
  } catch {
    return fallback;
  }
}

function applyMinimalCollectedFlags(
  saved: Partial<Collection>,
  base: Collection
): Collection {
  const result: Collection = structuredClone(base);

  for (const [categoryKey, subcategoryMap] of Object.entries(saved)) {
    // @ts-ignore
    const baseSubMap = result[categoryKey as keyof Collection] as Record<
      string,
      Item[]
    >;

    for (const [subKey, savedItems] of Object.entries(
      // @ts-ignore
      subcategoryMap as Record<string, any[]>
    )) {
      const baseItems = baseSubMap[subKey];
      if (!Array.isArray(baseItems)) continue;

      for (const savedItem of savedItems) {
        const allMatches = baseItems.flatMap((i) => {
          const matches: Item[] = [];

          if (i.name === savedItem.name) matches.push(i);

          if ("items" in i && Array.isArray(i.items)) {
            for (const piece of i.items) {
              if (piece.name === savedItem.name) matches.push(piece);

              for (const child of piece.children ?? []) {
                if (child.name === savedItem.name) matches.push(child);
              }
            }
          }

          if ("children" in i && Array.isArray(i.children)) {
            for (const child of i.children) {
              if (child.name === savedItem.name) matches.push(child);
            }
          }

          return matches;
        });

        for (const match of allMatches) {
          match.collected = true;

          if ("versions" in match && Array.isArray(match.versions)) {
            if ("tiers" in savedItem) {
              match.collected = false;
              match.versions.forEach((v) => {
                if (savedItem.tiers.includes(v.tier)) {
                  v.collected = true;
                }
              });
            } else {
              match.versions.forEach((v) => (v.collected = true));
            }
          }

          if ("items" in match && Array.isArray(match.items)) {
            for (const piece of match.items) {
              piece.collected = true;
              for (const child of piece.children ?? []) {
                child.collected = true;
              }
            }
          }
        }
      }
    }
  }

  return result;
}
