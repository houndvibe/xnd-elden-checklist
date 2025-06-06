import { Flex, Image } from "antd";
import styles from "./SubCategoryContent.module.scss";

export default function Preview({ img }: { img: string | undefined }) {
  return (
    <Flex
      className={styles.preview}
      vertical
      justify="center"
      align="center"
      gap={50}
    >
      {img ? (
        <>
          <Image height={600} src={img} preview={false} alt={"no image"} />
          <>
            {
              "Starting equipment for the Prophet class. Dropped by Demi-Humans that wield it. A good location to find them is going north from South of the Lookout Tower site of grace in the Weeping Peninsula. There should be a group of four of them carrying this shield."
            }
          </>
        </>
      ) : (
        <div className={styles.placeholder}></div>
      )}
    </Flex>
  );
}
