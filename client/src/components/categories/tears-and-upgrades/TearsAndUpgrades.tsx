import { Collapse, Flex } from "antd";
import SubCategoryContent from "../../ui/SubCategoryContent/SubCategoryContent";
import CategoryInfo from "../../ui/CategotyInfo/CategoryInfo";
import { useAppSelector } from "../../../store/typedDispatch";

import SubCategoryLabel from "../../ui/SubCategoryLabel/SubCategoryLabel";
import type { TearsOrUpgradesCategoryMap } from "../../../global-types";
import { toTitleCaseFromCamel } from "../../../lib/utils/converters";

export default function TearsAndUpgrades() {
  const tearsAndUpgradesData = useAppSelector(
    (state) => state.collection.collectionData.tearsAndUpgradesData
  );

  const tearsAndUpgradesSubcategoryItems = Object.entries(
    tearsAndUpgradesData
  ).map(([key, data], index) => ({
    key: `${index + 1}`,
    label: (
      <SubCategoryLabel
        title={toTitleCaseFromCamel(key as keyof TearsOrUpgradesCategoryMap)}
        data={data}
      />
    ),
    children: (
      <SubCategoryContent
        dataSource={data}
        category={key as keyof TearsOrUpgradesCategoryMap}
      />
    ),
  }));

  return (
    <Flex vertical align="center">
      <Flex className="category_wallpaper tears_wallpaper">
        <CategoryInfo title={"Tears & Upgrades"} items={tearsAndUpgradesData} />
      </Flex>
      <div className="collapse_wpapper">
        <Collapse items={tearsAndUpgradesSubcategoryItems} />
      </div>
    </Flex>
  );
}
