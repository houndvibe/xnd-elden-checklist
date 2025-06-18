import { useCallback, useRef, useState } from "react";
import type {
  Item,
  ItemSubCategory,
  TalismansSubCategoryMap,
} from "../../../global-types";
import { getNameToImgUrlConverter } from "../../../lib/utils/converters";
import { useAppDispatch, useAppSelector } from "../../../store/typedDispatch";
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
import { toggleTalismanCollected } from "../../../store/collectionSlice";
import { getStoreAction } from "../../../store/actions";
import { setGlobalSearchItem } from "../../../store/serviceSlice";

export default function Table({
  setHoveredImg,
  dataSource,
  subcategory,
}: {
  setHoveredImg: React.Dispatch<
    React.SetStateAction<{
      url: string | undefined;
      name: string;
    }>
  >;
  dataSource: Item[];
  subcategory: ItemSubCategory;
}) {
  const dispatch = useAppDispatch();

  const { globalSearchItem } = useAppSelector((state) => state.service);
  console.log(globalSearchItem);

  const [sortStep, setSortStep] = useState<number>(0);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"ascend" | "descend" | null>(null);

  //debounce
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = useCallback((record: Item) => {
    const imgUrl = record.imgUrl || getNameToImgUrlConverter(record);

    if (record.name === globalSearchItem) {
      dispatch(setGlobalSearchItem(null));
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredImg({ url: imgUrl, name: record.name });
    }, 50);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  }, []);

  const columns: TableProps<Item>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "85%",
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
                        subcategory:
                          subcategory as keyof TalismansSubCategoryMap,
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
                getStoreAction({
                  name: record.name,
                  category: record.type,
                  subcategory: subcategory,
                  dispatch: dispatch,
                });
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
      rowClassName={(record) => {
        if (record.collected) return "row-collected";
        if (globalSearchItem === record.name) return "row-searchTarget";
        return "row-missing";
      }}
      onChange={onChangeTable}
      onRow={(record) => ({
        onMouseEnter: () => handleMouseEnter(record),
        onMouseLeave: () => handleMouseLeave(),
        onClick: () => {
          if (record.type === "talismans") {
            // Только если нет versions, переключаем весь talisman
            if (!("versions" in record) || record.versions?.length === 0) {
              dispatch(
                toggleTalismanCollected({
                  subcategory: subcategory as keyof TalismansSubCategoryMap,
                  name: record.name,
                })
              );
            }
          } else {
            getStoreAction({
              name: record.name,
              category: record.type,
              subcategory: subcategory,
              dispatch: dispatch,
            });
          }
        },
      })}
    />
  );
}
