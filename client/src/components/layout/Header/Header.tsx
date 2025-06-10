import { Layout, Image } from "antd";
import { SettingOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import styles from "./Header.module.scss";
import logo from "../../../assets/logo.png";
import { NavLink } from "react-router-dom";
import SearchWithSuggestions from "../../ui/Search/Search";
const { Header: AppHeader } = Layout;

export default function Header() {
  return (
    <AppHeader className={styles.header}>
      <div className={styles.wrapper}>
        <NavLink to={"/dashboard"}>
          <div className={styles.title}>
            <Image src={logo} height={50} preview={false} />
          </div>
        </NavLink>
        <div className={styles.searchWrapper}>
          <SearchWithSuggestions />
        </div>
        <div className={styles.icons}>
          <QuestionCircleOutlined className={styles.icon} />
          <SettingOutlined className={styles.icon} />
        </div>
      </div>
    </AppHeader>
  );
}
