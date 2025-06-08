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
  const currentItem = dataSource.find((item) => item.name == img.name);
  const info =
    currentItem && currentItem.type === "infoItems" ? currentItem.info : null;

  return (
    <Flex
      className={styles.preview}
      vertical
      justify="center"
      align="center"
      gap={50}
    >
      {img.url ? (
        <>
          <Image height={600} src={img.url} preview={false} alt={"no image"} />
          <div style={{ minHeight: 100, textAlign: "center" }}> {info}</div>
        </>
      ) : (
        <div className={styles.placeholder}></div>
      )}
    </Flex>
  );
}
