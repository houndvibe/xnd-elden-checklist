import { Collapse, Flex } from "antd";
import SubCategoryContent from "../../ui/SubCategoryContent/SubCategoryContent";
import CategoryInfo from "../../ui/CategotyInfo/CategoryInfo";
import { useAppSelector } from "../../../store/typedDispatch";
import SubCategoryLabel from "../../ui/SubCategoryLabel/SubCategoryLabel";
import { toTitleCaseFromCamel } from "../../../lib/utils/converters";
import { InfoItemsSubCategoryMap } from "../../../global-types";

export default function InfoItems() {
  const infoItemsData = useAppSelector(
    (state) => state.collection.collectionData.infoItemsData
  );

  const infoItemsDataSubcategoryItems = Object.entries(infoItemsData).map(
    ([key, data], index) => ({
      key: `${index + 1}`,
      label: (
        <SubCategoryLabel
          title={toTitleCaseFromCamel(key as keyof InfoItemsSubCategoryMap)}
          data={data}
        />
      ),
      children: (
        <SubCategoryContent
          dataSource={data}
          subcategory={key as keyof InfoItemsSubCategoryMap}
        />
      ),
    })
  );

  return (
    <Flex vertical align="center">
      <Flex className="category_wallpaper infoItems_wallpaper">
        <CategoryInfo title={"Info items"} items={infoItemsData} />
      </Flex>
      <div className="collapse_wpapper">
        <Collapse items={infoItemsDataSubcategoryItems} />
      </div>
    </Flex>
  );
}
