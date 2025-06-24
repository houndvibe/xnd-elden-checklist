import { Item } from "../../global-types";
import { Collection } from "../../store/collectionSlice";

export function saveToStorage<T>(key: string, value: T) {
  try {
    const dataToSave =
      key === "XnDEldenCompendium.collection"
        ? filterCollectedDataMinimal(value as Collection)
        : value;

    localStorage.setItem(key, JSON.stringify(dataToSave));
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
        const filtered = (items as Item[]).flatMap((item) => {
          //@ts-ignore
          const output: any[] = [];

          // Броня — pieceType: set
          if ("pieceType" in item && item.pieceType === "set") {
            if (item.collected) {
              output.push({ name: item.name, collected: true });
              //@ts-ignore
              for (const piece of item.items) {
                output.push({ name: piece.name, collected: true });

                if (piece.children) {
                  for (const child of piece.children) {
                    if (child.collected) {
                      output.push({ name: child.name, collected: true });
                    }
                  }
                }
              }
              return output;
            }

            //@ts-ignore
            for (const piece of item.items) {
              if (piece.collected)
                output.push({ name: piece.name, collected: true });
              if (piece.children) {
                for (const child of piece.children) {
                  if (child.collected)
                    output.push({ name: child.name, collected: true });
                }
              }
            }

            return output;
          }

          if ("children" in item && Array.isArray(item.children)) {
            const children = item.children.filter((c) => c.collected);
            if (item.collected || children.length > 0) {
              if (item.collected)
                output.push({ name: item.name, collected: true });
              for (const c of children) {
                output.push({ name: c.name, collected: true });
              }
              return output;
            }
          }

          if ("versions" in item && Array.isArray(item.versions)) {
            const allCollected = item.versions.every((v) => v.collected);
            if (allCollected) {
              return [{ name: item.name, collected: true }];
            }

            const someCollected = item.versions.some((v) => v.collected);
            if (someCollected) {
              return item.versions
                .filter((v) => v.collected)
                .map((v) => ({
                  name: item.name,
                  tier: v.tier,
                  collected: true,
                }));
            }

            return [];
          }

          if (item.collected) {
            return [{ name: item.name, collected: true }];
          }

          return [];
        });

        return [subKey, filtered];
      })
    );
    //@ts-ignore
    result[categoryKey as keyof Collection] = filteredSubcategories as any;
  }

  return result;
}

export function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;

    const parsed = JSON.parse(raw);

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
    //@ts-ignore
    const baseSubMap = result[categoryKey as keyof Collection] as Record<
      string,
      Item[]
    >;

    for (const [subKey, savedItems] of Object.entries(
      //@ts-ignore
      subcategoryMap as Record<string, any[]>
    )) {
      const baseItems = baseSubMap[subKey];
      if (!Array.isArray(baseItems)) continue;

      for (const saved of savedItems) {
        if ("tier" in saved) {
          const item = baseItems.find((i) => i.name === saved.name);
          //@ts-ignore
          const version = (item as any)?.versions?.find(
            //@ts-ignore
            (v: any) => v.tier === saved.tier
          );
          if (version) version.collected = true;
          continue;
        }

        const match =
          baseItems.find((i) => i.name === saved.name) ||
          baseItems
            .flatMap((i) =>
              "items" in i && Array.isArray(i.items) ? i.items : []
            )
            .find((i) => i.name === saved.name) ||
          baseItems
            .flatMap((i) =>
              "items" in i && Array.isArray(i.items)
                ? i.items.flatMap((it) =>
                    "children" in it ? it.children || [] : []
                  )
                : "children" in i
                ? i.children || []
                : []
            )
            .find((i) => i.name === saved.name);

        if (match) {
          match.collected = true;

          if ("versions" in match && Array.isArray(match.versions)) {
            match.versions.forEach((v) => {
              v.collected = true;
            });
          }

          if ("items" in match && Array.isArray(match.items)) {
            match.items.forEach((piece) => {
              piece.collected = true;
              //@ts-ignore
              piece.children?.forEach((child) => {
                child.collected = true;
              });
            });
          }
        }
      }
    }
  }

  return result;
}
