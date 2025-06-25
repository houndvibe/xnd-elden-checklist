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
import { t } from "../../../i18n";
import { isTablet } from "react-device-detect";
import Link from "antd/es/typography/Link";
interface PreviewProps {
  hoveredItemName: string;
  dataSource: Item[];
  categoty: ItemCategory;
  subcategory: ItemSubCategory;
}
import { LinkOutlined } from "@ant-design/icons";

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
    if (isTablet && isMultiVersionTalisman(currentItem!)) return 250;
    if (!isMultiVersionTalisman(currentItem!)) return 600;
    if (currentItem.versions.length == 2) return 330;
    if (currentItem.versions.length > 2) return 300;
  };

  return (
    <Flex className={styles.preview} vertical align="center" gap={30}>
      {currentItem ? (
        <Flex vertical align="center" gap={10}>
          {isTablet ? (
            <Link
              href={currentItem.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className={styles.title}>{t(currentItem.type, name)}</span>{" "}
              <LinkOutlined />
            </Link>
          ) : (
            <span className={styles.title}>{t(currentItem.type, name)}</span>
          )}

          <Flex wrap="wrap" justify="center" gap={12}>
            {imageUrls.map((url, index) => (
              <>
                <Image
                  preview={!isTablet}
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
