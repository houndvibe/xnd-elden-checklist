import { Flex, Image, Spin } from "antd";
import styles from "./SubCategoryContent.module.scss";
import { Item, ItemCategory, ItemSubCategory } from "../../../global-types";
import { useAppSelector } from "../../../store/typedDispatch";
import { exceptionalSubcategories } from "../../../lib/consts";
import {
  findItemByName,
  isArmourSet,
  isMultiVersionTalisman,
} from "../../../lib/utils/misc";

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
  const { name = "..." } = currentItem || {};

  const getImageUrls = (): string[] => {
    if (!currentItem) return [];

    if (exceptionalSubcategories.includes(subcategory)) {
      return currentItem.imgUrl ? [currentItem.imgUrl] : [];
    }

    const sanitize = (str: string) => str.replace(/:|"/g, "");

    if (isArmourSet(currentItem)) {
      const [firstItem] = currentItem.items;
      return firstItem
        ? [
            `./images/${categoty}/${subcategory}/${sanitize(
              firstItem.name
            )}.png`,
          ]
        : [];
    }

    if (isMultiVersionTalisman(currentItem)) {
      return currentItem.versions.map((version) => {
        const versionName = `${name}${
          version.tier > 0 ? " +" + version.tier : ""
        }`;
        return `./images/${categoty}/${subcategory}/${sanitize(
          versionName
        )}.png`;
      });
    }

    return [`./images/${categoty}/${subcategory}/${sanitize(name)}.png`];
  };

  const imageUrls = getImageUrls();

  const getImgSize = () => {
    if (!isMultiVersionTalisman(currentItem!)) return 600;
    if (currentItem.versions.length == 2) return 330;
    if (currentItem.versions.length >= 2) return 300;
  };

  return (
    <Flex className={styles.preview} vertical align="center" gap={30}>
      {hoveredItemName ? (
        <Flex vertical align="center" gap={10}>
          <span className={styles.title}>{name}</span>
          <Flex wrap="wrap" justify="center" gap={12}>
            {imageUrls.map((url, index) => (
              <>
                <Image
                  style={{ marginTop: imageUrls.length == 2 ? "30%" : 0 }}
                  key={index}
                  width={getImgSize()}
                  className={
                    spoilers && !currentItem?.collected ? "block-spoiler" : ""
                  }
                  src={url}
                  alt={`version-${index}`}
                  placeholder={
                    <div className={styles.spin}>
                      <Spin size="large" />
                    </div>
                  }
                />
                <span
                  style={{
                    fontSize: 30,
                  }}
                >
                  {index > 0 && `+${index}`}
                </span>
              </>
            ))}
          </Flex>
        </Flex>
      ) : (
        <div className={styles.placeholder} />
      )}
    </Flex>
  );
}
