import { Tabs as AntdTabs } from "antd";
import type { TabsProps } from "antd";
import Shields from "./categories/shields/Shields";

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "Weapons",
    children: "Weapons",
  },
  {
    key: "2",
    label: "Armour",
    children: "Armour",
  },
  {
    key: "3",
    label: "Shields",
    children: <Shields />,
  },
  {
    key: "4",
    label: "Talismans",
    children: "Talismans",
  },
  {
    key: "5",
    label: "Ashes of war",
    children: "Ashes of war",
  },
  {
    key: "6",
    label: "Spirit Ashes",
    children: "Spirit Ashes",
  },
  {
    key: "7",
    label: "Sorceries",
    children: "Sorceries",
  },
  {
    key: "8",
    label: "Incontations",
    children: "Incontations",
  },
  {
    key: "9",
    label: "Tears",
    children: "Tears",
  },
  {
    key: "10",
    label: "Gestures",
    children: "Gestures",
  },
  {
    key: "11",
    label: "Tools",
    children: "Tools",
  },
  {
    key: "12",
    label: "Craft",
    children: "Craft",
  },
  {
    key: "13",
    label: "Upgrades",
    children: "Upgrades",
  },
  {
    key: "14",
    label: "Bell Bearings",
    children: "Bell Bearings",
  },
  {
    key: "15",
    label: "Cookbooks",
    children: "Cookbooks",
  },
];

export default function Tabs() {
  return <AntdTabs defaultActiveKey="1" items={items} />;
}
