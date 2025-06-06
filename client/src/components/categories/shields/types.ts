export interface ShieldItem {
  name: string;
  collected: boolean;
  link: string;
  dlc: boolean;
  imgUrl?: string;
}

export interface ShieldCategoryMap {
  smallShields: ShieldItem[];
  mediumShields: ShieldItem[];
  greatShields: ShieldItem[];
  thrustingShields: ShieldItem[];
}
