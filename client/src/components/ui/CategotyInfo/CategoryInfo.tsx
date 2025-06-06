import { Flex, Progress, Typography } from "antd";
import { getCategoryStats } from "../../../lib/utils";
import { PROGRESSBAR_COLORS } from "../../../lib/consts";

import styles from "./CategoryInfo.module.scss";
import type { ShieldCategoryMap } from "../../categories/shields/types";

export default function CategoryInfo({ items }: { items: ShieldCategoryMap }) {
  const { total, collected, percentage } = getCategoryStats(items);

  return (
    <Flex vertical className={styles.card}>
      <Progress
        type="dashboard"
        percent={percentage}
        strokeColor={PROGRESSBAR_COLORS}
      />
      <Typography.Title>
        Shields <>{collected + "/" + total}</>
      </Typography.Title>
    </Flex>
  );
}
