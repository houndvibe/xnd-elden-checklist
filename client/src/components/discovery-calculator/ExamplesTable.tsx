import { Flex, Image, Table } from "antd";
import { calculateItemDropChance } from "../../lib/utils/misc";
import { EXAMPLE_ITEM_DROPS, ItemDropTable } from "./data-discovery";

const renderNameColumn = (name: string, { imgUrl }: ItemDropTable) => (
  <Flex align="center" gap={10}>
    {name}
    <Image src={imgUrl} height={50} preview={false} />
  </Flex>
);

const renderBaseColumn = (base: number) => `${base}%`;

const renderCalculatedColumn = (base: number, calculatedDiscovery: number) =>
  `${calculateItemDropChance(base, calculatedDiscovery)}%`;

const getTableColumns = (calculatedDiscovery: number) => [
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
    //@ts-ignore
    render: (_, record: ItemDrop) =>
      renderCalculatedColumn(record.base, calculatedDiscovery),
  },
];

interface ExamplesTableProps {
  calculatedDiscovery: number;
}

const ExamplesTable = ({ calculatedDiscovery }: ExamplesTableProps) => (
  <>
    {"Rare items drop rate change examples:"}
    <Table<ItemDropTable>
      style={{ width: 400 }}
      dataSource={EXAMPLE_ITEM_DROPS}
      columns={getTableColumns(calculatedDiscovery)}
      pagination={false}
      size="small"
      showHeader={false}
    />
  </>
);

export default ExamplesTable;
