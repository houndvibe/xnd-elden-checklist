import { Collapse, Flex } from "antd";
import SubCategoryContent from "../../ui/SubCategoryContent/SubCategoryContent";
import CategoryInfo from "../../ui/CategotyInfo/CategoryInfo";
import { useAppSelector } from "../../../store/typedDispatch";
import SubCategoryLabel from "../../ui/SubCategoryLabel/SubCategoryLabel";
import { toTitleCaseFromCamel } from "../../../lib/utils/converters";
import { RangedWeaponsSubCategoryMap } from "../../../global-types";

export default function RangedWeapons() {
  const rangedWeaponsData = useAppSelector(
    (state) => state.collection.collectionData.rangedWeaponsData
  );

  const rangedWeaponsSubcategoryItems = Object.entries(rangedWeaponsData).map(
    ([key, data], index) => ({
      key: `${index + 1}`,
      label: (
        <SubCategoryLabel
          title={toTitleCaseFromCamel(key as keyof RangedWeaponsSubCategoryMap)}
          data={data}
        />
      ),
      children: (
        <SubCategoryContent
          dataSource={data}
          category={key as keyof RangedWeaponsSubCategoryMap}
        />
      ),
    })
  );

  return (
    <Flex vertical align="center">
      <Flex className="category_wallpaper rangeWeapons_wallpaper">
        <CategoryInfo title={"ranged Weapons"} items={rangedWeaponsData} />
      </Flex>
      <div className="collapse_wpapper">
        <Collapse items={rangedWeaponsSubcategoryItems} defaultActiveKey={1} />
      </div>
    </Flex>
  );
}
