import { Layout, Input, Flex } from "antd";
import { SettingOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import styles from "./Header.module.scss";

const { Header: AppHeader } = Layout;

export default function Header() {
  return (
    <AppHeader className={styles.header}>
      <Flex align="center" justify="space-between">
        <div className={styles.title}>{"Xnd. Elden Ring Checklist"}</div>
        <div className={styles.searchWrapper}>
          <Input.Search placeholder="Поиск..." allowClear />
        </div>
        <div className={styles.icons}>
          <QuestionCircleOutlined className={styles.icon} />
          <SettingOutlined className={styles.icon} />
        </div>
      </Flex>
    </AppHeader>
  );
}
