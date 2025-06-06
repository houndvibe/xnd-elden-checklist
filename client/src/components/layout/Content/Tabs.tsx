import { Tabs as AntdTabs, ConfigProvider } from "antd";
import Shields from "../../categories/shields/Shields";
import { APP_PALETTE } from "../../../lib/consts";
import SpiritAshes from "../../categories/spirit-ashes/SpiritAshes";
import type { ItemCategory } from "../../../global-types";

interface CustomTabItem {
  key: ItemCategory;
  label: string;
  children: React.ReactNode;
}

const items: CustomTabItem[] = [
  {
    key: "weapons",
    label: "Weapons",
    children: "Weapons",
  },
  {
    key: "armour",
    label: "Armour",
    children: "Armour",
  },
  {
    key: "shields",
    label: "Shields",
    children: <Shields />,
  },
  {
    key: "talismans",
    label: "Talismans",
    children: "Talismans",
  },
  {
    key: "ashesOfWar",
    label: "Ashes of war",
    children: "Ashes of war",
  },
  {
    key: "spiritAshes",
    label: "Spirit Ashes",
    children: <SpiritAshes />,
  },
  {
    key: "sorceries",
    label: "Sorceries",
    children: "Sorceries",
  },
  {
    key: "incantations",
    label: "incantations",
    children: "incantations",
  },
  {
    key: "tears",
    label: "Tears",
    children: "Tears",
  },
  {
    key: "gestures",
    label: "Gestures",
    children: "Gestures",
  },
  {
    key: "tools",
    label: "Tools",
    children: "Tools",
  },
  {
    key: "craft",
    label: "Craft",
    children: "Craft",
  },
  {
    key: "upgrades",
    label: "Upgrades",
    children: "Upgrades",
  },
  {
    key: "bellBearings",
    label: "Bell Bearings",
    children: "Bell Bearings",
  },
  {
    key: "cookbooks",
    label: "Cookbooks",
    children: "Cookbooks",
  },
];

export default function Tabs() {
  return (
    <ConfigProvider
      theme={{
        components: {
          Tabs: {
            inkBarColor: APP_PALETTE.textHighlighted,
            itemActiveColor: APP_PALETTE.textHighlighted,
            itemHoverColor: APP_PALETTE.textHighlighted,
            itemSelectedColor: APP_PALETTE.textHighlighted,
          },
        },
      }}
    >
      <AntdTabs items={items} />
    </ConfigProvider>
  );
}
