import { Image, Divider, Spin, Popover, Flex } from "antd";
import {
  ItemCategory,
  Item,
  ItemSubCategory,
  TalismansSubCategoryMap,
} from "../../global-types";

import {
  isArmourSet,
  isMultiVersionTalisman,
  normalizeText,
  toTitleCaseFromCamel,
  /*   truncateString, */
} from "../../lib/utils/misc";
import { useAppDispatch, useAppSelector } from "../../store/typedDispatch";
import { getStoreAction } from "../../store/actions";
import { toggleTalismanCollected } from "../../store/collectionSlice";
import styles from "./ItemsGrid.module.scss";
import { getSubCategoryStats } from "../../lib/utils/stats";
import {
  APP_PALETTE,
  exceptionalSubcategories,
  FASTCHECK_SIZE_S,
  /*   FASTCHECK_SIZE_L,
  FASTCHECK_SIZE_M,
  FASTCHECK_SIZE_XL, */
} from "../../lib/consts";
import { t } from "../../i18n";
import { useNavigate } from "react-router-dom";
import { navigateToItem } from "../../lib/utils/search";
import { setFastcheck } from "../../store/settingsSlice";
import Link from "antd/es/typography/Link";
import { LinkOutlined } from "@ant-design/icons";
import { isTablet } from "react-device-detect";
import { ArmorFilter } from "./FastCheck";
interface ItemsGridProps {
  selectedCategory: ItemCategory;
  imgSize: number;
  searchValue: string;
  pieceTypeFilters: ArmorFilter;
}

const mouseEnterDelay = 1;

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

  return `./images_resized/${cat}/${sub}/${sanitize(
    versionName ? versionName : item.name
  )}.png`;
};

