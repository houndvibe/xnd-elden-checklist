import { Layout, Image } from "antd";
import {
  QuestionCircleOutlined,
  TranslationOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import styles from "./Header.module.scss";
import logo from "../../../assets/logo.png";
import { NavLink } from "react-router-dom";
import SearchWithSuggestions from "../../ui/Search/Search";
import { useAppDispatch, useAppSelector } from "../../../store/typedDispatch";
import { setShowSettings } from "../../../store/settingsSlice";
const { Header: AppHeader } = Layout;

export default function Header() {
  const dispatch = useAppDispatch();
  const { showSettings } = useAppSelector((state) => state.settings);
  const handleToggleSettings = () => {
    dispatch(setShowSettings(!showSettings));
  };
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
          <SettingOutlined
            className={styles.icon}
            onClick={handleToggleSettings}
          />
          <QuestionCircleOutlined className={styles.icon} />
          <TranslationOutlined className={styles.icon} />
        </div>
      </div>
    </AppHeader>
  );
}
