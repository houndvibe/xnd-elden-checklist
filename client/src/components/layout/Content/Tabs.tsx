import { Tabs as AntdTabs, ConfigProvider } from "antd";
import { useNavigate, useParams } from "react-router-dom";

import { APP_PALETTE, itemCategories } from "../../../lib/consts";
import { transformCategoryToName } from "../../../lib/utils/misc";

import Dashboard from "../../dashboard/Dashboard";
import CategoryTab from "../../ui/CatrgoryTab/CategoryTab";
import DiscoveryCalculator from "../../discovery-calculator/DiscoveryCalculator";

import type { ItemCategory } from "../../../global-types";
import { t } from "../../../i18n";

import Checkpoints from "../../checkpoints/Checkpoints";

type ExtendedTabKey =
  | ItemCategory
  | "dashboard"
  | "discoveryCalculator"
  | "checkpoints";

interface CustomTabItem {
  key: ExtendedTabKey;
  label: string | React.ReactNode;
  children: React.ReactNode;
}

const createItemTabs = (): CustomTabItem[] =>
  itemCategories.map((category) => ({
    key: category,
    label: t("misc", transformCategoryToName(category)),
    children: <CategoryTab category={category} />,
  }));

const baseTabs: CustomTabItem[] = [
  { key: "dashboard", label: t("misc", "PROGRESS"), children: <Dashboard /> },
  {
    key: "discoveryCalculator",
    label: t("misc", "Discovery Calculator"),
    children: <DiscoveryCalculator />,
  },
  {
    key: "checkpoints",
    label: t("misc", "Checkpoints"),
    children: <Checkpoints />,
  },
];

const itemTabs: CustomTabItem[] = createItemTabs();

export default function Tabs() {
  const navigate = useNavigate();
  const { tabKey } = useParams<{ tabKey?: string }>();

  // Определяем, является ли текущая вкладка категорией предметов
  const isItemCategory = itemCategories.includes(tabKey as ItemCategory);

  // Определяем активную вкладку
  const activeKey: ExtendedTabKey = [...baseTabs, ...itemTabs].some(
    (item) => item.key === tabKey
  )
    ? (tabKey as ExtendedTabKey)
    : "dashboard";

  // Определяем, какой контент отображать
  const renderContent = () => {
    const baseTab = baseTabs.find((tab) => tab.key === activeKey);
    if (baseTab) {
      return baseTab.children;
    }

    if (isItemCategory) {
      return null;
    }

    return <Dashboard />;
  };

  return (
    <div style={{ maxWidth: "96vw", overflowX: "hidden" }}>
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
        {isItemCategory && (
          <AntdTabs
            items={itemTabs}
            activeKey={activeKey}
            onChange={(key) => navigate(`/${key}`)}
          />
        )}

        {renderContent()}
      </ConfigProvider>
    </div>
  );
}
