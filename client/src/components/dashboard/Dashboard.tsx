import { Card, Flex, Progress } from "antd";
import { getCategoryStats } from "../../lib/utils/stats";
import { useAppSelector } from "../../store/typedDispatch";
import DashboardWidget from "./DashboardWidget";
import { PROGRESSBAR_COLORS } from "../../lib/consts";

export default function Dashboard() {
  const shieldsData = useAppSelector((state) => state.shields.shieldsData);
  const spiritAshesData = useAppSelector(
    (state) => state.spiritAshes.spiritAshesData
  );

  const shieldsStats = getCategoryStats(shieldsData);
  const spiritAshesStats = getCategoryStats(spiritAshesData);

  const generalCollected = shieldsStats.collected + spiritAshesStats.collected;
  const generalTotal = shieldsStats.total + spiritAshesStats.total;
  const generalPercentage = Math.round((generalCollected / generalTotal) * 100);

  return (
    <Flex vertical gap={20}>
      <Card title="General stats">
        <Flex vertical gap={10}>
          <span>{`${generalCollected}/${generalTotal}`}</span>
          <Progress
            percent={generalPercentage}
            strokeColor={PROGRESSBAR_COLORS}
          />
        </Flex>
      </Card>

      <Flex gap={20}>
        <DashboardWidget
          dataType="shields"
          data={shieldsStats}
          subData={shieldsData}
        />
        <DashboardWidget
          dataType="spiritAshes"
          data={spiritAshesStats}
          subData={spiritAshesData}
        />
      </Flex>
    </Flex>
  );
}
