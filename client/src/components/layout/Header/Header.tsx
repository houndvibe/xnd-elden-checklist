import { Layout, Image } from "antd";
import {
  QuestionCircleOutlined,
  TranslationOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../store/typedDispatch";
import { setShowSettings } from "../../../store/settingsSlice";

import SearchWithSuggestions from "../../ui/Search/Search";

import logo from "../../../assets/logo.png";
import styles from "./Header.module.scss";

const { Header: AppHeader } = Layout;

export default function Header() {
  const dispatch = useAppDispatch();
  const showSettings = useAppSelector((state) => state.settings.showSettings);

  const handleToggleSettings = () => {
    dispatch(setShowSettings(!showSettings));
  };

  return (
    <AppHeader className={styles.header}>
      <div className={styles.wrapper}>
        <NavLink to="/dashboard" className={styles.title}>
          <Image src={logo} height={50} preview={false} />
        </NavLink>

        <div className={styles.searchWrapper}>
          <SearchWithSuggestions />
        </div>

        <div className={styles.icons}>
          <SettingOutlined
            className={styles.icon}
            onClick={handleToggleSettings}
            title="Settings"
          />
          <QuestionCircleOutlined className={styles.icon} title="Help" />
          <TranslationOutlined className={styles.icon} title="Language" />
        </div>
      </div>
    </AppHeader>
  );
}
