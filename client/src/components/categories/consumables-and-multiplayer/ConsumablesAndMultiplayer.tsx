import { Collapse, Flex } from "antd";

import SubCategoryContent from "../../ui/SubCategoryContent/SubCategoryContent";
import CategoryInfo from "../../ui/CategotyInfo/CategoryInfo";
import { useAppSelector } from "../../../store/typedDispatch";
import SubCategoryLabel from "../../ui/SubCategoryLabel/SubCategoryLabel";
import { toTitleCaseFromCamel } from "../../../lib/utils/converters";
import { СonsumablesAndMultiplayerItemsCategoryMap } from "../../../global-types";

export default function ConsumablesAndMultiplayer() {
  const consumablesAndMultiplayerData = useAppSelector(
    (state) => state.collection.collectionData.consumablesAndMultiplayerData
  );

  const consumablesAndMultiplayerSubcategoryItems = Object.entries(
    consumablesAndMultiplayerData
  ).map(([key, data], index) => ({
    key: `${index + 1}`,
    label: (
      <SubCategoryLabel
        title={toTitleCaseFromCamel(
          key as keyof СonsumablesAndMultiplayerItemsCategoryMap
        )}
        data={data}
      />
    ),
    children: (
      <SubCategoryContent
        dataSource={data}
        subcategory={key as keyof СonsumablesAndMultiplayerItemsCategoryMap}
      />
    ),
  }));

  return (
    <Flex vertical align="center">
      <Flex className="category_wallpaper multiplayer_wallpaper">
        <CategoryInfo
          title={"ConsumablesA & Multiplayer"}
          items={consumablesAndMultiplayerData}
        />
      </Flex>
      <div className="collapse_wpapper">
        <Collapse items={consumablesAndMultiplayerSubcategoryItems} />
      </div>
    </Flex>
  );
}
