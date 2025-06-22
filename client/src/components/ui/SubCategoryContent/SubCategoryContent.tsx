import { Flex } from "antd";
import { useState } from "react";
import type {
  Item,
  ItemCategory,
  ItemSubCategory,
} from "../../../global-types";
import Preview from "./Preview";
import Table from "./Table";
import HierarchyTable from "./HierarchyTable";
import { t } from "../../../i18n";

interface Props {
  type: ItemCategory;
  dataSource: Item[];
  subcategory: ItemSubCategory;
}

export default function SubCategoryContent({
  type,
  dataSource,
  subcategory,
}: Props) {
  const [hoveredItemName, setHoveredItemName] = useState("");

  const sortedDataSource = [...dataSource].sort((a, b) =>
    t(type, a.name).localeCompare(t(type, b.name))
  );

  const isItArmorSet = type === "armour" && subcategory !== "pieces";
  const TableComponent = isItArmorSet ? HierarchyTable : Table;

  return (
    <Flex style={{ maxHeight: 800 }}>
      <TableComponent
        setHoveredItemName={setHoveredItemName}
        dataSource={sortedDataSource}
        subcategory={subcategory}
      />
      <Preview
        dataSource={sortedDataSource}
        categoty={type}
        subcategory={subcategory}
        hoveredItemName={hoveredItemName}
      />
    </Flex>
  );
}
