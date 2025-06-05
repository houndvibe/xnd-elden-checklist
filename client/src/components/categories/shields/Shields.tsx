import { Collapse, Flex } from "antd";
import SubCategoryLabel from "../../ui/SubCategoryLabel";

import SubCategoryContent from "../../ui/SubCategoryContent";
import { getPercentage, getPieces } from "../../../lib";
import CategoryInfo from "../../ui/CategoryInfo";
import { useAppSelector } from "../../../typedDispatch";
import type { Shields } from "./data";

export default function Shields() {
  const shieldsData = useAppSelector((state) => state.shields.shieldsData);

  const mapShieldsDataToCollapseItems = (shieldsData: Shields) => {
    const keys = Object.keys(shieldsData) as (keyof Shields)[];
    const readableTitles: Record<string, string> = {
      smallShields: "Small Shields",
      mediumShields: "Medium Shields",
      greatShields: "Great Shields",
      thurstingShields: "Thrusting Shields",
    };

    return keys.map((key, index) => ({
      key: `${index + 1}`,
      label: (
        <SubCategoryLabel
          title={readableTitles[key] || key}
          percent={getPercentage(shieldsData[key])}
          pieces={getPieces(shieldsData[key]) as string}
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
      <CategoryInfo items={shieldsData} />
      <div style={{ width: "100%" }}>
        <Collapse items={shieldItems} />
      </div>
    </Flex>
  );
}
