import { Progress, Typography } from "antd";
import { getCategoryStats } from "../../lib/utils";
import { progressbarColors } from "../../lib/consts";
import type { Shields } from "../categories/shields/data";

export default function CategoryInfo({ items }: { items: Shields }) {
  const { total, collected, percentage } = getCategoryStats(items);

  return (
    <div style={{ textAlign: "center" }}>
      <Progress
        type="dashboard"
        percent={percentage}
        strokeColor={progressbarColors}
      />
      <Typography.Title>
        Shields <>{collected + "/" + total}</>
      </Typography.Title>
    </div>
  );
}
