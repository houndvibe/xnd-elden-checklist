import { Progress, Typography } from "antd";
import type { ProgressProps } from "antd";
import type { Shields } from "../categories/shields/data";
import { getCategoryStats } from "../../lib";

export const conicColors: ProgressProps["strokeColor"] = {
  "0%": "#3a3a3a",
  "45%": "#8b7c3b",

  "100%": "#083523",
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
