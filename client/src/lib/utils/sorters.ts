import type { Item } from "../../global-types";
import { checkIsLegendary } from "./misc";

//умная сортировка
function getSortSteps(dataSource: Item[]): number[] {
  const steps = [0];
  const hasLegendary = dataSource.some(checkIsLegendary);
  const hasDlc = dataSource.some((item) => item.dlc);
  if (hasDlc) steps.push(1, 2);
  if (hasLegendary) steps.push(3, 4);
  return steps;
}

export function getNextSortStep(dataSource: Item[], current: number): number {
  const steps = getSortSteps(dataSource);
  const currentIndex = steps.indexOf(current);
  return steps[(currentIndex + 1) % steps.length];
}

export function smartNameSort(sortStep: number, a: Item, b: Item) {
  switch (sortStep) {
    case 1: // DLC вверх
      return Number(b.dlc) - Number(a.dlc);
    case 2: // DLC вниз
      return Number(a.dlc) - Number(b.dlc);
    case 3: // Legendary вверх
      return Number(checkIsLegendary(b)) - Number(checkIsLegendary(a));
    case 4: // Legendary вниз
      return Number(checkIsLegendary(a)) - Number(checkIsLegendary(b));
    case 0: // алфавит
    default:
      return a.name.localeCompare(b.name);
  }
}
