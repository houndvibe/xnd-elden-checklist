import { Flex, Progress, Typography } from "antd";
import styles from "./CategoryInfo.module.scss";

import { PROGRESSBAR_COLORS } from "../../../lib/consts";
import { getCategoryStats } from "../../../lib/utils/stats";
import type { ItemSubCategoryMap } from "../../../global-types";

interface CategoryInfoProps {
  items: ItemSubCategoryMap;
  title: string;
}

export default function CategoryInfo({ items, title }: CategoryInfoProps) {
  const { total, collected, percentage } = getCategoryStats(items);

  return (
    <Flex vertical className={styles.card}>
      <Typography.Title level={4} className={styles.title}>
        {`${title} ${collected}/${total}`}
      </Typography.Title>

      <Progress
        percent={percentage}
        size={{ height: 20 }}
        strokeColor={PROGRESSBAR_COLORS}
      />
    </Flex>
  );
}
