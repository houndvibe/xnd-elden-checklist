import { Card, Flex, Progress } from "antd";
import type { ItemCategory, ItemSubCategoryMap } from "../../global-types";
import { toTitleCaseFromCamel } from "../../lib/utils/converters";
import { PROGRESSBAR_COLORS } from "../../lib/consts";
import { getSubCategoryStats } from "../../lib/utils/stats";

export default function DashboardWidget({
  dataType,
  data,
  subData,
}: {
  dataType: ItemCategory;
  data: {
    total: number;
    collected: number;
    percentage: number;
  };
  subData: ItemSubCategoryMap;
}) {
  return (
    <Card title={toTitleCaseFromCamel(dataType)} style={{ width: "50vw" }}>
      <Flex>
        <Flex vertical flex={1} align="center">
          <Progress
            type="dashboard"
            percent={data.percentage}
            strokeColor={PROGRESSBAR_COLORS}
          />

          <span style={{ fontSize: 20 }}>
            {" "}
            {data.collected + "/" + data.total}
          </span>
        </Flex>
        <Flex vertical gap={20} flex={3}>
          {Object.entries(subData).map(([subclassName, subItems]) => {
            const stats = getSubCategoryStats(subItems);

            return (
              <Flex key={subclassName} gap={10} justify="flex-end">
                <span>{toTitleCaseFromCamel(subclassName)}</span>
                <span>{`${stats.collected}/${stats.total}`}</span>
                <Progress
                  style={{ width: 200 }}
                  percent={stats.percentage}
                  strokeColor={PROGRESSBAR_COLORS}
                />
              </Flex>
            );
          })}
        </Flex>
      </Flex>
    </Card>
  );
}
