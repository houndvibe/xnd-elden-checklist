import { Layout } from "antd";
import styles from "./Footer.module.scss";

const { Footer: AppFooter } = Layout;

export default function Footer() {
  return (
    <AppFooter className={styles.footer}>
      {`© ${new Date().getFullYear()} Xnd. Elden Ring Checklist`}
    </AppFooter>
  );
}
