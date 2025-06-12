import { Flex, Image, Popover, Spin } from "antd";
import styles from "./SubCategoryContent.module.scss";
import { Item } from "../../../global-types";
import Link from "antd/es/typography/Link";
import { calculateItemDropChance, truncateText } from "../../../lib/utils/misc";
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
    droppedBy,
    vendor,
    placementDescription,
  } = currentItem || {};

  const dropRate = droppedBy?.dropRate ?? 100;
  const calculatedDropRate = calculateItemDropChance(dropRate, storedDiscovery);

  const renderDropInfo = () => (
    <div
      className={`${styles.dropInfo} ${spoilers ? "block-spoiler" : ""}`}
      style={{ textAlign: "right" }}
    >
      <div>Drop chance:</div>
      <Popover
        placement={"left"}
        content={<Image src={droppedBy?.imgUrl} style={{ maxHeight: 400 }} />}
      >
        <Link href={droppedBy?.link} target="_blank" rel="noopener noreferrer">
          <span className={styles.linkEnemy}>
            {truncateText(droppedBy?.name, 17)}
          </span>
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
        <Popover
          content={<Image src={vendor.imgUrl} style={{ maxHeight: 400 }} />}
        >
          <Link href={vendor.link} target="_blank" rel="noopener noreferrer">
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
    placementDescription && (
      <div className={spoilers ? "block-spoiler" : ""}>
        <span className={styles.subtitle}>Placement: </span>
        <span className={styles.text}>{placementDescription}</span>
      </div>
    );

  const renderMainContent = () => (
    <>
      <Flex vertical align="center" gap={15}>
        <span className={styles.title}>{name}</span>
        <Image
          height={400}
          src={img.url!}
          alt="no image"
          preview={false}
          placeholder={
            <div
              className={styles.spin}
              style={{
                height: 400,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Spin size="large" />
            </div>
          }
        />
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
      {img.url && droppedBy && renderDropInfo()}
      {img.url ? renderMainContent() : <div className={styles.placeholder} />}
    </Flex>
  );
}
