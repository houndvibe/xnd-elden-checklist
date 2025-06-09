import { Flex, Layout } from "antd";
import styles from "./Footer.module.scss";
import { YoutubeOutlined, InstagramOutlined } from "@ant-design/icons";
import Link from "antd/es/typography/Link";

const { Footer: AppFooter } = Layout;

export default function Footer() {
  return (
    <AppFooter className={styles.footer}>
      <Flex align="center" justify="center" gap={20}>
        <Link
          href={"https://www.youtube.com/"}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Flex align="center" gap={5}>
            <YoutubeOutlined />
            <>{"Xndchannel"}</>
          </Flex>
        </Link>

        <Link
          href={"https://www.instagram.com/"}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Flex align="center" gap={5}>
            <InstagramOutlined />
            <>{"houndpiiit"}</>
          </Flex>
        </Link>
        <> {`© ${new Date().getFullYear()} Xnd. Elden Ring Checklist`}</>
      </Flex>
    </AppFooter>
  );
}
