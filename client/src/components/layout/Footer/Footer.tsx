import { Flex, Layout } from "antd";
import { YoutubeOutlined, InstagramOutlined } from "@ant-design/icons";
import Link from "antd/es/typography/Link";

import styles from "./Footer.module.scss";

const { Footer: AppFooter } = Layout;

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <AppFooter className={styles.footer}>
      <Flex align="center" justify="center" gap={20}>
        <Link
          href="https://www.youtube.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Flex align="center" gap={5}>
            <YoutubeOutlined />
            <span>Xndchannel</span>
          </Flex>
        </Link>

        <Link
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Flex align="center" gap={5}>
            <InstagramOutlined />
            <span>houndpiiit</span>
          </Flex>
        </Link>

        <span>{`© ${currentYear} Xnd. Elden Ring Checklist`}</span>
      </Flex>
    </AppFooter>
  );
}
