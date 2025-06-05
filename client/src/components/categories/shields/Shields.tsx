import { Collapse, Flex } from "antd";
import SubCategoryLabel from "../../ui/SubCategoryLabel";
import SubCategoryContent from "../../ui/SubCategoryContent";
import CategoryInfo from "../../ui/CategoryInfo";
import { useAppSelector } from "../../../store/typedDispatch";
import type { Shields } from "./data";
import "./style.scss";

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
          data={shieldsData[key]}
        />
      ),
      children: (
        <SubCategoryContent dataSource={shieldsData[key]} category={key} />
      ),
    }));
  };

  const shieldItems = mapShieldsDataToCollapseItems(shieldsData);

  /*   const [items, setItems] = useState([]);
  useEffect(() => {
    fetch("https://eldenring.fanapis.com/api/shields?limit=400")
      .then((res) => res.json())
      .then((data) => {
        setItems(data.data);
      });
  }, []);

  return items.map((item) => {
    return (
      <>
        <br />
        {item.name}
        <Image src={item.image} />
        <br />
        {item.description}
      </>
    );
  }); */

  return (
    <Flex vertical align="center">
      <div className="category_wallpaper">
        <CategoryInfo items={shieldsData} />
      </div>

      <div style={{ width: "100%" }}>
        <Collapse items={shieldItems} defaultActiveKey={1} />
      </div>
    </Flex>
  );
}
