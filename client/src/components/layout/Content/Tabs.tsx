import { Tabs as AntdTabs, ConfigProvider } from "antd";
import { APP_PALETTE } from "../../../lib/consts";
import SpiritAshes from "../../categories/spirit-ashes/SpiritAshes";
import type { ItemCategory } from "../../../global-types";
import Dashboard from "../../dashboard/Dashboard";
import Talismans from "../../categories/talismans/Talismans";
import AshesOfWar from "../../categories/ashes-of-war/AshesOfWar";
import Sorceries from "../../categories/sorceries/Sorceries";
import Incantations from "../../categories/incantations/Incantations";
import Gestures from "../../categories/gestures/Gestures";
import MeleWeapons from "../../categories/mele-weapons/MeleWeapons";
import RangedWeapons from "../../categories/ranged-weapons/RangedWeapons";
import InfoItems from "../../categories/info-items/InfoItems";
import ShieldsAndTorches from "../../categories/shields/Shields";
import ToolsAndBells from "../../categories/tools-and-bells/ToolsAndBells";
import TearsAndUpgrades from "../../categories/tears-and-upgrades/TearsAndUpgrades";
import Craft from "../../categories/craft/Craft";
import Armour from "../../categories/armour/Armour";

type ExtendedTabKey = ItemCategory | "dashboard";

interface CustomTabItem {
  key: ExtendedTabKey;
  label: string | React.ReactNode;
  children: React.ReactNode;
}

const items: CustomTabItem[] = [
  {
    key: "dashboard",
    label: "PROGRESS",
    children: <Dashboard />,
  },
  {
    key: "meleWeapons",
    label: "Mele Weapons",
    children: <MeleWeapons />,
  },
  {
    key: "rangedWeapons",
    label: "Ranged Weapons",
    children: <RangedWeapons />,
  },
  {
    key: "armour",
    label: "Armour",
    children: <Armour />,
  },
  {
    key: "shieldsAndTorches",
    label: "Shields & Torches",
    children: <ShieldsAndTorches />,
  },
  {
    key: "spiritAshes",
    label: "Spirit Ashes",
    children: <SpiritAshes />,
  },
  {
    key: "sorceries",
    label: "Sorceries",
    children: <Sorceries />,
  },
  {
    key: "incantations",
    label: "incantations",
    children: <Incantations />,
  },
  {
    key: "ashesOfWar",
    label: "Ashes of war",
    children: <AshesOfWar />,
  },
  {
    key: "talismans",
    label: "Talismans",
    children: <Talismans />,
  },
  {
    key: "toolsAndBellBearings",
    label: "Tools & Bell Bearings",
    children: <ToolsAndBells />,
  },
  {
    key: "tearsAndUpgrades",
    label: "Tears & Upgrades",
    children: <TearsAndUpgrades />,
  },

  {
    key: "gestures",
    label: "Gestures",
    children: <Gestures />,
  },

  {
    key: "infoItems",
    label: "Info Items",
    children: <InfoItems />,
  },
  {
    key: "craft",
    label: "Craft",
    children: <Craft />,
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