export default function ItemsGrid({
  selectedCategory,
  imgSize,
  searchValue,
  pieceTypeFilters,
}: ItemsGridProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const categoryData = useAppSelector(
    (state) => state.collection.collectionData[`${selectedCategory}Data`]
  );
  const { checkDlc, checkedSubcategories, altArmor, loosable } = useAppSelector(
    (state) => state.settings
  );

  const spoilers = useAppSelector((state) => state.settings.spoilers);
  const showFCNames = useAppSelector((state) => state.settings.showFCNames);
  const subcategorySeenPartNames = new Map<string, Set<string>>();

  const collectedStyle =
    imgSize > FASTCHECK_SIZE_S
      ? styles.itemImgCollected
      : styles.itemImgCollectedSmall;

  const dlcStyle =
    imgSize > FASTCHECK_SIZE_S ? styles.dlcOverlay : styles.dlcOverlaySmall;

  if (!categoryData) return null;

  const spin = (
    <Flex align="center" justify="center">
      <Spin className={styles.spin} size="small" />
    </Flex>
  );

  const getNameBlock = (name: string, collected: boolean, link: string) => {
    /*     const getTruncSize = () => {
      switch (imgSize) {
        case FASTCHECK_SIZE_S:
          return 5;
        case FASTCHECK_SIZE_M:
          return 12;
        case FASTCHECK_SIZE_L:
          return 19;
        case FASTCHECK_SIZE_XL:
          return 33;
        default:
          return 10;
      }
    }; */
    return showFCNames && imgSize > 40 ? (
      <>
        <Divider size="small" />
        <Link href={link} className={styles.lnk}>
          <span
            className={`${styles.linkText} ${
              collected ? styles.collected : ""
            }`}
          >
            {t(selectedCategory, name)}
          </span>
        </Link>

        <Divider size="small" />
      </>
    ) : (
      <></>
    );
  };

  return (
    <div className={styles.itemsGridWrapper}>
      {(Object.entries(categoryData) as [string, Item[]][]).map(
        ([subcategoryName, items]) => {
          const sorted = [...items].sort(
            (a, b) => Number(a.dlc) - Number(b.dlc)
          );
          const filteredItems = sorted
            .sort((a, b) => Number(a.dlc) - Number(b.dlc))
            .filter((item) => (checkDlc ? item : !item.dlc))
            .filter((item) => (loosable ? item : !item.loosable))
            .filter(() => checkedSubcategories.includes(subcategoryName))
            .filter((item) => {
              const targetNames = [item.name];

              if (isArmourSet(item)) {
                item.items?.forEach((part) => {
                  targetNames.push(part.name);
                  part.children?.forEach((child) =>
                    targetNames.push(child.name)
                  );
                });
              }

              if (isMultiVersionTalisman(item)) {
                item.versions.forEach((v) => {
                  targetNames.push(
                    `${item.name}${v.tier > 0 ? ` +${v.tier}` : ""}`
                  );
                });
              }

              const matchesSearch = targetNames.some((name) =>
                normalizeText(t(selectedCategory, name)).includes(
                  normalizeText(searchValue)
                )
              );

              if (
                isArmourSet(item) &&
                Object.values(pieceTypeFilters).some((v) => !v)
              ) {
                const hasPieceMatchingFilter = item.items?.some(
                  (part) =>
                    pieceTypeFilters[part.pieceType as keyof ArmorFilter] ||
                    part.children?.some(
                      (child) =>
                        pieceTypeFilters[child.pieceType as keyof ArmorFilter]
                    )
                );

                return matchesSearch && hasPieceMatchingFilter;
              }

              return matchesSearch;
            });

          if (filteredItems.length === 0) return null;

          const { total, collected } = getSubCategoryStats(
            filteredItems,
            checkDlc,
            altArmor,
            loosable
          );

          return (
            <div key={subcategoryName}>
              <Divider size="small" orientation="center" orientationMargin="0">
                {t("misc", toTitleCaseFromCamel(subcategoryName))}
                <span
                  style={{ color: APP_PALETTE.textPrimary }}
                >{` ${collected}/${total}`}</span>
              </Divider>

              {!subcategorySeenPartNames.has(subcategoryName) &&
                void subcategorySeenPartNames.set(
                  subcategoryName,
                  new Set<string>()
                )}

              <div className={styles[`gridWrapper${imgSize}`]}>
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
                    const seenPartNamesForSubcategory =
                      subcategorySeenPartNames.get(subcategoryName) ||
                      new Set<string>();

                    return item.items?.flatMap((part) => {
                      if (seenPartNamesForSubcategory.has(part.name)) return [];
                      seenPartNamesForSubcategory.add(part.name);
                      const allVariants = [
                        part,
                        ...(part.children && altArmor ? part.children : []),
                      ];

                      return allVariants
                        .filter((i) =>
                          normalizeText(t(selectedCategory, i.name)).includes(
                            normalizeText(searchValue)
                          )
                        )
                        .filter(
                          (piece) =>
                            pieceTypeFilters[
                              piece.pieceType as keyof ArmorFilter
                            ]
                        )
                        .map((variant) => {
                          const isAltered = variant !== part;
                          const variantName = variant.name;
                          const translatedName = t(
                            selectedCategory,
                            variantName
                          );
                          const link =
                            isAltered && variant.link
                              ? variant.link
                              : part.link;

                          return (
                            <Popover
                              styles={{
                                body: {
                                  borderRadius: 30,
                                  border: `1px solid ${APP_PALETTE.bgDark}`,
                                },
                              }}
                              key={variantName}
                              mouseEnterDelay={mouseEnterDelay}
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
                                <Flex
                                  vertical
                                  justify="center"
                                  align="center"
                                  className={item.dlc ? dlcStyle : ""}
                                >
                                  <Image
                                    placeholder={spin}
                                    className={
                                      variant.collected
                                        ? collectedStyle
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
                                  {getNameBlock(
                                    translatedName,
                                    variant.collected,
                                    variant.link
                                  )}
                                </Flex>
                              </div>
                            </Popover>
                          );
                        });
                    });
                  }

                  if (isMultiVersionTalisman(item)) {
                    return item.versions
                      .filter((version) => (checkDlc ? version : !version.dlc))
                      .map((version) => {
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
                            styles={{
                              body: {
                                borderRadius: 30,
                                border: `1px solid ${APP_PALETTE.bgDark}`,
                              },
                            }}
                            key={versionName}
                            mouseEnterDelay={mouseEnterDelay}
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
                              <Flex
                                vertical
                                justify="center"
                                align="center"
                                className={version.dlc ? dlcStyle : ""}
                              >
                                <Image
                                  placeholder={spin}
                                  className={
                                    version.collected
                                      ? collectedStyle
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
                                {getNameBlock(
                                  displayName,
                                  version.collected,
                                  link
                                )}
                              </Flex>
                            </div>
                          </Popover>
                        );
                      });
                  }

                  return (
                    <Popover
                      styles={{
                        body: {
                          borderRadius: 30,
                          border: `1px solid ${APP_PALETTE.bgLight}`,
                          backgroundColor: "rgba(20, 20, 20, 0.91)",
                        },
                      }}
                      key={item.name}
                      mouseEnterDelay={mouseEnterDelay}
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
                                navigateToItem(item.name, dispatch, navigate);
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
                        <Flex
                          vertical
                          justify="center"
                          align="center"
                          className={item.dlc ? dlcStyle : ""}
                        >
                          <Image
                            placeholder={spin}
                            className={
                              item.collected ? collectedStyle : styles.itemImg
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
                          {getNameBlock(item.name, item.collected, item.link)}
                        </Flex>
                      </div>
                    </Popover>
                  );
                })}
              </div>
            </div>
          );
        }
      )}
    </div>
  );
}
