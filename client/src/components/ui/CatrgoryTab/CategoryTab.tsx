import { Collapse, Flex } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useMemo, useEffect, useRef } from "react";

import { ItemCategory, ItemSubCategory } from "../../../global-types";
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

interface Props {
  category: ItemCategory;
}

export default function CategoryTab({ category }: Props) {
  const location = useLocation();
  const navigate = useNavigate();

  const containerRef = useRef<HTMLDivElement>(null);
  const prevActiveKeysRef = useRef<string[]>([]);

  const openParam = new URLSearchParams(location.search).get("open");

  const data = useAppSelector(
    (state) =>
      state.collection.collectionData[`${category}Data` as keyof Collection]
  );

  const activeKeys = useMemo(() => {
    return openParam ? openParam.split(",").map(decodeURIComponent) : [];
  }, [openParam]);

  useEffect(() => {
    //scroll
    const prevKeys = prevActiveKeysRef.current;
    const newlyOpened = activeKeys.find((key) => !prevKeys.includes(key));

    if (!newlyOpened || !containerRef.current) return;

    const expectedText = toTitleCaseFromCamel(newlyOpened as ItemSubCategory);
    const headers = containerRef.current.querySelectorAll<HTMLDivElement>(
      ".ant-collapse-item-active .ant-collapse-header"
    );

    for (const header of headers) {
      if (header.textContent?.includes(expectedText)) {
        header.scrollIntoView({ behavior: "smooth", block: "start" });
        break;
      }
    }

    prevActiveKeysRef.current = activeKeys;
  }, [activeKeys]);

  const subcategoryItems = useMemo(
    () =>
      Object.entries(data).map(([key, subData]) => ({
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
    [data, category]
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

      <div className="collapse_wpapper" ref={containerRef}>
        <Collapse
          items={subcategoryItems}
          activeKey={activeKeys.length ? activeKeys : undefined}
          onChange={handleCollapseChange}
        />
      </div>
    </Flex>
  );
}
