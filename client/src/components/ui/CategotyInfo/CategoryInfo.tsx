import { Flex, Progress, Typography } from "antd";
import styles from "./CategoryInfo.module.scss";

import { PROGRESSBAR_COLORS } from "../../../lib/consts";
import { getCategoryStats } from "../../../lib/utils/stats";
import type { ItemSubCategoryMap } from "../../../global-types";
import { t } from "../../../i18n";
import { useAppSelector } from "../../../store/typedDispatch";

interface CategoryInfoProps {
  items: ItemSubCategoryMap;
  title: string;
}

export default function CategoryInfo({ items, title }: CategoryInfoProps) {
  const { checkDlc, checkedSubcategories } = useAppSelector(
    (state) => state.settings
  );

  const filteredData: Partial<ItemSubCategoryMap> = Object.fromEntries(
    Object.entries(items).filter(([subcategory]) =>
      checkedSubcategories.includes(subcategory)
    )
  );

  const { total, collected, percentage } = getCategoryStats(
    filteredData,
    checkDlc
  );

  const currentLang = useAppSelector((state) => state.settings.lang);
  const titleClassname = currentLang === "ru" ? "titleRu" : "title";

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
