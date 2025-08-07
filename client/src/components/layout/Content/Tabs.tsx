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
import { useAppSelector } from "../../../store/typedDispatch";
import FastCheck from "../../fastcheck/FastCheck";

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

export default function Tabs() {
  const { checkedCategories } = useAppSelector((state) => state.settings);

  const createItemTabs = (): CustomTabItem[] =>
    itemCategories
      .filter((category) => checkedCategories?.includes(category))
      .map((category) => ({
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

  const navigate = useNavigate();
  const { tabKey } = useParams<{ tabKey?: string }>();
  const fastcheck = useAppSelector((state) => state.settings.fastcheck);
  const isItemCategory = itemCategories.includes(tabKey as ItemCategory);

  const activeKey: ExtendedTabKey = [...baseTabs, ...itemTabs].some(
    (item) => item.key === tabKey
  )
    ? (tabKey as ExtendedTabKey)
    : "dashboard";

  const renderContent = () => {
    const baseTab = baseTabs.find((tab) => tab.key === activeKey);
    if (baseTab) {
      return baseTab.children;
    }

    return <Dashboard />;
  };

  const renderCollection = () => {
    return fastcheck ? (
      <FastCheck />
    ) : (
      <AntdTabs
        items={itemTabs}
        activeKey={activeKey}
        onChange={(key) => navigate(`/${key}`)}
      />
    );
  };

  return (
    <div style={{ maxWidth: "96vw", overflowX: "hidden", marginTop: 10 }}>
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
        {isItemCategory ? renderCollection() : renderContent()}
      </ConfigProvider>
    </div>
  );
}
