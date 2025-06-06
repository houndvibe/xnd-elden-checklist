import { useState } from "react";
import type {
  Item,
  ItemSubCategory,
  ShieldSubCategoryMap,
  SpiritAshesSubCategoryMap,
} from "../../../global-types";
import {
  convertShieldNameToWikiImageUrl,
  convertSpiritNameToWikiImageUrl,
} from "../../../lib/utils/converters";
import { useAppDispatch } from "../../../store/typedDispatch";
import { toggleShieldCollected } from "../../categories/shields/slice";
import { toggleSpiritAshesCollected } from "../../categories/spirit-ashes/slice";
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
import { checkIsLegendary } from "../../../lib/utils/misc";
import { APP_PALETTE } from "../../../lib/consts";
import Link from "antd/es/typography/Link";
import type {
  FilterValue,
  SorterResult,
  SortOrder,
} from "antd/es/table/interface";
import { ThunderboltTwoTone } from "@ant-design/icons";
import dlcIcon from "../../../assets/dlc-icon.png";

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
                <div className={styles.legendary}>{value}</div>
              </>
            ) : (
              value
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
      title: "Collected",
      dataIndex: "collected",
      key: "collected",
      sortOrder: sortColumn === "collected" ? sortOrder : null,
      sorter: (a, b) =>
        a.collected === b.collected ? 0 : a.collected ? -1 : 1,
      render: (_value: boolean, record: Item) => (
        <Flex gap={5} align="baseline">
          <Checkbox checked={record.collected} />
        </Flex>
      ),
    },
    {
      title: "Link",
      dataIndex: "link",
      key: "link",
      render: (value: string) => (
        <Link
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          <span className={styles.link}>{"FextraLife"}</span>
        </Link>
      ),
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
          return record.type == "shields"
            ? setHoveredImg(
                record.imgUrl ||
                  convertShieldNameToWikiImageUrl(record.name, record.dlc)
              )
            : setHoveredImg(
                record.imgUrl ||
                  convertSpiritNameToWikiImageUrl(record.name, record.dlc)
              );
        },
        onClick: () => {
          dispatch(
            record.type === "shields"
              ? toggleShieldCollected({
                  category: category as keyof ShieldSubCategoryMap,
                  name: record.name,
                })
              : toggleSpiritAshesCollected({
                  category: category as keyof SpiritAshesSubCategoryMap,
                  name: record.name,
                })
          );
        },
      })}
    />
  );
}
