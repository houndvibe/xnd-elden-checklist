import { Collapse, Flex } from "antd";
import SubCategoryContent from "../../ui/SubCategoryContent/SubCategoryContent";
import CategoryInfo from "../../ui/CategotyInfo/CategoryInfo";
import { useAppSelector } from "../../../store/typedDispatch";
import SubCategoryLabel from "../../ui/SubCategoryLabel/SubCategoryLabel";
import { toTitleCaseFromCamel } from "../../../lib/utils/converters";
import { KeyItemsSubCategoryMap } from "../../../global-types";

export default function KeyItems() {
  const keyItemsData = useAppSelector(
    (state) => state.collection.collectionData.keyItemsData
  );

  const keyItemsDataSubcategoryItems = Object.entries(keyItemsData).map(
    ([key, data], index) => ({
      key: `${index + 1}`,
      label: (
        <SubCategoryLabel
          title={toTitleCaseFromCamel(key as keyof KeyItemsSubCategoryMap)}
          data={data}
        />
      ),
      children: (
        <SubCategoryContent
          dataSource={data}
          subcategory={key as keyof KeyItemsSubCategoryMap}
        />
      ),
    })
  );

  return (
    <Flex vertical align="center">
      <Flex className="category_wallpaper keyItems_wallpaper">
        <CategoryInfo title={"Key items"} items={keyItemsData} />
      </Flex>
      <div className="collapse_wpapper">
        <Collapse items={keyItemsDataSubcategoryItems} />
      </div>
    </Flex>
  );
}
