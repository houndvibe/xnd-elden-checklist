import { Checkbox, Flex, Image, Table, Tooltip, type TableProps } from "antd";
import Link from "antd/es/typography/Link";
import { useState } from "react";
import { useAppDispatch } from "../../../store/typedDispatch";
import { toggleShieldCollected } from "../../categories/shields/slice";

import { toggleSpiritAshesCollected } from "../../categories/spirit-ashes/slice";
import styles from "./SubCategoryContent.module.scss";
import { APP_PALETTE } from "../../../lib/consts";
import { ThunderboltTwoTone } from "@ant-design/icons";
import type {
  Item,
  ItemSubCategory,
  ShieldSubCategoryMap,
  SpiritAshesSubCategoryMap,
} from "../../../global-types";
import dlcIcon from "../../../assets/dlc-icon.png";
import type { TablePaginationConfig, SortOrder } from "antd/es/table/interface";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import { getNextSortStep, smartNameSort } from "../../../lib/utils/sorters";
import { checkIsLegendary } from "../../../lib/utils/misc";
import { convertShieldNameToWikiImageUrl, convertSpiritNameToWikiImageUrl } from "../../../lib/utils/converters";

export default function SubCategoryContent({
  dataSource,
  category,
}: {
  dataSource: Item[];
  category: ItemSubCategory;
}) {
  const dispatch = useAppDispatch();
  const [hoveredImg, setHoveredImg] = useState<string | undefined>(undefined);

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
                <div style={{ color: APP_PALETTE.textHighlighted }}>
                  {value}
                </div>
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
          style={{ color: "#8b7c3b", fontStyle: "italic" }}
        >
          {"FextraLife"}
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
    <Flex gap={20}>
      <Table
        className={styles.table}
        columns={columns}
        dataSource={dataSource}
        style={{ width: 1000 }}
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
      <Flex
        vertical
        gap={50}
        style={{
          padding: 50,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {hoveredImg ? (
          <>
            <Image
              height={600}
              src={hoveredImg}
              preview={false}
              alt={"no image"}
            />
            <>
              {
                "Starting equipment for the Prophet class. Dropped by Demi-Humans that wield it. A good location to find them is going north from South of the Lookout Tower site of grace in the Weeping Peninsula. There should be a group of four of them carrying this shield."
              }
            </>
          </>
        ) : (
          <div style={{ height: 600 }}></div>
        )}
      </Flex>
    </Flex>
  );
}
