import { Checkbox, Flex, Image, Table, type TableProps } from "antd";
import Link from "antd/es/typography/Link";
import "../../styles/main.scss";
import { useState } from "react";
import { toWikiImageUrl } from "../../lib";
import type { DataType } from "../categories/shields/data";

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
    render: (value: boolean) => <Checkbox checked={value} />,
  },
  {
    title: "Link",
    dataIndex: "link",
    key: "link",
    render: (value: string) => (
      <Link href={value} target="_blank" rel="noopener noreferrer">
        Open
      </Link>
    ),
  },
];

export default function SubCategoryContent({
  dataSource,
}: {
  dataSource: DataType[];
}) {
  const [hoveredImg, setHoveredImg] = useState<string | undefined>(undefined);

  return (
    <Flex gap={20}>
      <Table
        style={{ width: 500 }}
        size="small"
        rowClassName={(record) =>
          record.collected ? "row-collected" : "row-missing"
        }
        onRow={(record) => ({
          onMouseEnter: () => setHoveredImg(toWikiImageUrl(record.name)),
        })}
        columns={columns}
        dataSource={dataSource}
        rowKey="name"
        pagination={false}
      />
      <Flex>
        <Image height={600} src={hoveredImg} preview={false} alt={"No Image"} />
      </Flex>
    </Flex>
  );
}
