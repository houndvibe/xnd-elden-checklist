import { Collapse, Flex } from "antd";
import SubCategoryContent from "../../ui/SubCategoryContent/SubCategoryContent";
import CategoryInfo from "../../ui/CategotyInfo/CategoryInfo";
import { useAppSelector } from "../../../store/typedDispatch";

import SubCategoryLabel from "../../ui/SubCategoryLabel/SubCategoryLabel";
import type { SpiritAshesSubCategoryMap } from "../../../global-types";
import { toTitleCaseFromCamel } from "../../../lib/utils/converters";

export default function SpiritAshes() {
  const spiritAshesData = useAppSelector(
    (state) => state.collection.collectionData.spiritAshesData
  );

  const spiritAshesSubcategoryItems = Object.entries(spiritAshesData).map(
    ([key, data], index) => ({
      key: `${index + 1}`,
      label: (
        <SubCategoryLabel
          title={toTitleCaseFromCamel(key as keyof SpiritAshesSubCategoryMap)}
          data={data}
        />
      ),
      children: (
        <SubCategoryContent
          dataSource={data}
          subcategory={key as keyof SpiritAshesSubCategoryMap}
        />
      ),
    })
  );

  return (
    <Flex vertical align="center">
      <Flex className="category_wallpaper ashes_wallpaper">
        <CategoryInfo title={"Spirit Ashes"} items={spiritAshesData} />
      </Flex>
      <div className="collapse_wpapper">
        <Collapse items={spiritAshesSubcategoryItems} />
      </div>
    </Flex>
  );
}
