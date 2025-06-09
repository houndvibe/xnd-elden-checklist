import { Collapse, Flex } from "antd";
import SubCategoryContent from "../../ui/SubCategoryContent/SubCategoryContent";
import CategoryInfo from "../../ui/CategotyInfo/CategoryInfo";
import { useAppSelector } from "../../../store/typedDispatch";

import SubCategoryLabel from "../../ui/SubCategoryLabel/SubCategoryLabel";
import type { TalismansSubCategoryMap } from "../../../global-types";
import { toTitleCaseFromCamel } from "../../../lib/utils/converters";

export default function Talismans() {
  const talismansData = useAppSelector(
    (state) => state.collection.collectionData.talismansData
  );

  const talismansSubcategoryItems = Object.entries(talismansData).map(
    ([key, data], index) => ({
      key: `${index + 1}`,
      label: (
        <SubCategoryLabel
          title={toTitleCaseFromCamel(key as keyof TalismansSubCategoryMap)}
          data={data}
        />
      ),
      children: (
        <SubCategoryContent
          dataSource={data}
          subcategory={key as keyof TalismansSubCategoryMap}
        />
      ),
    })
  );

  return (
    <Flex vertical align="center">
      <Flex className="category_wallpaper talismans_wallpaper">
        <CategoryInfo title={"Talismans"} items={talismansData} />
      </Flex>
      <div className="collapse_wpapper">
        <Collapse items={talismansSubcategoryItems} />
      </div>
    </Flex>
  );
}
