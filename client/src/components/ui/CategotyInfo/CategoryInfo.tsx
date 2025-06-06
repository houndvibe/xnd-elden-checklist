import { Flex, Progress, Typography } from "antd";
import { getCategoryStats } from "../../../lib/utils";
import { PROGRESSBAR_COLORS } from "../../../lib/consts";
import type { ShieldCategoryMap } from "../../categories/shields/types";
import styles from "./CategoryInfo.module.scss";
import type { SpiritAshesCategoryMap } from "../../categories/spirit-ashes/types";

export default function CategoryInfo({
  items,
  title,
}: {
  items: ShieldCategoryMap | SpiritAshesCategoryMap;
  title: string;
}) {
  const { total, collected, percentage } = getCategoryStats(items);

  return (
    <Flex vertical className={styles.card}>
      <Progress
        type="dashboard"
        percent={percentage}
        strokeColor={PROGRESSBAR_COLORS}
      />
      <Typography.Title className={styles.title}>
        <>{title + " " + collected + "/" + total}</>
      </Typography.Title>
    </Flex>
  );
}
