import { Flex, Progress, Typography } from "antd";
import { PROGRESSBAR_COLORS } from "../../../lib/consts";
import styles from "./CategoryInfo.module.scss";
import type { ItemSubCategoryMap } from "../../../global-types";
import { getCategoryStats } from "../../../lib/utils/stats";

export default function CategoryInfo({
  items,
  title,
}: {
  items: ItemSubCategoryMap;
  title: string;
}) {
  const { total, collected, percentage } = getCategoryStats(items);

  return (
    <Flex vertical className={styles.card}>
      <Typography.Title className={styles.title}>
        <>{title + " " + collected + "/" + total}</>
      </Typography.Title>
      <Progress
        percent={percentage}
        size={{ height: 20 }}
        strokeColor={PROGRESSBAR_COLORS}
      />
    </Flex>
  );
}
