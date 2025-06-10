import { Collapse, Flex } from "antd";
import SubCategoryContent from "../../ui/SubCategoryContent/SubCategoryContent";
import CategoryInfo from "../../ui/CategotyInfo/CategoryInfo";
import { useAppSelector } from "../../../store/typedDispatch";
import SubCategoryLabel from "../../ui/SubCategoryLabel/SubCategoryLabel";
import { toTitleCaseFromCamel } from "../../../lib/utils/converters";
import { MeleWeaponsSubCategoryMap } from "../../../global-types";
import { useLocation, useNavigate } from "react-router-dom";
import { useMemo } from "react";

export default function MeleWeapons() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);

  // Получаем параметр open из URL и превращаем в массив ключей (разделитель — запятая)
  const openParam = searchParams.get("open");
  const activeKeys = useMemo(() => {
    if (!openParam) return [];
    return openParam.split(",");
  }, [openParam]);

  const meleWeaponsData = useAppSelector(
    (state) => state.collection.collectionData.meleWeaponsData
  );

  const meleWeaponsSubcategoryItems = useMemo(() => {
    return Object.entries(meleWeaponsData).map(([key, data]) => ({
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
    }));
  }, [meleWeaponsData]);

  const handleCollapseChange = (keys: string | string[]) => {
    const keysArray = Array.isArray(keys) ? keys : [keys];
    const newParams = new URLSearchParams(location.search);

    if (keysArray.length > 0) {
      newParams.set("open", keysArray.join(","));
    } else {
      newParams.delete("open");
    }

    navigate({ search: newParams.toString() }, { replace: true });
  };

  return (
    <Flex vertical align="center">
      <Flex className="category_wallpaper meleWeapons_wallpaper">
        <CategoryInfo title="Mele Weapons" items={meleWeaponsData} />
      </Flex>
      <div className="collapse_wpapper">
        <Collapse
          items={meleWeaponsSubcategoryItems}
          activeKey={activeKeys.length > 0 ? activeKeys : undefined}
          onChange={handleCollapseChange}
        />
      </div>
    </Flex>
  );
}
