import { Checkbox, Flex, Image, Table, Tooltip, type TableProps } from "antd";
import Link from "antd/es/typography/Link";
import { useState } from "react";
import { useAppDispatch } from "../../../store/typedDispatch";
import { toggleShieldCollected } from "../../categories/shields/slice";
import {
  convertShieldNameToWikiImageUrl,
  convertSpiritNameToWikiImageUrl,
} from "../../../lib/utils";
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

export default function SubCategoryContent({
  dataSource,
  category,
}: {
  dataSource: Item[];
  category: ItemSubCategory;
}) {
  const dispatch = useAppDispatch();
  const [hoveredImg, setHoveredImg] = useState<string | undefined>(undefined);

  const columns: TableProps<Item>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (value, record) => {
        return (
          <Flex>
            {record.type === "spiritAshes" && record.legendary && (
              <Tooltip title={"Legendary Item"}>
                <ThunderboltTwoTone twoToneColor={APP_PALETTE.textPrimary} />
              </Tooltip>
            )}
            <div
              style={
                record.type === "spiritAshes" && record.legendary
                  ? { color: APP_PALETTE.textHighlighted }
                  : {}
              }
            >
              {value}
            </div>
          </Flex>
        );
      },
    },
    {
      title: "Collected",
      dataIndex: "collected",
      key: "collected",
      render: (_value: boolean, record: Item) => (
        <Flex gap={5} align="baseline">
          <Checkbox checked={record.collected} />
          {record.dlc && (
            <Tooltip title={"Shadow of the Erdtree Dlc content"}>SOTE</Tooltip>
          )}
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
          FextraLife
        </Link>
      ),
    },
  ];

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
