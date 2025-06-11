import { Flex, Image, Popover, Switch } from "antd";
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
  const { spoilers } = useAppSelector((state) => state.settings);

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
    name = "Unknown Item",
    description = "",
    dropFrom,
    vendor,
    placement,
  } = currentItem || {};

  const dropRate = dropFrom?.dropRatte ?? 100;
  const calculatedDropRate = calculateItemDropChance(dropRate, storedDiscovery);

  const renderDropInfo = () => (
    <div
      className={`${styles.dropInfo} ${spoilers ? "block-spoiler" : ""}`}
      style={{ textAlign: "right" }}
    >
      <div>Drop chance:</div>
      <Popover content={<Image src={dropFrom?.imgUrl} />}>
        <Link href={dropFrom?.link}>
          <span className={styles.linkEnemy}>{dropFrom?.name}</span>
        </Link>
      </Popover>
      <div>{`Base: ${dropRate}%`}</div>
      <div>{`My setup: ${calculatedDropRate}%`}</div>
    </div>
  );

  const renderDescriptionBlock = () => (
    <div>
      <span className={styles.subtitle}>Description: </span>
      <span className={styles.text}>{description}</span>
    </div>
  );

  const renderVendorBlock = () =>
    vendor && (
      <div className={spoilers ? "block-spoiler" : ""}>
        <span className={styles.subtitle}>Vendor: </span>
        <Popover content={<Image src={vendor.imgUrl} />}>
          <Link href={vendor.link}>
            <span
              className={`${styles.linkVendor} spoilers ? "text-spoiler" : ""`}
            >
              {vendor.name}
            </span>
          </Link>
        </Popover>
      </div>
    );

  const renderPlacementBlock = () =>
    placement && (
      <div className={spoilers ? "block-spoiler" : ""}>
        <span className={styles.subtitle}>Placement: </span>
        <span className={styles.text}>{placement.description}</span>
      </div>
    );

  const renderMainContent = () => (
    <>
      <Flex vertical align="center" gap={15}>
        <span className={styles.title}>{name}</span>
        <Image height={400} src={img.url!} preview={false} alt="no image" />
      </Flex>

      <Flex vertical gap={30}>
        {renderDescriptionBlock()}
        {renderVendorBlock()}
        {renderPlacementBlock()}
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
