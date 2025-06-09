import { Collapse, Flex } from "antd";

import SubCategoryContent from "../../ui/SubCategoryContent/SubCategoryContent";
import CategoryInfo from "../../ui/CategotyInfo/CategoryInfo";
import { useAppSelector } from "../../../store/typedDispatch";
import SubCategoryLabel from "../../ui/SubCategoryLabel/SubCategoryLabel";
import { toTitleCaseFromCamel } from "../../../lib/utils/converters";
import { ArmourSubCategoryMap } from "../../../global-types";

export default function Armour() {
  const armourData = useAppSelector(
    (state) => state.collection.collectionData.armourData
  );

  const armourSubcategoryItems = Object.entries(armourData).map(
    ([key, data], index) => ({
      key: `${index + 1}`,
      label: (
        <SubCategoryLabel
          title={toTitleCaseFromCamel(key as keyof ArmourSubCategoryMap)}
          data={data}
        />
      ),
      children: (
        <SubCategoryContent
          type="armour"
          dataSource={data}
          category={key as keyof ArmourSubCategoryMap}
        />
      ),
    })
  );

  return (
    <Flex vertical align="center">
      <Flex className="category_wallpaper armour_wallpaper">
        <CategoryInfo title={"Armour"} items={armourData} />
      </Flex>
      <div className="collapse_wpapper">
        <Collapse items={armourSubcategoryItems} />
      </div>
    </Flex>
  );
}
