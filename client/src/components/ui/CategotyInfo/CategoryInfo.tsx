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
