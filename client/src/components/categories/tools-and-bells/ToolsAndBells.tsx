import { Collapse, Flex } from "antd";
import SubCategoryContent from "../../ui/SubCategoryContent/SubCategoryContent";
import CategoryInfo from "../../ui/CategotyInfo/CategoryInfo";
import { useAppSelector } from "../../../store/typedDispatch";

import SubCategoryLabel from "../../ui/SubCategoryLabel/SubCategoryLabel";
import type { ToolsOrBellBearingsCategoryMap } from "../../../global-types";
import { toTitleCaseFromCamel } from "../../../lib/utils/converters";

export default function ToolsAndBells() {
  const toolsAndBellsData = useAppSelector(
    (state) => state.collection.collectionData.toolsAndBellBearingsData
  );

  const toolsAndBellsSubcategoryItems = Object.entries(toolsAndBellsData).map(
    ([key, data], index) => ({
      key: `${index + 1}`,
      label: (
        <SubCategoryLabel
          title={toTitleCaseFromCamel(
            key as keyof ToolsOrBellBearingsCategoryMap
          )}
          data={data}
        />
      ),
      children: (
        <SubCategoryContent
          dataSource={data}
          category={key as keyof ToolsOrBellBearingsCategoryMap}
        />
      ),
    })
  );

  return (
    <Flex vertical align="center">
      <Flex className="category_wallpaper tools_wallpaper">
        <CategoryInfo
          title={"Tools & Bell Bearings"}
          items={toolsAndBellsData}
        />
      </Flex>
      <div className="collapse_wpapper">
        <Collapse items={toolsAndBellsSubcategoryItems} />
      </div>
    </Flex>
  );
}
