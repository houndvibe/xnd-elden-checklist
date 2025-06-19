import { Tabs as AntdTabs, ConfigProvider } from "antd";
import { useNavigate, useParams } from "react-router-dom";

import { useAppSelector } from "../../../store/typedDispatch";

import { APP_PALETTE, itemCategories } from "../../../lib/consts";
import { transformCategoryToName } from "../../../lib/utils/misc";

import Dashboard from "../../dashboard/Dashboard";
import CategoryTab from "../../ui/CatrgoryTab/CategoryTab";
import DiscoveryCalculator from "../../discovery-calculator/DiscoveryCalculator";
import SettingsPannel from "./SettingsPannel";

import type { ItemCategory } from "../../../global-types";

type ExtendedTabKey = ItemCategory | "dashboard" | "discoveryCalculator";

interface CustomTabItem {
  key: ExtendedTabKey;
  label: string | React.ReactNode;
  children: React.ReactNode;
}

const createItemTabs = (): CustomTabItem[] =>
  itemCategories.map((category) => ({
    key: category,
    label: transformCategoryToName(category),
    children: <CategoryTab category={category} />,
  }));

const baseTabs: CustomTabItem[] = [
  { key: "dashboard", label: "PROGRESS", children: <Dashboard /> },
  {
    key: "discoveryCalculator",
    label: "Discovery Calculator",
    children: <DiscoveryCalculator />,
  },
];

const tabs: CustomTabItem[] = [...baseTabs, ...createItemTabs()];

export default function Tabs() {
  const navigate = useNavigate();
  const { tabKey } = useParams<{ tabKey?: string }>();
  const showSettings = useAppSelector((state) => state.settings.showSettings);

  const activeKey: ExtendedTabKey = tabs.some((item) => item.key === tabKey)
    ? (tabKey as ExtendedTabKey)
    : "dashboard";

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
      {showSettings && <SettingsPannel />}

      <AntdTabs
        items={tabs}
        activeKey={activeKey}
        onChange={(key) => navigate(`/${key}`)}
      />
    </ConfigProvider>
  );
}
