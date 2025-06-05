import { Collapse, Flex } from "antd";
import SubCategoryLabel from "../../ui/SubCategoryLabel";

import { shieldsData, type Shields } from "./data";
import SubCategoryContent from "../../ui/SubCategoryContent";
import { getPercentage } from "../../../lib";
import CategoryInfo from "../../ui/CategoryInfo";

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
      />
    ),
    children: <SubCategoryContent dataSource={shieldsData[key]} />,
  }));
};

const shieldSections = mapShieldsDataToCollapseItems(shieldsData);

export default function Shields() {
  return (
    <Flex vertical align="center">
      <CategoryInfo />
      <div style={{ width: "100%" }}>
        <Collapse items={shieldSections} />
      </div>
    </Flex>
  );
}
