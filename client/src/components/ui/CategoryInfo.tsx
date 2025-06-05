import { Progress, Typography } from "antd";
import type { ProgressProps } from "antd";
import type { DataType, Shields } from "../categories/shields/data";

const conicColors: ProgressProps["strokeColor"] = {
  "0%": "grey",
  "30%": "#d4af37",
  "60%": "#2c524d",
  "100%": "green",
};

export default function CategoryInfo({ items }: { items: Shields }) {
  const getCollectedStats = (data: Shields) => {
    let total = 0;
    let collected = 0;

    for (const category of Object.values(data)) {
      total += category.length;
      collected += category.filter((item: DataType) => item.collected).length;
    }

    const percent = total === 0 ? 0 : Math.round((collected / total) * 100);

    return { total, collected, percent };
  };

  const { total, collected, percent } = getCollectedStats(items);

  return (
    <div style={{ textAlign: "center" }}>
      <Progress type="dashboard" percent={percent} strokeColor={conicColors} />
      <Typography.Title>
        Shields <>{collected + "/" + total}</>
      </Typography.Title>
    </div>
  );
}
