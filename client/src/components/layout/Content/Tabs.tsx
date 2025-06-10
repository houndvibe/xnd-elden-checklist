import { Tabs as AntdTabs, ConfigProvider } from "antd";
import { APP_PALETTE, itemCategories } from "../../../lib/consts";
import { useNavigate, useParams } from "react-router-dom";
import type { ItemCategory } from "../../../global-types";

import { transformCategoryToName } from "../../../lib/utils/misc";
import Dashboard from "../../dashboard/Dashboard";
import CategoryTab from "../../ui/CatrgoryTab/CategoryTab";
import DiscoveryCalculator from "../../discovery-calculator/DiscoveryCalculator";

type ExtendedTabKey = ItemCategory | "dashboard" | "discoveryCalculator";

interface CustomTabItem {
  key: ExtendedTabKey;
  label: string | React.ReactNode;
  children: React.ReactNode;
}

const itemTabs: CustomTabItem[] = itemCategories.map((category) => {
  return {
    key: category,
    label: transformCategoryToName(category),
    children: <CategoryTab category={category} />,
  };
});

const tabs: CustomTabItem[] = [
  { key: "dashboard", label: "PROGRESS", children: <Dashboard /> },
  {
    key: "discoveryCalculator",
    label: "Discovery Calculator",
    children: <DiscoveryCalculator />,
  },
  ...itemTabs,
];

export default function Tabs() {
  const navigate = useNavigate();
  const { tabKey } = useParams<{ tabKey?: string }>();

  const activeKey = tabs.some((item) => item.key === tabKey)
    ? tabKey
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
      <AntdTabs
        items={tabs}
        activeKey={activeKey}
        onChange={(key) => navigate(`/${key}`)}
      />
    </ConfigProvider>
  );
}
