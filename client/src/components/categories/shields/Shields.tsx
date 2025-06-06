import { Collapse, Flex } from "antd";
import SubCategoryLabel from "../../ui/SubCategoryLabel";
import SubCategoryContent from "../../ui/SubCategoryContent";
import CategoryInfo from "../../ui/CategotyInfo/CategoryInfo";
import { useAppSelector } from "../../../store/typedDispatch";
import type { ShieldCategoryMap } from "./types";

export default function Shields() {
  const shieldsData = useAppSelector((state) => state.shields.shieldsData);

  const mapShieldsDataToCollapseItems = (shieldsData: ShieldCategoryMap) => {
    const keys = Object.keys(shieldsData) as (keyof ShieldCategoryMap)[];
    const readableTitles: Record<string, string> = {
      smallShields: "Small Shields",
      mediumShields: "Medium Shields",
      greatShields: "Great Shields",
      thrustingShields: "Thrusting Shields",
    };

    return keys.map((key, index) => ({
      key: `${index + 1}`,
      label: (
        <SubCategoryLabel
          title={readableTitles[key] || key}
          data={shieldsData[key]}
        />
      ),
      children: (
        <SubCategoryContent dataSource={shieldsData[key]} category={key} />
      ),
    }));
  };

  const shieldItems = mapShieldsDataToCollapseItems(shieldsData);

  return (
    <Flex vertical align="center">
      <Flex className="category_wallpaper" align="center" justify="center">
        <CategoryInfo items={shieldsData} />
      </Flex>

      <div style={{ width: "100%" }}>
        <Collapse items={shieldItems} defaultActiveKey={1} />
      </div>
    </Flex>
  );
}
