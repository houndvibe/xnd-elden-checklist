import { Card, ConfigProvider, Flex, Progress } from "antd";
import { getCategoryStats } from "../../lib/utils/stats";
import { useAppSelector } from "../../store/typedDispatch";
import DashboardWidget from "./DashboardWidget";
import { APP_PALETTE, PROGRESSBAR_COLORS } from "../../lib/consts";

import { ItemCategory } from "../../global-types";

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
        <Card title="General stats">
          <Flex vertical gap={10}>
            <span>{`${generalCollected}/${generalTotal}`}</span>
            <Progress
              percent={generalPercentage}
              strokeColor={PROGRESSBAR_COLORS}
            />
          </Flex>
        </Card>
      </ConfigProvider>

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
                />
              ))}
          </Flex>
        )
      )}
    </Flex>
  );
}
