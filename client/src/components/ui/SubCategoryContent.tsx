import { Checkbox, Flex, Image, Table, type TableProps } from "antd";
import Link from "antd/es/typography/Link";
import "../../styles/main.scss";
import { useState } from "react";
import { toWikiImageUrl } from "../../lib";
import type { DataType, Shields } from "../categories/shields/data";
import { useAppDispatch } from "../../typedDispatch";
import { toggleShieldCollected } from "../categories/shields/slice";

export default function SubCategoryContent({
  dataSource,
  category,
}: {
  dataSource: DataType[];
  category: keyof Shields;
}) {
  const [hoveredImg, setHoveredImg] = useState<string | undefined>(undefined);
  const dispatch = useAppDispatch();

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Collected",
      dataIndex: "collected",
      key: "collected",
      render: (_value: boolean, record: DataType) => (
        <Checkbox checked={record.collected} />
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
          Open
        </Link>
      ),
    },
  ];

  return (
    <Flex gap={20}>
      <Table
        columns={columns}
        dataSource={dataSource}
        style={{ width: 500 }}
        pagination={false}
        size="small"
        rowKey="name"
        rowClassName={(record) =>
          record.collected ? "row-collected" : "row-missing"
        }
        onRow={(record) => ({
          onMouseEnter: () => setHoveredImg(toWikiImageUrl(record.name)),
          onClick: () =>
            dispatch(
              toggleShieldCollected({
                category,
                name: record.name,
              })
            ),
        })}
      />
      <Flex>
        <Image height={600} src={hoveredImg} preview={false} alt={"No Image"} />
      </Flex>
    </Flex>
  );
}
