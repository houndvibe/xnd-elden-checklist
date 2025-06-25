import {
  Image,
  Divider,
  Space,
  Select,
  Tooltip,
  Input,
  Flex,
  Spin,
} from "antd";
import {
  ItemCategory,
  Item,
  ItemSubCategory,
  TalismansSubCategoryMap,
} from "../../global-types";

import {
  isArmourSet,
  isMultiVersionTalisman,
  toTitleCaseFromCamel,
} from "../../lib/utils/misc";
import { useAppDispatch, useAppSelector } from "../../store/typedDispatch";
import { getStoreAction } from "../../store/actions";
import { toggleTalismanCollected } from "../../store/collectionSlice";
import styles from "./ItemsGrid.module.scss";
import { getSubCategoryStats } from "../../lib/utils/stats";
import { APP_PALETTE, exceptionalSubcategories } from "../../lib/consts";
import { t } from "../../i18n";
import { useState } from "react";

const { Option } = Select;

interface ItemsGridProps {
  selectedCategory: ItemCategory;
}

const sanitize = (str: string) => str.replace(/:|"/g, "");

const getImageUrl = (
  item: Item,
  sub: string,
  cat: string,
  versionName?: string
) => {
  if (exceptionalSubcategories.includes(sub)) {
    return item.imgUrl ? item.imgUrl : "";
  }

  return `./images/${cat}/${sub}/${sanitize(
    versionName ? versionName : item.name
  )}.png`;
};

export default function ItemsGrid({ selectedCategory }: ItemsGridProps) {
  const dispatch = useAppDispatch();
  const [imgSize, setImgSize] = useState(60);
  const [searchValue, setSearchValue] = useState("");

  const categoryData = useAppSelector(
    (state) => state.collection.collectionData[`${selectedCategory}Data`]
  );

  if (!categoryData) return null;

  return (
    <div className={styles.itemsGridWrapper}>
      <Flex gap={12} style={{ marginBottom: 16 }} wrap="wrap">
        <Select
          defaultValue={imgSize}
          style={{ width: 140 }}
          onChange={setImgSize}
        >
          <Option value={40}>{t("misc", "Small")}</Option>
          <Option value={60}>{t("misc", "Medium")}</Option>
          <Option value={80}>{t("misc", "Big")}</Option>
          <Option value={160}>{t("misc", "Large")}</Option>
        </Select>

        <Input
          allowClear
          placeholder={t("misc", "Filter by name...")}
          style={{ width: 240 }}
          value={searchValue}
          size="small"
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </Flex>
      {(Object.entries(categoryData) as [string, Item[]][]).map(
        ([subcategoryName, items]) => {
          // фильтруем по вводу
          const filteredItems = items.filter((item) => {
            const targetNames = [item.name];

            if (isArmourSet(item)) {
              item.items?.forEach((part) => targetNames.push(part.name));
            }

            if (isMultiVersionTalisman(item)) {
              item.versions.forEach((v) => {
                targetNames.push(
                  `${item.name}${v.tier > 0 ? ` +${v.tier}` : ""}`
                );
              });
            }

            return targetNames.some((name) =>
              t(selectedCategory, name)
                .toLowerCase()
                .includes(searchValue.toLowerCase())
            );
          });

          if (filteredItems.length === 0) return null;

          const { total, collected } = getSubCategoryStats(filteredItems);

          return (
            <div key={subcategoryName}>
              <Divider size="small" orientation="center" orientationMargin="0">
                {t("misc", toTitleCaseFromCamel(subcategoryName))}
                <span
                  style={{ color: APP_PALETTE.textPrimary }}
                >{` ${collected}/${total}`}</span>
              </Divider>

              <Space wrap size={12}>
                {filteredItems.map((item) => {
                  if (isArmourSet(item)) {
                    return item.items?.flatMap((part) => {
                      const allVariants = [part, ...(part.children ?? [])];

                      return allVariants.map((variant) => (
                        <Tooltip
                          title={t(selectedCategory, variant.name)}
                          key={variant.name}
                        >
                          <Image
                            placeholder={
                              <div>
                                <Spin size="small" />
                              </div>
                            }
                            className={
                              variant.collected
                                ? styles.itemImgCollected
                                : styles.itemImg
                            }
                            src={getImageUrl(
                              variant,
                              subcategoryName,
                              selectedCategory
                            )}
                            width={imgSize}
                            height={imgSize}
                            alt={variant.name}
                            preview={false}
                            onClick={() => {
                              getStoreAction({
                                name: variant.name,
                                category: selectedCategory,
                                subcategory: subcategoryName as ItemSubCategory,
                                dispatch,
                              });
                            }}
                          />
                        </Tooltip>
                      ));
                    });
                  }

                  if (isMultiVersionTalisman(item)) {
                    return item.versions.map((version) => {
                      const versionName = `${item.name}${
                        version.tier > 0 ? ` +${version.tier}` : ""
                      }`;

                      return (
                        <Tooltip
                          title={
                            version.tier
                              ? `${t(selectedCategory, item.name)} +${
                                  version.tier
                                }`
                              : t(selectedCategory, item.name)
                          }
                          key={versionName}
                        >
                          <Image
                            placeholder={
                              <div>
                                <Spin size="small" />
                              </div>
                            }
                            className={
                              version.collected
                                ? styles.itemImgCollected
                                : styles.itemImg
                            }
                            src={getImageUrl(
                              item,
                              subcategoryName,
                              selectedCategory,
                              versionName
                            )}
                            width={imgSize}
                            height={imgSize}
                            alt={versionName}
                            preview={false}
                            onClick={() => {
                              dispatch(
                                toggleTalismanCollected({
                                  subcategory:
                                    subcategoryName as keyof TalismansSubCategoryMap,
                                  name: item.name,
                                  tier: version.tier,
                                })
                              );
                            }}
                          />
                        </Tooltip>
                      );
                    });
                  }

                  return (
                    <Tooltip
                      title={t(selectedCategory, item.name)}
                      key={item.name}
                    >
                      <Image
                        placeholder={
                          <div>
                            <Spin size="small" />
                          </div>
                        }
                        className={
                          item.collected
                            ? styles.itemImgCollected
                            : styles.itemImg
                        }
                        src={getImageUrl(
                          item,
                          subcategoryName,
                          selectedCategory
                        )}
                        width={imgSize}
                        height={imgSize}
                        alt={item.name}
                        preview={false}
                        onClick={() => {
                          getStoreAction({
                            name: item.name,
                            category: selectedCategory,
                            subcategory: subcategoryName as ItemSubCategory,
                            dispatch,
                          });
                        }}
                      />
                    </Tooltip>
                  );
                })}
              </Space>
            </div>
          );
        }
      )}
    </div>
  );
}
