import { Flex, Progress } from "antd";
import { PROGRESSBAR_COLORS } from "../../lib/consts";
import type { ShieldItem } from "../categories/shields/types";
import { getSubCategoryStats } from "../../lib/utils";

export default function SubCategoryLabel({
  title,
  data,
}: {
  title: string;
  data: ShieldItem[];
}) {
  const { total, collected, percentage } = getSubCategoryStats(data);

  return (
    <Flex align="center" gap={10}>
      <span style={{ fontSize: 30, flex: 1 }}>{title}</span>
      <span style={{ flex: 0.2, fontSize: 20, marginTop: 7 }}>
        {collected + "/" + total}
      </span>
      <Progress
        percent={percentage}
        strokeColor={PROGRESSBAR_COLORS}
        style={{ flex: 3, fontSize: 20 }}
      />
    </Flex>
  );
}
