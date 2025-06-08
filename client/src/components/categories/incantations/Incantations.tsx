import { Collapse, Flex } from "antd";
import SubCategoryContent from "../../ui/SubCategoryContent/SubCategoryContent";
import CategoryInfo from "../../ui/CategotyInfo/CategoryInfo";
import { useAppSelector } from "../../../store/typedDispatch";
import SubCategoryLabel from "../../ui/SubCategoryLabel/SubCategoryLabel";
import { toTitleCaseFromCamel } from "../../../lib/utils/converters";
import { IncantationsSubCategoryMap } from "../../../global-types";

export default function Incantations() {
  const incantationsData = useAppSelector(
    (state) => state.collection.collectionData.incantationsData
  );

  const incantationsSubcategoryItems = Object.entries(incantationsData).map(
    ([key, data], index) => ({
      key: `${index + 1}`,
      label: (
        <SubCategoryLabel
          title={toTitleCaseFromCamel(key as keyof IncantationsSubCategoryMap)}
          data={data}
        />
      ),
      children: (
        <SubCategoryContent
          dataSource={data}
          category={key as keyof IncantationsSubCategoryMap}
        />
      ),
    })
  );

  return (
    <Flex vertical align="center">
      <Flex className="category_wallpaper incantations_wallpaper">
        <CategoryInfo title={"Incantations"} items={incantationsData} />
      </Flex>
      <div className="collapse_wpapper">
        <Collapse items={incantationsSubcategoryItems} />
      </div>
    </Flex>
  );
}
