import { useState } from "react";
import { Layout, Image, Tooltip } from "antd";
import {
  QuestionCircleOutlined,
  SettingOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../store/typedDispatch";
import { setShowSettings, setStopWelcome } from "../../../store/settingsSlice";

import SearchWithSuggestions from "../../ui/Search/Search";

import styles from "./Header.module.scss";

import InfoModal from "./InfoModal";
import { t } from "../../../i18n";

import logo from "../../../../public/assets/logo.png";
import BoostersModal from "./BoostersModal";

import FastCheckSwitch from "../../ui/SettingsPannel/FastCheckSwitch";
import { itemCategories } from "../../../lib/consts";
import { ItemCategory } from "../../../global-types";
import { useLocation } from "react-router-dom";
const { Header: AppHeader } = Layout;

export default function Header() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { showSettings, showWelcome } = useAppSelector(
    (state) => state.settings
  );

  const [isHelpModalOpen, setIsHelpModalOpen] = useState(showWelcome);
  const [isBoostersModalOpen, setIsBoostersModalOpen] = useState(false);

  const handleToggleSettings = () => {
    dispatch(setShowSettings(!showSettings));
  };

  const openHelpModal = () => {
    setIsHelpModalOpen(true);
  };

  const openBoostersModal = () => {
    setIsBoostersModalOpen(true);
  };

  const closeHelpModal = () => {
    dispatch(setStopWelcome());
    setIsHelpModalOpen(false);
  };

  console.log(location.pathname);

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
          {itemCategories.includes(
            location.pathname.split("/")[1] as ItemCategory
          ) && <FastCheckSwitch />}
          <Tooltip title={t("misc", "Thanks")}>
            <HeartOutlined
              className={styles.icon}
              onClick={openBoostersModal}
            />
          </Tooltip>

          <Tooltip title={t("misc", "Tools")}>
            <SettingOutlined
              className={styles.icon}
              onClick={handleToggleSettings}
            />
          </Tooltip>
          <Tooltip title={t("misc", "Info")}>
            <QuestionCircleOutlined
              className={styles.icon}
              onClick={openHelpModal}
            />
          </Tooltip>
        </div>
      </div>
      <BoostersModal
        open={isBoostersModalOpen}
        onClose={() => setIsBoostersModalOpen(false)}
      />
      <InfoModal isOpen={isHelpModalOpen} onCancel={closeHelpModal} />
    </AppHeader>
  );
}
