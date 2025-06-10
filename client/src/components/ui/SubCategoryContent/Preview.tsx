import { Flex, Image, Popover } from "antd";
import styles from "./SubCategoryContent.module.scss";
import { Item } from "../../../global-types";
import Link from "antd/es/typography/Link";
import { calculateItemDropChance } from "../../../lib/utils/misc";
import { useAppSelector } from "../../../store/typedDispatch";

interface PreviewProps {
  img: {
    url: string | undefined;
    name: string;
  };
  dataSource: Item[];
}

export default function Preview({ img, dataSource }: PreviewProps) {
  const storedDiscovery = useAppSelector(
    (state) => state.discovery.calculatedDiscovery
  );

  const findItemByName = (name: string): Item | undefined => {
    const directMatch = dataSource.find((item) => item.name === name);
    if (directMatch) return directMatch;

    for (const item of dataSource) {
      if (item.type !== "armour" || !("items" in item)) continue;

      for (const subItem of item.items) {
        if (subItem.name === name) return subItem;

        const childMatch = subItem.children
          ? Object.values(subItem.children).find((child) => child.name === name)
          : undefined;

        if (childMatch) return childMatch;
      }
    }

    return undefined;
  };

  const currentItem = findItemByName(img.name);
  const {
    name = "123",
    description = "",
    dropFrom,
    vendor,
    placement,
  } = currentItem || {};

  const dropRate = dropFrom?.dropRatte ?? 100;
  const calculatedDropRate = calculateItemDropChance(dropRate, storedDiscovery);

  const renderDropInfo = () => (
    <div className={styles.dropInfo} style={{ textAlign: "right" }}>
      <div>Drop chance:</div>
      <Popover content={<Image src={dropFrom?.imgUrl} />}>
        <Link href={dropFrom?.link}>
          <span className={styles.prviewLinkEnemy}>{dropFrom?.name}</span>
        </Link>
      </Popover>
      <div>{`Base: ${dropRate}%`}</div>
      <div>{`My setup: ${calculatedDropRate}%`}</div>
    </div>
  );

  const renderMainContent = () => (
    <>
      <Flex vertical align="center" gap={15}>
        <span className={styles.title}>{name}</span>
        <Image height={400} src={img.url} preview={false} alt="no image" />
      </Flex>

      <Flex vertical gap={30}>
        <div>
          <span className={styles.info}>Description: </span>
          <span className={styles.text}>{description}</span>
        </div>

        {vendor && (
          <div>
            <span className={styles.info}>Vendor: </span>
            <Popover content={<Image src={vendor?.imgUrl} />}>
              <Link href={vendor?.link}>
                <span className={styles.prviewLinkVendor}>{vendor?.name}</span>
              </Link>
            </Popover>
          </div>
        )}

        {placement && (
          <div>
            <span className={styles.info}>Placement: </span>
            <span className={styles.text}>{placement?.description}</span>
          </div>
        )}
      </Flex>
    </>
  );

  return (
    <Flex className={styles.preview} vertical align="center" gap={30}>
      {img.url && dropFrom && renderDropInfo()}
      {img.url ? renderMainContent() : <div className={styles.placeholder} />}
    </Flex>
  );
}
