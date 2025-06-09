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
import ConsumablesAndMultiplayer from "../../categories/consumables-and-multiplayer/ConsumablesAndMultiplayer";

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
    key: "craft",
    label: "Craft",
    children: <Craft />,
  },
  {
    key: "tearsAndUpgrades",
    label: "Tears & Upgrades",
    children: <TearsAndUpgrades />,
  },
  {
    key: "toolsAndBellBearings",
    label: "Tools & Bell Bearings",
    children: <ToolsAndBells />,
  },
  {
    key: "consumablesAndMultiplayer",
    label: "Consumables & Multiplayer",
    children: <ConsumablesAndMultiplayer />,
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
];

export default function Tabs() {
  return (
    <ConfigProvider
      theme={{
        components: {
          Tabs: {
            inkBarColor: APP_PALETTE.textPrimary,
            itemActiveColor: APP_PALETTE.textPrimary,
            itemHoverColor: APP_PALETTE.textPrimary,
            itemSelectedColor: APP_PALETTE.textPrimary,
          },
        },
      }}
    >
      <AntdTabs items={items} />
    </ConfigProvider>
  );
}
