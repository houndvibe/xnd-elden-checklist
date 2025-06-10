import { Collapse, Flex } from "antd";
import { ItemCategory, ItemSubCategory } from "../../../global-types";
import { useLocation, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { useAppSelector } from "../../../store/typedDispatch";
import { Collection } from "../../../store/collectionSlice";
import SubCategoryLabel from "../SubCategoryLabel/SubCategoryLabel";
import { toTitleCaseFromCamel } from "../../../lib/utils/converters";
import SubCategoryContent from "../SubCategoryContent/SubCategoryContent";
import CategoryInfo from "../CategotyInfo/CategoryInfo";
import { transformCategoryToName } from "../../../lib/utils/misc";


export default function CategoryTab({ category }: { category: ItemCategory}) {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);

  const openParam = searchParams.get("open");
  const activeKeys = useMemo(() => {
    if (!openParam) return [];
    return openParam.split(",");
  }, [openParam]);
  const data = useAppSelector(
    (state) =>
      state.collection.collectionData[`${category}Data` as keyof Collection]
  );

  const subcategoryItems = Object.entries(data).map(([key, data]) => ({
    key,
    label: (
      <SubCategoryLabel
        title={toTitleCaseFromCamel(key as ItemSubCategory)}
        data={data}
      />
    ),
    children: (
      <SubCategoryContent
        dataSource={data}
        subcategory={key as ItemSubCategory}
        type={category}
      />
    ),
  }));

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
      <Flex className={`category_wallpaper ${category}_wallpaper`}>
        <CategoryInfo title={transformCategoryToName(category)} items={data} />
      </Flex>
      <div className="collapse_wpapper">
        <Collapse
          items={subcategoryItems}
          activeKey={activeKeys.length > 0 ? activeKeys : undefined}
          onChange={handleCollapseChange}
        />
      </div>
    </Flex>
  );
}
