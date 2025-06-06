import { Collapse, Flex } from "antd";

import SubCategoryContent from "../../ui/SubCategoryContent/SubCategoryContent";
import CategoryInfo from "../../ui/CategotyInfo/CategoryInfo";
import { useAppSelector } from "../../../store/typedDispatch";
import SubCategoryLabel from "../../ui/SubCategoryLabel/SubCategoryLabel";
import type { ShieldSubCategoryMap } from "../../../global-types";
import { toTitleCaseFromCamel } from "../../../lib/utils/converters";

export default function Shields() {
  const shieldsData = useAppSelector((state) => state.shields.shieldsData);

  const shildsSubcategoryItems = Object.entries(shieldsData).map(
    ([key, data], index) => ({
      key: `${index + 1}`,
      label: (
        <SubCategoryLabel
          title={toTitleCaseFromCamel(key as keyof ShieldSubCategoryMap)}
          data={data}
        />
      ),
      children: (
        <SubCategoryContent
          dataSource={data}
          category={key as keyof ShieldSubCategoryMap}
        />
      ),
    })
  );

  return (
    <Flex vertical align="center">
      <Flex className="category_wallpaper shields_wallpaper">
        <CategoryInfo title={"Shields"} items={shieldsData} />
      </Flex>
      <div className="collapse_wpapper">
        <Collapse items={shildsSubcategoryItems} defaultActiveKey={1} />
      </div>
    </Flex>
  );
}
