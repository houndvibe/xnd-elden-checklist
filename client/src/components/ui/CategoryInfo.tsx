import { Progress, Typography } from "antd";
import type { ProgressProps } from "antd";

const conicColors: ProgressProps["strokeColor"] = {
  "0%": "grey",
  "30%": "#d4af37",
  "60%": "#2c524d",
  "100%": "green",
};

export default function CategoryInfo() {
  return (
    <div>
      <Progress type="dashboard" percent={100} strokeColor={conicColors} />
      <Typography.Title>Shields</Typography.Title>
    </div>
  );
}
