import { Image, Divider, Space, Spin, Popover, Flex } from "antd";
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
import { useNavigate } from "react-router-dom";
import { navigateToItem } from "../../lib/utils/search";
import { setFastcheck } from "../../store/settingsSlice";
import Link from "antd/es/typography/Link";
import { LinkOutlined } from "@ant-design/icons";
import { version } from "react";
import { isTablet } from "react-device-detect";
interface ItemsGridProps {
  selectedCategory: ItemCategory;
  imgSize: number;
  searchValue: string;
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

export default function ItemsGrid({
  selectedCategory,
  imgSize,
  searchValue,
}: ItemsGridProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const categoryData = useAppSelector(
    (state) => state.collection.collectionData[`${selectedCategory}Data`]
  );

  const spoilers = useAppSelector((state) => state.settings.spoilers);

  if (!categoryData) return null;

  const spin = (
    <Flex align="center" justify="center">
      <Spin size="small" />
    </Flex>
  );

  return (
    <div className={styles.itemsGridWrapper}>
      {(Object.entries(categoryData) as [string, Item[]][]).map(
        ([subcategoryName, items]) => {
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

              <Space align="center" wrap>
                {filteredItems.map((item) => {
                  const renderLinkWithIcon = (label: string, href: string) => (
                    <Flex
                      align="center"
                      gap={10}
                      className={styles.popoverTitle}
                    >
                      <Link className={styles.popoverLink} href={href}>
                        {label}
                      </Link>
                      <LinkOutlined />
                    </Flex>
                  );

                  const renderImageWithHoverOverlay = (
                    src: string,
                    alt: string,
                    onClick: () => void
                  ) => (
                    <div
                      className={styles.popoverImageWrapper}
                      onClick={onClick}
                      style={{ cursor: "pointer" }}
                    >
                      <Image
                        className={styles.popoverImage}
                        preview={false}
                        width={500}
                        height={500}
                        src={src}
                        alt={alt}
                      />
                    </div>
                  );

                  if (isArmourSet(item)) {
                    return item.items?.flatMap((part) => {
                      const allVariants = [part, ...(part.children ?? [])];

                      return allVariants.map((variant) => {
                        const isAltered = variant !== part;
                        const variantName = variant.name;
                        const translatedName = t(selectedCategory, variantName);
                        const link =
                          isAltered && variant.link ? variant.link : part.link;

                        return (
                          <Popover
                            key={variantName}
                            mouseEnterDelay={0.5}
                            content={
                              isTablet ? null : (
                                <Flex vertical gap={10} align="center">
                                  {renderLinkWithIcon(translatedName, link)}
                                  {renderImageWithHoverOverlay(
                                    getImageUrl(
                                      variant,
                                      subcategoryName,
                                      selectedCategory
                                    ),
                                    variantName,
                                    () => {
                                      dispatch(setFastcheck(false));
                                      navigateToItem(
                                        variantName,
                                        dispatch,
                                        navigate
                                      );
                                    }
                                  )}
                                </Flex>
                              )
                            }
                          >
                            <div
                              className={
                                spoilers && !variant.collected
                                  ? styles.blockSpoiler
                                  : ""
                              }
                            >
                              <Image
                                placeholder={spin}
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
                                alt={variantName}
                                preview={false}
                                onClick={() => {
                                  getStoreAction({
                                    name: variantName,
                                    category: selectedCategory,
                                    subcategory:
                                      subcategoryName as ItemSubCategory,
                                    dispatch,
                                  });
                                }}
                              />
                            </div>
                          </Popover>
                        );
                      });
                    });
                  }

                  if (isMultiVersionTalisman(item)) {
                    return item.versions.map((version) => {
                      const versionName = `${item.name}${
                        version.tier > 0 ? ` +${version.tier}` : ""
                      }`;
                      const displayName = version.tier
                        ? `${t(selectedCategory, item.name)} +${version.tier}`
                        : t(selectedCategory, item.name);
                      const link = version.tier
                        ? `${item.link}+${version.tier}`
                        : item.link;

                      return (
                        <Popover
                          key={versionName}
                          mouseEnterDelay={0.5}
                          content={
                            isTablet ? null : (
                              <Flex vertical gap={10} align="center">
                                {renderLinkWithIcon(displayName, link)}
                                {renderImageWithHoverOverlay(
                                  getImageUrl(
                                    item,
                                    subcategoryName,
                                    selectedCategory,
                                    versionName
                                  ),
                                  versionName,
                                  () => {
                                    dispatch(setFastcheck(false));
                                    navigateToItem(
                                      item.name,
                                      dispatch,
                                      navigate
                                    );
                                  }
                                )}
                              </Flex>
                            )
                          }
                        >
                          <div
                            className={
                              spoilers && !version.collected
                                ? styles.blockSpoiler
                                : ""
                            }
                          >
                            <Image
                              placeholder={spin}
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
                          </div>
                        </Popover>
                      );
                    });
                  }

                  return (
                    <Popover
                      key={item.name}
                      mouseEnterDelay={0.5}
                      content={
                        isTablet ? null : (
                          <Flex vertical gap={10} align="center">
                            {renderLinkWithIcon(
                              t(selectedCategory, item.name),
                              item.link
                            )}
                            {renderImageWithHoverOverlay(
                              getImageUrl(
                                item,
                                subcategoryName,
                                selectedCategory
                              ),
                              item.name,
                              () => {
                                dispatch(setFastcheck(false));
                                navigateToItem(version, dispatch, navigate);
                              }
                            )}
                          </Flex>
                        )
                      }
                    >
                      <div
                        className={
                          spoilers && !item.collected ? styles.blockSpoiler : ""
                        }
                      >
                        <Image
                          placeholder={spin}
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
                      </div>
                    </Popover>
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
