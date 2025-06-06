import { Collapse, Flex } from "antd";
import SubCategoryContent from "../../ui/SubCategoryContent/SubCategoryContent";
import CategoryInfo from "../../ui/CategotyInfo/CategoryInfo";
import { useAppSelector } from "../../../store/typedDispatch";
import { toTitleCaseFromCamel } from "../../../lib/utils";
import SubCategoryLabel from "../../ui/SubCategoryLabel/SubCategoryLabel";
import type { SpiritAshesSubCategoryMap } from "../../../global-types";

export default function SpiritAshes() {
  const spiritAshesData = useAppSelector(
    (state) => state.spiritAshes.spiritAshesData
  );

  const spiritAshesSubcategoryItems = Object.entries(spiritAshesData).map(
    ([key, data], index) => ({
      key: `${index + 1}`,
      label: (
        <SubCategoryLabel
          title={toTitleCaseFromCamel(key as keyof SpiritAshesSubCategoryMap)}
          data={data}
        />
      ),
      children: (
        <SubCategoryContent
          dataSource={data}
          category={key as keyof SpiritAshesSubCategoryMap}
        />
      ),
    })
  );

  return (
    <Flex vertical align="center">
      <Flex className="category_wallpaper ashes_wallpaper">
        <CategoryInfo title={"Spirit Ashes"} items={spiritAshesData} />
      </Flex>
      <div className="collapse_wpapper">
        <Collapse items={spiritAshesSubcategoryItems} defaultActiveKey={1} />
      </div>
    </Flex>
  );
}
