import { Flex, Progress } from "antd";
import { PROGRESSBAR_COLORS } from "../../../lib/consts";
import type { ShieldItem } from "../../categories/shields/types";
import { getSubCategoryStats } from "../../../lib/utils";
import styles from "./SubCategoryInfo.module.scss";

export default function SubCategoryLabel({
  title,
  data,
}: {
  title: string;
  data: ShieldItem[];
}) {
  const { total, collected, percentage } = getSubCategoryStats(data);

  return (
    <Flex className={styles.wrapper} gap={15}>
      <span className={styles.title}>{title}</span>
      <span className={styles.count}>{collected + "/" + total}</span>
      <Progress
        percent={percentage}
        strokeColor={PROGRESSBAR_COLORS}
        className={styles.progress}
      />
    </Flex>
  );
}
