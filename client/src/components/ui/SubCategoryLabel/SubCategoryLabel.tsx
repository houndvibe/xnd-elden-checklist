import { Flex, Progress } from "antd";
import type { Item } from "../../../global-types";

import { PROGRESSBAR_COLORS } from "../../../lib/consts";
import { getSubCategoryStats } from "../../../lib/utils/stats";

import styles from "./SubCategoryInfo.module.scss";

interface SubCategoryLabelProps {
  title: string;
  data: Item[];
}

export default function SubCategoryLabel({
  title,
  data,
}: SubCategoryLabelProps) {
  const { total, collected, percentage } = getSubCategoryStats(data);

  return (
    <Flex className={styles.wrapper} gap={15} align="center">
      <span className={styles.title}>{title}</span>
      <span className={styles.count}>{`${collected}/${total}`}</span>
      <Progress
        percent={percentage}
        strokeColor={PROGRESSBAR_COLORS}
        className={styles.progress}
        showInfo={false}
      />
    </Flex>
  );
}
