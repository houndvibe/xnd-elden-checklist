import type {
  ArmourSubCategoryMap,
  Item,
  ItemSubCategory,
} from "../../../global-types";
import {
  convertArmourItemNameToWikiImageUrl,
  getNameToImgUrlConverter,
} from "../../../lib/utils/converters";
import { useAppDispatch } from "../../../store/typedDispatch";
import { CheckOutlined, ThunderboltTwoTone } from "@ant-design/icons";

import styles from "./SubCategoryContent.module.scss";
import {
  Table as AntdTable,
  Checkbox,
  Flex,
  Image,
  Tooltip,
  type TableProps,
} from "antd";
import Link from "antd/es/typography/Link";
import dlcIcon from "../../../assets/dlc-icon.png";
import { getStoreAction } from "../../../store/actions";
import { checkIsLegendary } from "../../../lib/utils/misc";
import { APP_PALETTE } from "../../../lib/consts";
import { toggleArmourItemCollected } from "../../../store/collectionSlice";
import { useState } from "react";
import { getNextSortStep, smartNameSort } from "../../../lib/utils/sorters";
import {
  FilterValue,
  SorterResult,
  SortOrder,
  TablePaginationConfig,
} from "antd/es/table/interface";

export default function HierarchyTable({
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
        return (
          <Flex gap={5} align="baseline">
            <Checkbox
              checked={record.collected}
              onClick={(e) => {
                /*   console.log(record); */
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
      rowKey={(item) => item.name}
      onChange={onChangeTable}
      expandable={{
        expandedRowRender: (record) => {
          if ("items" in record) {
            const parts = Object.entries(record.items)
              .filter(([_, piece]) => piece !== null)
              .map(([partName, piece]) => ({
                key: `${record.name}-${partName}`,
                ...piece!,
              }));
            return (
              <AntdTable
                expandable={{ defaultExpandAllRows: true }}
                showHeader={false}
                columns={columns}
                dataSource={parts}
                pagination={false}
                rowKey={(item) => item.name}
                rowClassName={(record) =>
                  record.collected ? "row-collected" : "row-pieces-missing"
                }
                onRow={(record) => ({
                  onMouseEnter: () => {
                    const imgUrl = record.imgUrl
                      ? record.imgUrl
                      : convertArmourItemNameToWikiImageUrl(
                          record.name,
                          record.dlc
                        );

                    setHoveredImg({ url: imgUrl, name: record.name });
                  },
                  onClick: () => {
                    toggleArmourItemCollected({
                      subcategory: subcategory as keyof ArmourSubCategoryMap,
                      name: record.name,
                    });
                  },
                })}
              />
            );
          }
          return null;
        },
      }}
      pagination={false}
      size="small"
      rowClassName={(record) =>
        record.collected ? "row-collected" : "row-missing"
      }
      onRow={(record) => ({
        onMouseEnter: () => {
          const imgUrl = record.imgUrl
            ? record.imgUrl
            : getNameToImgUrlConverter(record);

          setHoveredImg({ url: imgUrl, name: record.name });
        },
        onClick: () => {
          getStoreAction({
            name: record.name,
            category: record.type,
            subcategory: subcategory,
            dispatch: dispatch,
          });
        },
      })}
    />
  );
}
