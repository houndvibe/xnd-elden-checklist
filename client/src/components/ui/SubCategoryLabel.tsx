import { Flex, Progress } from "antd";
import type { DataType } from "../categories/shields/data";
import { getSubCategoryStats } from "../../lib";

export default function SubCategoryLabel({
  title,
  data,
}: {
  title: string;
  data: DataType[];
}) {
  const { total, collected, percentage } = getSubCategoryStats(data);

  return (
    <Flex align="center" gap={10}>
      <span style={{ fontSize: 30, flex: 1 }}>{title}</span>
      <span style={{ flex: 0.2, fontSize: 20, marginTop: 7 }}>
        {collected + "/" + total}
      </span>
      <Progress percent={percentage} style={{ flex: 3, fontSize: 20 }} />
    </Flex>
  );
}
