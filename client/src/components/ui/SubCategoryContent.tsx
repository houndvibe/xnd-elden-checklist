import { Checkbox, Flex, Image, Table, type TableProps } from "antd";
import Link from "antd/es/typography/Link";
import { useState } from "react";

import { useAppDispatch } from "../../store/typedDispatch";
import { toggleShieldCollected } from "../categories/shields/slice";
import { convertToWikiImageUrl } from "../../lib/utils";
import type {
  ShieldCategoryMap,
  ShieldItem,
} from "../categories/shields/types";

export default function SubCategoryContent({
  dataSource,
  category,
}: {
  dataSource: ShieldItem[];
  category: keyof ShieldCategoryMap;
}) {
  const [hoveredImg, setHoveredImg] = useState<string | undefined>(undefined);
  const dispatch = useAppDispatch();

  const columns: TableProps<ShieldItem>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Collected",
      dataIndex: "collected",
      key: "collected",
      render: (_value: boolean, record: ShieldItem) => (
        <Flex gap={5} align="baseline">
          <Checkbox checked={record.collected} />
          {record.dlc && "SOTE"}
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
        columns={columns}
        dataSource={dataSource}
        style={{ width: 700 }}
        pagination={false}
        size="small"
        rowKey="name"
        rowClassName={(record) =>
          record.collected ? "row-collected" : "row-missing"
        }
        onRow={(record) => ({
          onMouseEnter: () =>
            setHoveredImg(
              record.imgUrl || convertToWikiImageUrl(record.name, record.dlc)
            ),
          onClick: () =>
            dispatch(
              toggleShieldCollected({
                category,
                name: record.name,
              })
            ),
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
