import { useState } from "react";
import type {
  AshesOfWarSubCategoryMap,
  GesturesSubCategoryMap,
  IncantationsSubCategoryMap,
  Item,
  ItemSubCategory,
  MeleWeaponsSubCategoryMap,
  ShieldSubCategoryMap,
  SorceriesSubCategoryMap,
  SpiritAshesSubCategoryMap,
  TalismansSubCategoryMap,
} from "../../../global-types";
import {
  convertAshOfWarNameToWikiImageUrl,
  convertGestureNameToWikiImageUrl,
  convertIncantationNameToWikiImageUrl,
  convertMeleWeaponNameToWikiImageUrl,
  convertShieldNameToWikiImageUrl,
  convertSorceryNameToWikiImageUrl,
  convertSpiritNameToWikiImageUrl,
  convertTalismanNameToWikiImageUrl,
} from "../../../lib/utils/converters";
import { useAppDispatch } from "../../../store/typedDispatch";
import { CheckOutlined } from "@ant-design/icons";

import styles from "./SubCategoryContent.module.scss";
import {
  Table as AntdTable,
  Checkbox,
  Flex,
  Image,
  Tooltip,
  type TablePaginationConfig,
  type TableProps,
} from "antd";
import { getNextSortStep, smartNameSort } from "../../../lib/utils/sorters";
import { checkIsLegendary, hasVersionsProperty } from "../../../lib/utils/misc";
import { APP_PALETTE } from "../../../lib/consts";
import Link from "antd/es/typography/Link";
import type {
  FilterValue,
  SorterResult,
  SortOrder,
} from "antd/es/table/interface";
import { ThunderboltTwoTone } from "@ant-design/icons";
import dlcIcon from "../../../assets/dlc-icon.png";
import {
  toggleAshOfWarCollected,
  toggleGestureCollected,
  toggleIncantationCollected,
  toggleMeleWeaponCollected,
  toggleShieldCollected,
  toggleSorceryCollected,
  toggleSpiritAshCollected,
  toggleTalismanCollected,
} from "../../../store/collectionSlice";

