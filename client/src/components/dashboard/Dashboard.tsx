import { Card, Flex, Progress } from "antd";
import { getCategoryStats } from "../../lib/utils/stats";
import { useAppSelector } from "../../store/typedDispatch";
import DashboardWidget from "./DashboardWidget";
import { PROGRESSBAR_COLORS } from "../../lib/consts";

export default function Dashboard() {
  const { shieldsData, spiritAshesData, talismansData, ashesOfWarData } =
    useAppSelector((state) => state.collection.collectionData);

  const shieldsStats = getCategoryStats(shieldsData);
  const spiritAshesStats = getCategoryStats(spiritAshesData);
  const talismansStats = getCategoryStats(talismansData);
  const ashesOfWarStats = getCategoryStats(ashesOfWarData);

  const generalCollected =
    shieldsStats.collected +
    spiritAshesStats.collected +
    talismansStats.collected +
    ashesOfWarStats.collected;
  const generalTotal =
    shieldsStats.total +
    spiritAshesStats.total +
    talismansStats.total +
    ashesOfWarStats.total;
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

      <Flex gap={21}>
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
      <Flex>
        <DashboardWidget
          dataType="talismans"
          data={talismansStats}
          subData={talismansData}
        />
        <DashboardWidget
          dataType="ashesOfWar"
          data={ashesOfWarStats}
          subData={ashesOfWarData}
        />
      </Flex>
    </Flex>
  );
}
