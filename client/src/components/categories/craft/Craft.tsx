import { Collapse, Flex } from "antd";

import SubCategoryContent from "../../ui/SubCategoryContent/SubCategoryContent";
import CategoryInfo from "../../ui/CategotyInfo/CategoryInfo";
import { useAppSelector } from "../../../store/typedDispatch";
import SubCategoryLabel from "../../ui/SubCategoryLabel/SubCategoryLabel";
import { toTitleCaseFromCamel } from "../../../lib/utils/converters";
import { CraftItemsCategoryMap } from "../../../global-types";

export default function Craft() {
  const craftData = useAppSelector(
    (state) => state.collection.collectionData.craftData
  );

  const craftSubcategoryItems = Object.entries(craftData).map(
    ([key, data], index) => ({
      key: `${index + 1}`,
      label: (
        <SubCategoryLabel
          title={toTitleCaseFromCamel(key as keyof CraftItemsCategoryMap)}
          data={data}
        />
      ),
      children: (
        <SubCategoryContent
          dataSource={data}
          category={key as keyof CraftItemsCategoryMap}
        />
      ),
    })
  );

  return (
    <Flex vertical align="center">
      <Flex className="category_wallpaper craft_wallpaper">
        <CategoryInfo title={"Craft"} items={craftData} />
      </Flex>
      <div className="collapse_wpapper">
        <Collapse items={craftSubcategoryItems} />
      </div>
    </Flex>
  );
}
