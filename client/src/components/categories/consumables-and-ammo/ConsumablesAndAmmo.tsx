import { Collapse, Flex } from "antd";

import SubCategoryContent from "../../ui/SubCategoryContent/SubCategoryContent";
import CategoryInfo from "../../ui/CategotyInfo/CategoryInfo";
import { useAppSelector } from "../../../store/typedDispatch";
import SubCategoryLabel from "../../ui/SubCategoryLabel/SubCategoryLabel";
import { toTitleCaseFromCamel } from "../../../lib/utils/converters";
import { СonsumablesAndAmmoItemsCategoryMap } from "../../../global-types";

export default function ConsumablesAndAmmo() {
  const consumablesAndAmmoData = useAppSelector(
    (state) => state.collection.collectionData.consumablesAndAmmoData
  );

  const consumablesAndAmmoSubcategoryItems = Object.entries(
    consumablesAndAmmoData
  ).map(([key, data], index) => ({
    key: `${index + 1}`,
    label: (
      <SubCategoryLabel
        title={toTitleCaseFromCamel(
          key as keyof СonsumablesAndAmmoItemsCategoryMap
        )}
        data={data}
      />
    ),
    children: (
      <SubCategoryContent
        dataSource={data}
        subcategory={key as keyof СonsumablesAndAmmoItemsCategoryMap}
      />
    ),
  }));

  return (
    <Flex vertical align="center">
      <Flex className="category_wallpaper consumablesA">
        <CategoryInfo
          title={"ConsumablesA & Ammo"}
          items={consumablesAndAmmoData}
        />
      </Flex>
      <div className="collapse_wpapper">
        <Collapse items={consumablesAndAmmoSubcategoryItems} />
      </div>
    </Flex>
  );
}
