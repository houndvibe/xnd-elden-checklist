import { Flex, Image, Select } from "antd";
import { DiscoveryItem } from "./data-discovery";
import styles from "./DiscoveryCalculator.module.scss";

interface DiscoveryItemSelectProps {
  items: DiscoveryItem[];
  placeholder?: string;
  value: string | null;
  onChange: React.Dispatch<React.SetStateAction<string | null>>;
}

const renderItemDetails = (item: DiscoveryItem) => {
  const details = [];

  if (item.effect.arcaneGain > 0) {
    details.push(`Arcane: +${item.effect.arcaneGain}`);
  }

  if (item.effect.discoveryGain > 0) {
    details.push(`Discovery: +${item.effect.discoveryGain}`);
  }

  if (item.time) {
    details.push(`Duration: ${item.time}s`);
  }

  return details.join(" | ");
};

const renderOptionContent = (item: DiscoveryItem) => (
  <Flex vertical className={styles.optionContent}>
    <div className={styles.itemName}>{item.name}</div>
    <div className={styles.itemDetails}>{renderItemDetails(item)}</div>
  </Flex>
);

const renderItemImage = (item: DiscoveryItem) =>
  item.imgUrl && <Image src={item.imgUrl} height={50} preview={false} />;

export const DiscoveryItemSelect = ({
  items,
  placeholder = "Select an item",
  value,
  onChange,
}: DiscoveryItemSelectProps) => {
  return (
    <Select
      allowClear
      className={styles.select}
      placeholder={placeholder}
      optionLabelProp="label"
      value={value}
      onChange={onChange}
    >
      {items.map((item) => (
        <Select.Option key={item.name} value={item.name} label={item.name}>
          <Flex className={styles.optionContainer}>
            {renderOptionContent(item)}
            {renderItemImage(item)}
          </Flex>
        </Select.Option>
      ))}
    </Select>
  );
};
