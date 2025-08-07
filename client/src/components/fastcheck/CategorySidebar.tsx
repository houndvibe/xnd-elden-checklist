import { Button, ConfigProvider, Flex } from "antd";
import { ItemCategory } from "../../global-types";
import { transformCategoryToName, truncateString } from "../../lib/utils/misc";
import { t } from "../../i18n";
import { isTablet } from "react-device-detect";
import styles from "./CategorySidebar.module.scss";
import { APP_PALETTE } from "../../lib/consts";
import { useAppSelector } from "../../store/typedDispatch";
import { getCategoryStats } from "../../lib/utils/stats";
import { Collection } from "../../store/collectionSlice";

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
  const checkedCategories = useAppSelector(
    (state) => state.settings.checkedCategories
  );

  const { collectionData } = useAppSelector((state) => state.collection);

  const { checkDlc, altArmor, loosable } = useAppSelector(
    (state) => state.settings
  );

  return (
    <div className={styles.sidebar}>
      <Flex vertical gap={8}>
        {categories
          .filter((cat) => checkedCategories.includes(cat))
          .map((category) => {
            const dataKey = (category + "Data") as keyof Collection;
            const categoryData = collectionData[dataKey];

            const stats = getCategoryStats(
              categoryData,
              checkDlc,
              altArmor,
              loosable
            );
            return (
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
                  size={isTablet ? "small" : "middle"}
                  className={styles.categoryButton}
                  onClick={() => onCategorySelect(category)}
                  style={{
                    maxWidth: 250,
                    justifyContent: "flex-start",
                    display: "flex",
                  }}
                >
                  <Flex className={styles.text} gap={10}>
                    <span
                      style={{
                        color:
                          stats.collected == stats.total
                            ? APP_PALETTE.textHighlighted
                            : APP_PALETTE.textPrimary,
                      }}
                    >
                      {stats.collected + "/" + stats.total}
                    </span>
                    <>
                      {truncateString(
                        t("misc", transformCategoryToName(category)),
                        16
                      )}
                    </>
                  </Flex>
                </Button>
              </ConfigProvider>
            );
          })}
      </Flex>
    </div>
  );
}
