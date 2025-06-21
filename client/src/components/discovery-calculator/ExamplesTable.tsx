import { Flex, Image, InputNumber, Table } from "antd";
import type { ColumnsType } from "antd/es/table";

import { calculateItemDropChance } from "../../lib/utils/misc";
import { EXAMPLE_ITEM_DROPS, ItemDropTable } from "./data-discovery";
import { useState } from "react";

interface ExamplesTableProps {
  calculatedDiscovery: number;
}

const renderNameColumn = (name: string, record: ItemDropTable) => (
  <Flex align="center" gap={10}>
    {name}
    <Image src={record.imgUrl} height={50} preview={false} />
  </Flex>
);

const renderBaseColumn = (base: number) => `${base}%`;

const renderCalculatedColumn = (base: number, calculatedDiscovery: number) =>
  `${calculateItemDropChance(base, calculatedDiscovery)}%`;

const getTableColumns = (
  calculatedDiscovery: number
): ColumnsType<ItemDropTable> => [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: renderNameColumn,
  },
  {
    title: "Base",
    dataIndex: "base",
    key: "base",
    render: renderBaseColumn,
  },
  {
    title: "Your",
    dataIndex: "your",
    key: "your",
    render: (_: number, record) =>
      renderCalculatedColumn(record.base, calculatedDiscovery),
  },
];

const ExamplesTable = ({ calculatedDiscovery }: ExamplesTableProps) => {
  const [chance, setChance] = useState<number | null>(null);
  return (
    <div>
      <div style={{ marginBottom: 8 }}>
        Rare items drop rate change examples:
      </div>
      <Table<ItemDropTable>
        style={{ width: 400 }}
        dataSource={EXAMPLE_ITEM_DROPS}
        columns={getTableColumns(calculatedDiscovery)}
        pagination={false}
        size="small"
        showHeader={false}
        rowKey="name"
      />
      <Flex align="center" gap={10} style={{ marginTop: 10 }}>
        Base Drop Rate:
        <InputNumber
          max={99}
          min={0.1}
          step={0.1}
          size="small"
          style={{ width: 70 }}
          onChange={(v) => setChance(v)}
        />
        Your chance:
        <div>{`${calculateItemDropChance(chance!, calculatedDiscovery)}%`}</div>
      </Flex>
    </div>
  );
};

export default ExamplesTable;
