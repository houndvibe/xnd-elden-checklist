import { Collapse, Flex } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useMemo } from "react";

import {
  ItemCategory,
  ItemSubCategory,
  ItemSubCategoryMap,
} from "../../../global-types";
import { useAppSelector } from "../../../store/typedDispatch";
import { Collection } from "../../../store/collectionSlice";

import SubCategoryLabel from "../SubCategoryLabel/SubCategoryLabel";
import SubCategoryContent from "../SubCategoryContent/SubCategoryContent";
import CategoryInfo from "../CategotyInfo/CategoryInfo";

import {
  toTitleCaseFromCamel,
  transformCategoryToName,
} from "../../../lib/utils/misc";
import { t } from "../../../i18n";
import {
  DLC_ONLY_SUBCATEGORIES,
  LOOSABLE_ONLY_SUBCATEGORIES,
} from "../../../lib/consts";

interface Props {
  category: ItemCategory;
}

export default function CategoryTab({ category }: Props) {
  const location = useLocation();
  const navigate = useNavigate();

  const openParam = new URLSearchParams(location.search).get("open");

  const data = useAppSelector(
    (state) =>
      state.collection.collectionData[`${category}Data` as keyof Collection]
  );
  const { checkDlc, checkedSubcategories, loosable } = useAppSelector(
    (state) => state.settings
  );

  const filteredData: Partial<ItemSubCategoryMap> = Object.fromEntries(
    Object.entries(data)
      .filter(([subcategory]) => checkedSubcategories.includes(subcategory))
      .filter(([subcategory]) =>
        checkDlc
          ? subcategory
          : !DLC_ONLY_SUBCATEGORIES.includes(subcategory as ItemSubCategory)
      )
      .filter(([subcategory]) =>
        loosable
          ? subcategory
          : !LOOSABLE_ONLY_SUBCATEGORIES.includes(
              subcategory as ItemSubCategory
            )
      )
  );

  const activeKeys = useMemo(() => {
    return openParam ? openParam.split(",").map(decodeURIComponent) : [];
  }, [openParam]);

  const subcategoryItems = useMemo(
    () =>
      Object.entries(filteredData).map(([key, subData]) => ({
        key,
        label: (
          <SubCategoryLabel
            title={t("misc", toTitleCaseFromCamel(key as ItemSubCategory))}
            data={subData}
          />
        ),
        children: (
          <SubCategoryContent
            dataSource={subData}
            subcategory={key as ItemSubCategory}
            type={category}
          />
        ),
      })),
    [data, category, checkedSubcategories, checkDlc]
  );

  const handleCollapseChange = (keys: string | string[]) => {
    const keysArray = Array.isArray(keys) ? keys : [keys];
    const searchParams = new URLSearchParams(location.search);

    if (keysArray.length) {
      const encodedKeys = keysArray.map(encodeURIComponent);
      searchParams.set("open", encodedKeys.join(","));
    } else {
      searchParams.delete("open");
    }

    navigate({ search: searchParams.toString() }, { replace: true });
  };

  return (
    <Flex vertical align="center">
      <Flex className={`category_wallpaper ${category}_wallpaper`}>
        <CategoryInfo title={transformCategoryToName(category)} items={data} />
      </Flex>

      <div className="collapse_wpapper">
        <Collapse
          items={subcategoryItems}
          activeKey={activeKeys.length ? activeKeys : undefined}
          onChange={handleCollapseChange}
        />
      </div>
    </Flex>
  );
}
