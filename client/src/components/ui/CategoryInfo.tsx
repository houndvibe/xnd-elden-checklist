import { Progress, Typography } from "antd";
import type { ProgressProps } from "antd";
import type { Shields } from "../categories/shields/data";
import { getCategoryStats } from "../../lib";

const conicColors: ProgressProps["strokeColor"] = {
  "0%": "grey",
  "30%": "#d4af37",
  "60%": "#2c524d",
  "100%": "green",
};

export default function CategoryInfo({ items }: { items: Shields }) {
  const { total, collected, percentage } = getCategoryStats(items);

  return (
    <div style={{ textAlign: "center" }}>
      <Progress
        type="dashboard"
        percent={percentage}
        strokeColor={conicColors}
      />
      <Typography.Title>
        Shields <>{collected + "/" + total}</>
      </Typography.Title>
    </div>
  );
}
