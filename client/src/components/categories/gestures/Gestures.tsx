import { Collapse, Flex } from "antd";
import SubCategoryContent from "../../ui/SubCategoryContent/SubCategoryContent";
import CategoryInfo from "../../ui/CategotyInfo/CategoryInfo";
import { useAppSelector } from "../../../store/typedDispatch";
import SubCategoryLabel from "../../ui/SubCategoryLabel/SubCategoryLabel";
import { toTitleCaseFromCamel } from "../../../lib/utils/converters";
import { GesturesSubCategoryMap } from "../../../global-types";

export default function Gestures() {
  const gesturesData = useAppSelector(
    (state) => state.collection.collectionData.gesturesData
  );

  const gesturesSubcategoryItems = Object.entries(gesturesData).map(
    ([key, data], index) => ({
      key: `${index + 1}`,
      label: (
        <SubCategoryLabel
          title={toTitleCaseFromCamel(key as keyof GesturesSubCategoryMap)}
          data={data}
        />
      ),
      children: (
        <SubCategoryContent
          dataSource={data}
          category={key as keyof GesturesSubCategoryMap}
        />
      ),
    })
  );

  return (
    <Flex vertical align="center">
      <Flex className="category_wallpaper gestures_wallpaper">
        <CategoryInfo title={"Gestures"} items={gesturesData} />
      </Flex>
      <div className="collapse_wpapper">
        <Collapse items={gesturesSubcategoryItems} />
      </div>
    </Flex>
  );
}
