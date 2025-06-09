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

export default function SubCategoryContent({
  type,
  dataSource,
  category,
}: {
  type?: ItemCategory;
  dataSource: Item[];
  category: ItemSubCategory;
}) {
  const [hoveredImg, setHoveredImg] = useState<{
    url: string | undefined;
    name: string;
  }>({
    url: undefined,
    name: "",
  });

  return (
    <Flex gap={20} style={{ maxHeight: 800 }}>
      {type === "armour" ? (
        <HierarchyTable
          setHoveredImg={setHoveredImg}
          dataSource={dataSource}
          category={category}
        />
      ) : (
        <Table
          setHoveredImg={setHoveredImg}
          dataSource={dataSource}
          category={category}
        />
      )}

      <Preview dataSource={dataSource} img={hoveredImg} />
    </Flex>
  );
}
