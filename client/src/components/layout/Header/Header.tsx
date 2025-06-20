import { useState } from "react";
import { Layout, Image } from "antd";
import { QuestionCircleOutlined, SettingOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../store/typedDispatch";
import { setShowSettings, setStopWelcome } from "../../../store/settingsSlice";

import SearchWithSuggestions from "../../ui/Search/Search";

import logo from "../../../assets/logo.png";
import styles from "./Header.module.scss";

import {} from "antd";
import InfoModal from "./InfoModal";

const { Header: AppHeader } = Layout;

export default function Header() {
  const dispatch = useAppDispatch();
  const { showSettings, showWelcome } = useAppSelector(
    (state) => state.settings
  );

  const [isHelpModalOpen, setIsHelpModalOpen] = useState(showWelcome);

  const handleToggleSettings = () => {
    dispatch(setShowSettings(!showSettings));
  };

  const openHelpModal = () => {
    setIsHelpModalOpen(true);
  };

  const closeHelpModal = () => {
    dispatch(setStopWelcome());
    setIsHelpModalOpen(false);
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
          <QuestionCircleOutlined
            className={styles.icon}
            title="Help"
            onClick={openHelpModal}
          />
          {/*   <TranslationOutlined className={styles.icon} title="Language" /> */}
        </div>
      </div>
      <InfoModal isOpen={isHelpModalOpen} onCancel={closeHelpModal} />
    </AppHeader>
  );
}
