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
  subcategory,
}: {
  type: ItemCategory;
  dataSource: Item[];
  subcategory: ItemSubCategory;
}) {
  const [hoveredImg, setHoveredImg] = useState<{
    url: string | undefined;
    name: string;
  }>({
    url: undefined,
    name: "",
  });

  return (
    <Flex style={{ maxHeight: 800 }}>
      {type === "armour" ? (
        <HierarchyTable
          setHoveredImg={setHoveredImg}
          dataSource={dataSource}
          subcategory={subcategory}
        />
      ) : (
        <Table
          setHoveredImg={setHoveredImg}
          dataSource={dataSource}
          subcategory={subcategory}
        />
      )}

      {hoveredImg ? <Preview dataSource={dataSource} img={hoveredImg} /> : null}
    </Flex>
  );
}