export default function Table({
  setHoveredImg,
  dataSource,
  category,
}: {
  setHoveredImg: React.Dispatch<React.SetStateAction<string | undefined>>;
  dataSource: Item[];
  category: ItemSubCategory;
}) {
  const dispatch = useAppDispatch();

  const [sortStep, setSortStep] = useState<number>(0);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"ascend" | "descend" | null>(null);

  const columns: TableProps<Item>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "90%",
      sortOrder: sortColumn === "name" ? "ascend" : null,
      sorter: (a, b) => smartNameSort(sortStep, a, b),
      render: (value, record) => {
        return (
          <Flex gap={10}>
            {checkIsLegendary(record) ? (
              <>
                <Tooltip title={"Legendary Item"}>
                  <ThunderboltTwoTone twoToneColor={APP_PALETTE.textPrimary} />
                </Tooltip>
                <Link
                  href={record.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className={styles.legendary}>{value}</div>
                </Link>
              </>
            ) : (
              <Link
                href={record.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                <span className={styles.link}>{value}</span>
              </Link>
            )}
            {record.dlc && (
              <Tooltip title={"Shadow of the Erdtree Dlc content"}>
                <Image src={dlcIcon} height={20} />
              </Tooltip>
            )}
          </Flex>
        );
      },
    },
    {
      title: <CheckOutlined />,
      dataIndex: "collected",
      key: "collected",
      width: "60%",
      sortOrder: sortColumn === "collected" ? sortOrder : null,
      sorter: (a, b) =>
        a.collected === b.collected ? 0 : a.collected ? -1 : 1,
      render: (_value: boolean, record: Item) => {
        return hasVersionsProperty(record) ? (
          <Flex vertical gap={1}>
            {record.versions.map((item) => (
              <Flex key={item.tier} align="center" gap={4}>
                <Checkbox
                  checked={item.collected}
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(
                      toggleTalismanCollected({
                        category: category as keyof TalismansSubCategoryMap,
                        name: record.name,
                        tier: item.tier,
                      })
                    );
                  }}
                />
                {item.legendary ? (
                  <>
                    <div className={styles.legendary}>
                      {item.tier > 0 && `+${item.tier}`}
                    </div>
                    <Tooltip title={"Legendary Item"}>
                      <ThunderboltTwoTone
                        twoToneColor={APP_PALETTE.textPrimary}
                      />
                    </Tooltip>
                  </>
                ) : (
                  item.tier > 0 && `+${item.tier}`
                )}

                {item.dlc && (
                  <Tooltip title={"Shadow of the Erdtree Dlc content"}>
                    <Image src={dlcIcon} height={12} preview={false} />
                  </Tooltip>
                )}
              </Flex>
            ))}
          </Flex>
        ) : (
          <Flex gap={5} align="baseline">
            <Checkbox
              checked={record.collected}
              onClick={(e) => {
                e.stopPropagation();
                if (record.type === "shields") {
                  dispatch(
                    toggleShieldCollected({
                      category: category as keyof ShieldSubCategoryMap,
                      name: record.name,
                    })
                  );
                } else if (record.type === "spiritAshes") {
                  dispatch(
                    toggleSpiritAshCollected({
                      category: category as keyof SpiritAshesSubCategoryMap,
                      name: record.name,
                    })
                  );
                } else if (record.type === "talismans") {
                  dispatch(
                    toggleTalismanCollected({
                      category: category as keyof TalismansSubCategoryMap,
                      name: record.name,
                    })
                  );
                } else if (record.type === "sorceries") {
                  dispatch(
                    toggleSorceryCollected({
                      category: category as keyof SorceriesSubCategoryMap,
                      name: record.name,
                    })
                  );
                } else if (record.type === "ashesOfWar") {
                  dispatch(
                    toggleAshOfWarCollected({
                      category: category as keyof AshesOfWarSubCategoryMap,
                      name: record.name,
                    })
                  );
                } else if (record.type === "incantations") {
                  dispatch(
                    toggleIncantationCollected({
                      category: category as keyof IncantationsSubCategoryMap,
                      name: record.name,
                    })
                  );
                } else if (record.type === "gestures") {
                  dispatch(
                    toggleGestureCollected({
                      category: category as keyof GesturesSubCategoryMap,
                      name: record.name,
                    })
                  );
                } else if (record.type === "meleWeapons") {
                  dispatch(
                    toggleMeleWeaponCollected({
                      category: category as keyof MeleWeaponsSubCategoryMap,
                      name: record.name,
                    })
                  );
                }
              }}
            />
          </Flex>
        );
      },
    },
  ];

  function onChangeTable(
    _pagination: TablePaginationConfig,
    _filters: Record<string, FilterValue | null>,
    sorter: SorterResult<Item> | SorterResult<Item>[]
  ) {
    const currentSorter = Array.isArray(sorter) ? sorter[0] : sorter;

    if (currentSorter.columnKey === "name") {
      setSortStep((prev) => getNextSortStep(dataSource, prev));
      setSortColumn("name");
      setSortOrder("ascend");
    } else if (currentSorter.columnKey === "collected") {
      setSortStep(0);
      setSortColumn("collected");
      setSortOrder((currentSorter.order ?? null) as SortOrder);
    } else {
      setSortStep(0);
      setSortColumn(null);
      setSortOrder(null);
    }
  }

  return (
    <AntdTable
      className={styles.table}
      columns={columns}
      dataSource={dataSource}
      pagination={false}
      size="small"
      rowKey="name"
      rowClassName={(record) =>
        record.collected ? "row-collected" : "row-missing"
      }
      onChange={onChangeTable}
      onRow={(record) => ({
        onMouseEnter: () => {
          let imgUrl;

          if (record.imgUrl) {
            imgUrl = record.imgUrl;
          } else {
            switch (record.type) {
              case "shields":
                imgUrl = convertShieldNameToWikiImageUrl(
                  record.name,
                  record.dlc
                );
                break;
              case "spiritAshes":
                imgUrl = convertSpiritNameToWikiImageUrl(
                  record.name,
                  record.dlc
                );
                break;
              case "talismans":
                imgUrl = convertTalismanNameToWikiImageUrl(
                  record.name,
                  record.dlc
                );
                break;
              case "ashesOfWar":
                imgUrl = convertAshOfWarNameToWikiImageUrl(
                  record.name,
                  record.dlc
                );
                break;
              case "sorceries":
                imgUrl = convertSorceryNameToWikiImageUrl(
                  record.name,
                  record.dlc
                );
                break;
              case "incantations":
                imgUrl = convertIncantationNameToWikiImageUrl(
                  record.name,
                  record.dlc
                );
                break;
              case "gestures":
                imgUrl = convertGestureNameToWikiImageUrl(
                  record.name,
                  record.dlc
                );
                break;
              case "meleWeapons":
                console.log(record);
                imgUrl = convertMeleWeaponNameToWikiImageUrl(
                  record.name,
                  record.dlc,
                  //TODO сюда надо добавить сабкатегорию
                  "dagger"
                );
                break;
            }
          }

          setHoveredImg(imgUrl);
        },
        onClick: () => {
          if (record.type === "shields") {
            dispatch(
              toggleShieldCollected({
                category: category as keyof ShieldSubCategoryMap,
                name: record.name,
              })
            );
          } else if (record.type === "spiritAshes") {
            dispatch(
              toggleSpiritAshCollected({
                category: category as keyof SpiritAshesSubCategoryMap,
                name: record.name,
              })
            );
          } else if (record.type === "ashesOfWar") {
            dispatch(
              toggleAshOfWarCollected({
                category: category as keyof AshesOfWarSubCategoryMap,
                name: record.name,
              })
            );
          } else if (record.type === "talismans") {
            // Только если нет versions, переключаем весь talisman
            if (!("versions" in record) || record.versions?.length === 0) {
              dispatch(
                toggleTalismanCollected({
                  category: category as keyof TalismansSubCategoryMap,
                  name: record.name,
                })
              );
            }
            // Ничего не делаем при клике по строке, если есть versions
          } else if (record.type === "sorceries") {
            dispatch(
              toggleSorceryCollected({
                category: category as keyof SorceriesSubCategoryMap,
                name: record.name,
              })
            );
          } else if (record.type === "incantations") {
            dispatch(
              toggleIncantationCollected({
                category: category as keyof IncantationsSubCategoryMap,
                name: record.name,
              })
            );
          } else if (record.type === "gestures") {
            dispatch(
              toggleGestureCollected({
                category: category as keyof GesturesSubCategoryMap,
                name: record.name,
              })
            );
          } else if (record.type === "meleWeapons") {
            dispatch(
              toggleMeleWeaponCollected({
                category: category as keyof MeleWeaponsSubCategoryMap,
                name: record.name,
              })
            );
          }
        },
      })}
    />
  );
}
