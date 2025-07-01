import { Flex, Layout } from "antd";
import { YoutubeOutlined /* InstagramOutlined */ } from "@ant-design/icons";
import Link from "antd/es/typography/Link";

import styles from "./Footer.module.scss";
import { CURRENT_APP_VERSION } from "../../../lib/consts";

const { Footer: AppFooter } = Layout;

export default function Footer() {
  /* const currentYear = new Date().getFullYear(); */

  return (
    <AppFooter className={styles.footer}>
      <Flex align="center" justify="space-around" gap={20}>
        {/* <span>{`${currentYear} XnD's Elden Compendium`}</span> */}
        <span>{`- XnD's Elden Compendium ${CURRENT_APP_VERSION} -`}</span>
        <Link
          href="https://www.youtube.com/@XnDsChanel"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Flex align="center" gap={5}>
            <YoutubeOutlined />
            <span className={styles.link}>XnDsChanel</span>
          </Flex>
        </Link>
        {/* 
        <Link
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Flex align="center" gap={5}>
            <InstagramOutlined />
            <span className={styles.link}>houndpiiit</span>
          </Flex>
        </Link> */}

        <Link
          href="https://boosty.to/xnd"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Flex align="center" gap={5}>
            <span className={styles.link}>-Boosty-</span>
          </Flex>
        </Link>

        <Link
          href="https://www.patreon.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Flex align="center" gap={5}>
            <span className={styles.link}>-Patreon-</span>
          </Flex>
        </Link>
      </Flex>
    </AppFooter>
  );
}
