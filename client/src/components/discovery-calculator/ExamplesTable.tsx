import { Flex, Image, Table } from "antd";
import type { ColumnsType } from "antd/es/table";

import { calculateItemDropChance } from "../../lib/utils/misc";
import { EXAMPLE_ITEM_DROPS, ItemDropTable } from "./data-discovery";

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

const ExamplesTable = ({ calculatedDiscovery }: ExamplesTableProps) => (
  <div>
    <div style={{ marginBottom: 8 }}>Rare items drop rate change examples:</div>
    <Table<ItemDropTable>
      style={{ width: 400 }}
      dataSource={EXAMPLE_ITEM_DROPS}
      columns={getTableColumns(calculatedDiscovery)}
      pagination={false}
      size="small"
      showHeader={false}
      rowKey="name"
    />
  </div>
);

export default ExamplesTable;
