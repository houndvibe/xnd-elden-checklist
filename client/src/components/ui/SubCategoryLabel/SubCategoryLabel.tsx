import { Flex, Progress, Tooltip } from "antd";
import type { Item } from "../../../global-types";

import { PROGRESSBAR_COLORS, TRUNCATE_LIMITS } from "../../../lib/consts";
import { getSubCategoryStats } from "../../../lib/utils/stats";

import styles from "./SubCategoryInfo.module.scss";
import { truncateString } from "../../../lib/utils/misc";
import { useAppSelector } from "../../../store/typedDispatch";

interface SubCategoryLabelProps {
  title: string;
  data: Item[];
}

export default function SubCategoryLabel({
  title,
  data,
}: SubCategoryLabelProps) {
  const { checkDlc } = useAppSelector((state) => state.settings);
  const { total, collected, percentage } = getSubCategoryStats(data, checkDlc);

  const truncateTitle = truncateString(
    title,
    TRUNCATE_LIMITS.SUB_CATEGOTY_LABEL
  );

  return (
    <Flex className={styles.wrapper} gap={15} align="center">
      <Tooltip title={title}>
        <span className={styles.title}>{truncateTitle} </span>
      </Tooltip>

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
