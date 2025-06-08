import { Collapse, Flex } from "antd";

import SubCategoryContent from "../../ui/SubCategoryContent/SubCategoryContent";
import CategoryInfo from "../../ui/CategotyInfo/CategoryInfo";
import { useAppSelector } from "../../../store/typedDispatch";
import SubCategoryLabel from "../../ui/SubCategoryLabel/SubCategoryLabel";
import { toTitleCaseFromCamel } from "../../../lib/utils/converters";
import { AshesOfWarSubCategoryMap } from "../../../global-types";

export default function AshesOfWar() {
  const ashesOfWarData = useAppSelector(
    (state) => state.collection.collectionData.ashesOfWarData
  );

  const ashesOfWarSubcategoryItems = Object.entries(ashesOfWarData).map(
    ([key, data], index) => ({
      key: `${index + 1}`,
      label: (
        <SubCategoryLabel
          title={toTitleCaseFromCamel(key as keyof AshesOfWarSubCategoryMap)}
          data={data}
        />
      ),
      children: (
        <SubCategoryContent
          dataSource={data}
          category={key as keyof AshesOfWarSubCategoryMap}
        />
      ),
    })
  );

  return (
    <Flex vertical align="center">
      <Flex className="category_wallpaper ashesOfWar_wallpaper">
        <CategoryInfo title={"Ashes of War"} items={ashesOfWarData} />
      </Flex>
      <div className="collapse_wpapper">
        <Collapse items={ashesOfWarSubcategoryItems} />
      </div>
    </Flex>
  );
}
