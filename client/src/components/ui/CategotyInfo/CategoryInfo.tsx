import { Flex, Progress, Typography } from "antd";
import styles from "./CategoryInfo.module.scss";

import { PROGRESSBAR_COLORS } from "../../../lib/consts";
import { getCategoryStats } from "../../../lib/utils/stats";
import type { ItemSubCategoryMap } from "../../../global-types";
import { t } from "../../../i18n";

interface CategoryInfoProps {
  items: ItemSubCategoryMap;
  title: string;
}

export default function CategoryInfo({ items, title }: CategoryInfoProps) {
  const { total, collected, percentage } = getCategoryStats(items);
  const titleClassname = total == collected ? "titleDone" : "title";

  return (
    <Flex vertical className={styles.card}>
      <Typography.Title level={4} className={styles[titleClassname]}>
        {`${t("misc", title)} ${collected}/${total}`}
      </Typography.Title>

      <Progress
        percent={percentage}
        size={{ height: 20 }}
        strokeColor={PROGRESSBAR_COLORS}
      />
    </Flex>
  );
}
