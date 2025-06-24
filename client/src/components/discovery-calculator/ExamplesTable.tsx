import { Flex, Image, InputNumber, Table } from "antd";
import type { ColumnsType } from "antd/es/table";

import { calculateItemDropChance } from "../../lib/utils/misc";
import { EXAMPLE_ITEM_DROPS, ItemDropTable } from "./data-discovery";
import { useState } from "react";
import { t } from "../../i18n";

interface ExamplesTableProps {
  calculatedDiscovery: number;
}

const renderNameColumn = (name: string, record: ItemDropTable) => (
  <Flex align="center" gap={10}>
    {t("misc", name)}
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
        {t("misc", "Rare items drop rate change examples:")}
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
        {t("misc", "Base Drop Rate") + ":"}
        <InputNumber
          max={99}
          min={0.1}
          step={0.1}
          size="small"
          style={{ width: 80 }}
          onChange={(v) => setChance(v)}
        />
        {t("misc", "Your chance") + ":"}

        <div>{`${calculateItemDropChance(chance!, calculatedDiscovery)}%`}</div>
      </Flex>
    </div>
  );
};

export default ExamplesTable;
