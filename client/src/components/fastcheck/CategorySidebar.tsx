import { Button, ConfigProvider, Flex } from "antd";
import { ItemCategory } from "../../global-types";
import { transformCategoryToName } from "../../lib/utils/misc";
import { t } from "../../i18n";

import styles from "./CategorySidebar.module.scss";
import { APP_PALETTE } from "../../lib/consts";

interface CategorySidebarProps {
  categories: ItemCategory[];
  selectedCategory: ItemCategory;
  onCategorySelect: (category: ItemCategory) => void;
}

export default function CategorySidebar({
  categories,
  selectedCategory,
  onCategorySelect,
}: CategorySidebarProps) {
  return (
    <div className={styles.sidebar}>
      <Flex vertical gap={8}>
        {categories.map((category) => (
          <ConfigProvider
            theme={{
              components: {
                Button: {
                  colorPrimary: APP_PALETTE.successGreen,
                  colorPrimaryText: APP_PALETTE.bgDark,
                  colorPrimaryHover: APP_PALETTE.successGreen,
                  colorPrimaryActive: APP_PALETTE.bgDark,
                },
              },
            }}
          >
            <Button
              key={category}
              type={selectedCategory === category ? "primary" : "default"}
              size="middle"
              className={styles.categoryButton}
              onClick={() => onCategorySelect(category)}
              style={{ maxWidth: 250 }}
            >
              <span className={styles.text}>
                {t("misc", transformCategoryToName(category))}
              </span>
            </Button>
          </ConfigProvider>
        ))}
      </Flex>
    </div>
  );
}
