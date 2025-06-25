import { Image, Typography, Divider, Space } from "antd";
import {
  ItemCategory,
  Item,
  ItemSubCategory,
  TalismansSubCategoryMap,
} from "../../global-types";

import { isArmourSet, isMultiVersionTalisman } from "../../lib/utils/misc";
import { useAppDispatch, useAppSelector } from "../../store/typedDispatch";
import { getStoreAction } from "../../store/actions";
import { toggleTalismanCollected } from "../../store/collectionSlice";
import styles from "./ItemsGrid.module.scss";
import { getSubCategoryStats } from "../../lib/utils/stats";

interface ItemsGridProps {
  selectedCategory: ItemCategory;
}

const sanitize = (str: string) => str.replace(/:|"/g, "");

const getImageUrl = (name: string, sub: string, cat: string) =>
  `./images/${cat}/${sub}/${sanitize(name)}.png`;

export default function ItemsGrid({ selectedCategory }: ItemsGridProps) {
  const dispatch = useAppDispatch();

  const categoryData = useAppSelector(
    (state) => state.collection.collectionData[`${selectedCategory}Data`]
  );

  if (!categoryData) return null;

  return (
    <div className={styles.itemsGridWrapper}>
      {(Object.entries(categoryData) as [string, Item[]][]).map(
        ([subcategoryName, items]) => {
          const { total, collected } = getSubCategoryStats(items);
          return (
            <div key={subcategoryName}>
              <Divider orientation="center" orientationMargin="0">
                <Typography.Text strong>
                  {subcategoryName + ` ${collected}/${total}`}
                </Typography.Text>
              </Divider>

              <Space wrap size={12}>
                {items.map((item) => {
                  if (isArmourSet(item)) {
                    return item.items?.map((part, i) => (
                      <Image
                        key={`${part.name}-${i}`}
                        src={getImageUrl(
                          part.name,
                          subcategoryName,
                          selectedCategory
                        )}
                        width={60}
                        height={60}
                        alt={part.name}
                        preview={false}
                        style={{
                          cursor: "pointer",
                          opacity: part.collected ? 1 : 0.3,
                          borderRadius: 4,
                          objectFit: "cover",
                        }}
                        onClick={() => {
                          getStoreAction({
                            name: part.name,
                            category: selectedCategory,
                            subcategory: subcategoryName as ItemSubCategory,
                            dispatch,
                          });
                        }}
                      />
                    ));
                  }

                  if (isMultiVersionTalisman(item)) {
                    return item.versions.map((version, i) => {
                      const versionName = `${item.name}${
                        version.tier > 0 ? ` +${version.tier}` : ""
                      }`;

                      return (
                        <Image
                          key={`${versionName}-${i}`}
                          src={getImageUrl(
                            versionName,
                            subcategoryName,
                            selectedCategory
                          )}
                          width={60}
                          height={60}
                          alt={versionName}
                          preview={false}
                          style={{
                            cursor: "pointer",
                            opacity: version.collected ? 1 : 0.3,
                            borderRadius: 4,
                            objectFit: "cover",
                          }}
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
                      );
                    });
                  }
                  return (
                    <Image
                      key={`${item.name}-0`}
                      src={getImageUrl(
                        item.name,
                        subcategoryName,
                        selectedCategory
                      )}
                      width={60}
                      height={60}
                      alt={item.name}
                      preview={false}
                      style={{
                        cursor: "pointer",
                        opacity: item.collected ? 1 : 0.3,
                        borderRadius: 4,
                        objectFit: "cover",
                      }}
                      onClick={() => {
                        getStoreAction({
                          name: item.name,
                          category: selectedCategory,
                          subcategory: subcategoryName as ItemSubCategory,
                          dispatch,
                        });
                      }}
                    />
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
