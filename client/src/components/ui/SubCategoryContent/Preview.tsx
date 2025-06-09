import { Flex, Image } from "antd";
import styles from "./SubCategoryContent.module.scss";
import { Item } from "../../../global-types";

export default function Preview({
  img,
  dataSource,
}: {
  img: {
    url: string | undefined;
    name: string;
  };
  dataSource: Item[];
}) {
  const getCurrentItem = (): Item | undefined => {
    // 1. Поиск на верхнем уровне
    const directMatch = dataSource.find((item) => item.name === img.name);
    if (directMatch) return directMatch;

    // 2. Поиск в armour -> items -> children
    for (const item of dataSource) {
      if (item.type !== "armour" || !("items" in item)) continue;

      for (const subItem of item.items) {
        if (subItem.name === img.name) return subItem;

        const children = subItem?.children;
        if (children) {
          const match = Object.values(children).find(
            (child) => child.name === img.name
          );
          if (match) return match;
        }
      }
    }

    return undefined;
  };

  const currentItem: Item | undefined = getCurrentItem();

  const info =
    currentItem && currentItem.type === "infoItems"
      ? currentItem.info
      : "Staff fashioned from the tail-fingers of Metyr, the Mother of Fingersand the microcosm raised aloft over the crux they form.Catalyst for casting both sorceries and incantations.The Mother received signs from the Greater Will from the beyond of the microcosmDespite being broken and abandoned,she kept waiting for another message to come.";
  const location =
    currentItem && currentItem.type === "infoItems"
      ? currentItem.location
      : "Staff of the Academy of Raya Lucaria,embedded with a turquoise glintstone.Only a recognized sorcerer is permitted to wield this staff.";

  const name = currentItem ? currentItem.name : "123";

  return (
    <>
      <Flex className={styles.preview} vertical align="center" gap={30}>
        {img.url && (
          <div className={styles.dropInfo} style={{ textAlign: "right" }}>
            <div>Drop chance:</div>
            <div>{`Base: ${10}%`}</div>
            <div>{`My setup: ${18}%`}</div>
          </div>
        )}

        {img.url ? (
          <>
            <Flex vertical align="center" gap={15}>
              <span className={styles.title}>{name}</span>
              <Image
                height={400}
                src={img.url}
                preview={false}
                alt={"no image"}
              />
            </Flex>

            <Flex vertical gap={30}>
              <div>
                <span className={styles.info}>Description: </span>
                {info}
              </div>
              <div>
                <span className={styles.info}>Location: </span>
                {location}
              </div>
            </Flex>
          </>
        ) : (
          <div className={styles.placeholder}></div>
        )}
      </Flex>
    </>
  );
}
