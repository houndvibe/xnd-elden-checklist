import { Tabs as AntdTabs } from "antd";
import type { TabsProps } from "antd";
import Shields from "./categories/shields/Shields";

const items: TabsProps["items"] = [
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
    children: "Spirit Ashes",
  },
  {
    key: "sorceries",
    label: "Sorceries",
    children: "Sorceries",
  },
  {
    key: "incontations",
    label: "Incontations",
    children: "Incontations",
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
  return <AntdTabs items={items} />;
}
