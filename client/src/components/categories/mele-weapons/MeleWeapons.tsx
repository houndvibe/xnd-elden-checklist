import { Collapse, Flex } from "antd";
import SubCategoryContent from "../../ui/SubCategoryContent/SubCategoryContent";
import CategoryInfo from "../../ui/CategotyInfo/CategoryInfo";
import { useAppSelector } from "../../../store/typedDispatch";
import SubCategoryLabel from "../../ui/SubCategoryLabel/SubCategoryLabel";
import { toTitleCaseFromCamel } from "../../../lib/utils/converters";
import { MeleWeaponsSubCategoryMap } from "../../../global-types";

export default function MeleWeapons() {
  const meleWeaponsData = useAppSelector(
    (state) => state.collection.collectionData.meleWeaponsData
  );

  const meleWeaponsSubcategoryItems = Object.entries(meleWeaponsData).map(
    ([key, data], index) => ({
      key: `${index + 1}`,
      label: (
        <SubCategoryLabel
          title={toTitleCaseFromCamel(key as keyof MeleWeaponsSubCategoryMap)}
          data={data}
        />
      ),
      children: (
        <SubCategoryContent
          dataSource={data}
          category={key as keyof MeleWeaponsSubCategoryMap}
        />
      ),
    })
  );

  return (
    <Flex vertical align="center">
      <Flex className="category_wallpaper meleWeapons_wallpaper">
        <CategoryInfo title={"Mele Weapons"} items={meleWeaponsData} />
      </Flex>
      <div className="collapse_wpapper">
        <Collapse items={meleWeaponsSubcategoryItems} />
      </div>
    </Flex>
  );
}
