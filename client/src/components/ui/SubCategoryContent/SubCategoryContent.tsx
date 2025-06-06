import { Checkbox, Flex, Image, Table, Tooltip, type TableProps } from "antd";
import Link from "antd/es/typography/Link";
import { useState } from "react";
import { useAppDispatch } from "../../../store/typedDispatch";
import { toggleShieldCollected } from "../../categories/shields/slice";
import {
  convertShieldNameToWikiImageUrl,
  convertSpiritNameToWikiImageUrl,
} from "../../../lib/utils";
import type {
  ShieldCategoryMap,
  ShieldItem,
} from "../../categories/shields/types";
import type {
  SpiritAshesCategoryMap,
  SpiritAshItem,
} from "../../categories/spirit-ashes/types";
import { toggleSpiritAshesCollected } from "../../categories/spirit-ashes/slice";
import styles from "./SubCategoryContent.module.scss";
import { APP_PALETTE } from "../../../lib/consts";
import { ThunderboltTwoTone } from "@ant-design/icons";

export default function SubCategoryContent({
  dataSource,
  category,
  type,
}: {
  dataSource: ShieldItem[] | SpiritAshItem[];
  category: keyof ShieldCategoryMap | keyof SpiritAshesCategoryMap;
  type: string;
}) {
  const [hoveredImg, setHoveredImg] = useState<string | undefined>(undefined);
  const dispatch = useAppDispatch();

  const columns: TableProps<ShieldItem | SpiritAshItem>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (value, record) => {
        return (
          <Flex>
            {record.legendary && (
              <Tooltip title={"Legendary Item"}>
                <ThunderboltTwoTone twoToneColor={APP_PALETTE.textPrimary} />
              </Tooltip>
            )}
            <div
              style={
                record.legendary ? { color: APP_PALETTE.textHighlighted } : {}
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
      render: (_value: boolean, record: ShieldItem | SpiritAshItem) => (
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
        style={{ width: 1200 }}
        pagination={false}
        size="small"
        rowKey="name"
        rowClassName={(record) =>
          record.collected ? "row-collected" : "row-missing"
        }
        onRow={(record) => ({
          onMouseEnter: () => {
            return type == "shields"
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
              type === "shields"
                ? toggleShieldCollected({
                    category: category as keyof ShieldCategoryMap,
                    name: record.name,
                  })
                : toggleSpiritAshesCollected({
                    category: category as keyof SpiritAshesCategoryMap,
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
