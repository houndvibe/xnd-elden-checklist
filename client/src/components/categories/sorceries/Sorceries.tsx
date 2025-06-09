import { Collapse, Flex } from "antd";
import SubCategoryContent from "../../ui/SubCategoryContent/SubCategoryContent";
import CategoryInfo from "../../ui/CategotyInfo/CategoryInfo";
import { useAppSelector } from "../../../store/typedDispatch";
import SubCategoryLabel from "../../ui/SubCategoryLabel/SubCategoryLabel";
import type { SorceriesSubCategoryMap } from "../../../global-types";
import { toTitleCaseFromCamel } from "../../../lib/utils/converters";

export default function Sorceries() {
  const sorceriesData = useAppSelector(
    (state) => state.collection.collectionData.sorceriesData
  );

  const sorceriesSubcategoryItems = Object.entries(sorceriesData).map(
    ([key, data], index) => ({
      key: `${index + 1}`,
      label: (
        <SubCategoryLabel
          title={toTitleCaseFromCamel(key as keyof SorceriesSubCategoryMap)}
          data={data}
        />
      ),
      children: (
        <SubCategoryContent
          dataSource={data}
          subcategory={key as keyof SorceriesSubCategoryMap}
        />
      ),
    })
  );

  return (
    <Flex vertical align="center">
      <Flex className="category_wallpaper sorceries_wallpaper">
        <CategoryInfo title={"Sorceries"} items={sorceriesData} />
      </Flex>
      <div className="collapse_wpapper">
        <Collapse items={sorceriesSubcategoryItems} />
      </div>
    </Flex>
  );
}
