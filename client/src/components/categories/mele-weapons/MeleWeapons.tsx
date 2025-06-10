import { Collapse, Flex } from "antd";
import SubCategoryContent from "../../ui/SubCategoryContent/SubCategoryContent";
import CategoryInfo from "../../ui/CategotyInfo/CategoryInfo";
import { useAppSelector } from "../../../store/typedDispatch";
import SubCategoryLabel from "../../ui/SubCategoryLabel/SubCategoryLabel";
import { toTitleCaseFromCamel } from "../../../lib/utils/converters";
import { MeleWeaponsSubCategoryMap } from "../../../global-types";
import { useLocation } from "react-router-dom";
import { useMemo } from "react";

export default function MeleWeapons() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const openParam = searchParams.get("sub");

  const meleWeaponsData = useAppSelector(
    (state) => state.collection.collectionData.meleWeaponsData
  );

  const meleWeaponsSubcategoryItems = Object.entries(meleWeaponsData).map(
    ([key, data]) => ({
      key,
      label: (
        <SubCategoryLabel
          title={toTitleCaseFromCamel(key as keyof MeleWeaponsSubCategoryMap)}
          data={data}
        />
      ),
      children: (
        <SubCategoryContent
          dataSource={data}
          subcategory={key as keyof MeleWeaponsSubCategoryMap}
        />
      ),
      originalKey: key,
    })
  );

  // Находим key нужной вкладки
  const defaultActiveKey = useMemo(() => {
    const found = meleWeaponsSubcategoryItems.find(
      (item) => item.key === openParam
    );
    return found ? [found.key] : undefined;
  }, [meleWeaponsSubcategoryItems, openParam]);

  return (
    <Flex vertical align="center">
      <Flex className="category_wallpaper meleWeapons_wallpaper">
        <CategoryInfo title={"Mele Weapons"} items={meleWeaponsData} />
      </Flex>
      <div className="collapse_wpapper">
        <Collapse
          items={meleWeaponsSubcategoryItems}
          defaultActiveKey={defaultActiveKey}
        />
      </div>
    </Flex>
  );
}
