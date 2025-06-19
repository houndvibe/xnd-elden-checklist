import { Flex, Image, Spin } from "antd";
import styles from "./SubCategoryContent.module.scss";
import { Item, ItemCategory, ItemSubCategory } from "../../../global-types";
import { useAppSelector } from "../../../store/typedDispatch";
import { exceptionalSubcategories } from "../../../lib/consts";
import { findItemByName } from "../../../lib/utils/misc";

interface PreviewProps {
  hoveredItemName: string;
  dataSource: Item[];
  categoty: ItemCategory;
  subcategory: ItemSubCategory;
}

export default function Preview({
  hoveredItemName,
  dataSource,
  categoty,
  subcategory,
}: PreviewProps) {
  const { spoilers } = useAppSelector((state) => state.settings);

  const currentItem = findItemByName(dataSource, hoveredItemName);
  const { name = "Unknown Item" } = currentItem || {};

  const getImageUrl = (): string | undefined => {
    if (exceptionalSubcategories.includes(subcategory)) {
      return currentItem?.imgUrl;
    }

    if (hoveredItemName.includes(" Set")) {
      return `./images/${categoty}/placeholder.png`;
    }

    const sanitized = name.replace(/:|"/g, "");
    return `./images/${categoty}/${subcategory}/${sanitized}.png`;
  };

  return (
    <Flex className={styles.preview} vertical align="center" gap={30}>
      {hoveredItemName ? (
        <Flex vertical align="center" gap={0}>
          <span className={styles.title}>{name}</span>
          <Image
            className={
              spoilers && !currentItem?.collected ? "block-spoiler" : ""
            }
            height={600}
            src={getImageUrl()}
            alt="no image"
            placeholder={
              <div className={styles.spin}>
                <Spin size="large" />
              </div>
            }
          />
        </Flex>
      ) : (
        <div className={styles.placeholder} />
      )}
    </Flex>
  );
}
