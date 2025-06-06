import Tabs from "./Tabs";
import { Layout } from "antd";
import styles from "./Content.module.scss";

const { Content: AppContent } = Layout;

export default function Content() {
  return (
    <AppContent className={styles.content}>
      <Tabs />
    </AppContent>
  );
}
