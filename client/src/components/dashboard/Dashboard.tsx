import { useState } from "react";
import { Button, Card, ConfigProvider, Flex, Progress } from "antd";

import { useAppSelector } from "../../store/typedDispatch";
import { getCategoryStats } from "../../lib/utils/stats";

import DashboardWidget from "./DashboardWidget";

import {
  APP_PALETTE,
  itemCategories,
  PROGRESSBAR_COLORS,
} from "../../lib/consts";

import styles from "./Dashboard.module.scss";
import { t } from "../../i18n";
import { ItemSubCategoryMap } from "../../global-types";

export default function Dashboard() {
  const [isCompactMode, setIsCompactMode] = useState(false);
  const collectionData = useAppSelector(
    (state) => state.collection.collectionData
  );

  const { checkedCategories, checkedSubcategories, checkDlc, altArmor } =
    useAppSelector((state) => state.settings);

  const stats = itemCategories
    .filter((type) => checkedCategories.includes(type))
    .map((type) => {
      const key = `${type}Data` as keyof typeof collectionData;
      const data = collectionData[key];

      // Оставляем только включённые подкатегории
      const filteredData: Partial<ItemSubCategoryMap> = Object.fromEntries(
        Object.entries(data).filter(([subcategory]) =>
          checkedSubcategories.includes(subcategory)
        )
      );

      return {
        type,
        data: filteredData,
        stats: getCategoryStats(filteredData, checkDlc, altArmor),
      };
    });

  const totalCollected = stats.reduce(
    (acc, { stats }) => acc + stats.collected,
    0
  );
  const totalItems = stats.reduce((acc, { stats }) => acc + stats.total, 0);
  const totalPercentage = Number(
    ((totalCollected / totalItems) * 100).toFixed(2)
  );

  const renderCompactMode = () => (
    <>
      {Array.from({ length: Math.ceil(stats.length / 2) }).map(
        (_, rowIndex) => (
          <Flex key={rowIndex} gap={20}>
            {stats
              .slice(rowIndex * 2, rowIndex * 2 + 2)
              .map(({ type, data, stats }) => (
                <DashboardWidget
                  key={type}
                  dataType={type}
                  data={stats}
                  subData={data}
                  mode={true}
                />
              ))}
          </Flex>
        )
      )}
    </>
  );

  const renderFullMode = () => (
    <Flex wrap gap={20} justify="space-between">
      {stats.map(({ type, data, stats }) => (
        <DashboardWidget
          key={type}
          dataType={type}
          data={stats}
          subData={data}
          mode={false}
        />
      ))}
    </Flex>
  );

  return (
    <Flex vertical gap={20} className={styles.dashboard}>
      <ConfigProvider
        theme={{
          components: {
            Card: {
              headerBg: APP_PALETTE.bgLight,
              headerFontSize: 16,
            },
          },
        }}
      >
        <Card
          title={
            <Flex justify="space-between" align="center">
              <span>{t("misc", "General stats")}</span>
              <Button
                onClick={() => setIsCompactMode((prev) => !prev)}
                style={{ background: APP_PALETTE.successGreen }}
              >
                {!isCompactMode
                  ? t("misc", "To full mode")
                  : t("misc", "To compact mode")}
              </Button>
            </Flex>
          }
        >
          <Flex vertical gap={10}>
            <span>{`${totalCollected}/${totalItems}`}</span>
            <Progress
              percent={totalPercentage}
              strokeColor={PROGRESSBAR_COLORS}
            />
          </Flex>
        </Card>
      </ConfigProvider>

      {isCompactMode ? renderCompactMode() : renderFullMode()}
    </Flex>
  );
}
