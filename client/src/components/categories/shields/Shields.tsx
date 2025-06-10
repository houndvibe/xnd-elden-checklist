import { Collapse, Flex } from "antd";

import SubCategoryContent from "../../ui/SubCategoryContent/SubCategoryContent";
import CategoryInfo from "../../ui/CategotyInfo/CategoryInfo";
import { useAppSelector } from "../../../store/typedDispatch";
import SubCategoryLabel from "../../ui/SubCategoryLabel/SubCategoryLabel";
import type { ShieldAndTorchesSubCategoryMap } from "../../../global-types";
import { toTitleCaseFromCamel } from "../../../lib/utils/converters";

export default function ShieldsAndTorches() {
  const shieldsAndTorchesData = useAppSelector(
    (state) => state.collection.collectionData.shieldsAndTorchesData
  );

  const shildsSubcategoryItems = Object.entries(shieldsAndTorchesData).map(
    ([key, data], index) => ({
      key: `${index + 1}`,
      label: (
        <SubCategoryLabel
          title={toTitleCaseFromCamel(
            key as keyof ShieldAndTorchesSubCategoryMap
          )}
          data={data}
        />
      ),
      children: (
        <SubCategoryContent
          dataSource={data}
          subcategory={key as keyof ShieldAndTorchesSubCategoryMap}
        />
      ),
    })
  );

  return (
    <Flex vertical align="center">
      <Flex className="category_wallpaper shields_wallpaper">
        <CategoryInfo
          title={"Shields & Torches"}
          items={shieldsAndTorchesData}
        />
      </Flex>
      <div className="collapse_wpapper">
        <Collapse items={shildsSubcategoryItems} />
      </div>
    </Flex>
  );
}
