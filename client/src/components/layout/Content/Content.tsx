import { Layout, Flex, Menu, ConfigProvider } from "antd";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";

import Tabs from "./Tabs";
import styles from "./Content.module.scss";
import { APP_PALETTE, itemCategories } from "../../../lib/consts";
import { t } from "../../../i18n";
import { ItemCategory } from "../../../global-types";
import { useAppSelector } from "../../../store/typedDispatch";
import SettingsPannel from "../../ui/SettingsPannel/SettingsPannel";
import { useMemo } from "react";

/* import FastCheckSwitch from "../../ui/SettingsPannel/FastCheckSwitch"; */

const { Content: AppContent } = Layout;

export default function Content() {
  const navigate = useNavigate();
  const location = useLocation();

  const { showSettings, checkedCategories, fastcheck } = useAppSelector(
    (state) => state.settings
  );
  const getActiveKey = () => {
    const path = location.pathname.split("/")[1] as
      | ItemCategory
      | "dashboard"
      | "discoveryCalculator"
      | "checkpoints";

    if (
      path === "dashboard" ||
      path === "discoveryCalculator" ||
      path === "checkpoints"
    ) {
      return path;
    }

    if (itemCategories.includes(path)) {
      return "items";
    }

    return "";
  };

  const getDefaultItemCategory = () => {
    return itemCategories.filter((i) => checkedCategories.includes(i))[0];
  };

  const isOverflowHidden = useMemo(
    () => getActiveKey() === "items" && fastcheck && !showSettings,
    [fastcheck, location.pathname, showSettings]
  );
  console.log(showSettings);

  return (
    <AppContent
      className={`${styles.content} ${isOverflowHidden ? styles.hidden : ""}`}
    >
      <Flex vertical style={{ position: "relative" }}>
        {showSettings && <SettingsPannel />}
        <ConfigProvider
          theme={{
            components: {
              Menu: {
                horizontalItemSelectedColor: APP_PALETTE.textPrimary,
                horizontalItemHoverColor: APP_PALETTE.textPrimary,
                itemSelectedColor: APP_PALETTE.textPrimary,
                activeBarBorderWidth: 2,
                activeBarHeight: 2,
              },
            },
          }}
        >
          <Menu
            mode="horizontal"
            selectedKeys={[getActiveKey()]}
            className={styles.menu}
            items={[
              {
                key: "dashboard",
                label: t("misc", "Progress"),
                onClick: () => navigate("/dashboard"),
              },
              {
                key: "items",
                label: t("misc", "Items Collection"),
                onClick: () => {
                  const currentPath = location.pathname.split("/")[1];
                  if (!itemCategories.includes(currentPath as ItemCategory)) {
                    navigate(`/${getDefaultItemCategory()}`);
                  }
                },
              },
              {
                key: "discoveryCalculator",
                label: t("misc", "Discovery Calculator"),
                onClick: () => navigate("/discoveryCalculator"),
              },
              {
                key: "checkpoints",
                label: t("misc", "Checkpoints"),
                onClick: () => navigate("/checkpoints"),
              },
            ]}
          />

          {/*           {itemCategories.includes(
            location.pathname.split("/")[1] as ItemCategory
          ) && (
            <Flex
              justify="center"
              align="center"
              gap={10}
              style={{
                position: "absolute",
                right: 10,
                top: showSettings ? 56 : 10,
              }}
            >
              <FastCheckSwitch />
            </Flex>
          )} */}
        </ConfigProvider>

        <Routes>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path=":tabKey" element={<Tabs />} />
        </Routes>
      </Flex>
    </AppContent>
  );
}
