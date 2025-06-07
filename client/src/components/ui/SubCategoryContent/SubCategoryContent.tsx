import { Flex } from "antd";
import { useState } from "react";
import type { Item, ItemSubCategory } from "../../../global-types";
import Preview from "./Preview";
import Table from "./Table";

export default function SubCategoryContent({
  dataSource,
  category,
}: {
  dataSource: Item[];
  category: ItemSubCategory;
}) {
  const [hoveredImg, setHoveredImg] = useState<string | undefined>(undefined);

  return (
    <Flex gap={20} style={{ maxHeight: 800 }}>
      <Table
        setHoveredImg={setHoveredImg}
        dataSource={dataSource}
        category={category}
      />
      <Preview img={hoveredImg} />
    </Flex>
  );
}
