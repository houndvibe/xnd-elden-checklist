import { Button, Card, ConfigProvider, Flex, Progress } from "antd";
import { getCategoryStats } from "../../lib/utils/stats";
import { useAppSelector } from "../../store/typedDispatch";
import DashboardWidget from "./DashboardWidget";
import { APP_PALETTE, PROGRESSBAR_COLORS } from "../../lib/consts";

import { ItemCategory } from "../../global-types";
import { useState } from "react";

const categoryTypes: ItemCategory[] = [
  "shieldsAndTorches",
  "spiritAshes",
  "talismans",
  "ashesOfWar",
  "sorceries",
  "incantations",
  "gestures",
  "meleWeapons",
  "rangedWeapons",
  "infoItems",
  "toolsAndBellBearings",
  "tearsAndUpgrades",
  "craft",
  "armour",
  "consumablesAndMultiplayer",
] as const;

export default function Dashboard() {
  const collectionData = useAppSelector(
    (state) => state.collection.collectionData
  );

  const stats = categoryTypes.map((type) => {
    const key = `${type}Data` as keyof typeof collectionData;
    const data = collectionData[key];
    return {
      type,
      data,
      stats: getCategoryStats(data),
    };
  });

  const generalCollected = stats.reduce(
    (sum, item) => sum + item.stats.collected,
    0
  );
  const generalTotal = stats.reduce((sum, item) => sum + item.stats.total, 0);
  const generalPercentage = Math.round((generalCollected / generalTotal) * 100);

  const [mode, setMod] = useState<boolean>(false);
  return (
    <Flex vertical gap={20}>
      <ConfigProvider
        theme={{
          components: {
            Card: {
              headerBg: APP_PALETTE.bgLight, // your desired background color
              headerFontSize: 16,
            },
          },
        }}
      >
        <Card
          title={
            <Flex justify="space-between" align="center">
              {"General stats"}
              <>
                <Button onClick={() => setMod(!mode)}>
                  {mode ? "to full mode" : "to compact mode"}{" "}
                </Button>
              </>
            </Flex>
          }
        >
          <Flex vertical gap={10}>
            <span>{`${generalCollected}/${generalTotal}`}</span>
            <Progress
              percent={generalPercentage}
              strokeColor={PROGRESSBAR_COLORS}
            />
          </Flex>
        </Card>
      </ConfigProvider>
      <>
        {mode ? (
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
                        mode={mode}
                      />
                    ))}
                </Flex>
              )
            )}
          </>
        ) : (
          <Flex wrap gap={20} justify="space-between">
            {stats.map(({ type, data, stats }) => (
              <DashboardWidget
                key={type}
                dataType={type}
                data={stats}
                subData={data}
                mode={mode}
              />
            ))}
          </Flex>
        )}
      </>
    </Flex>
  );
}
