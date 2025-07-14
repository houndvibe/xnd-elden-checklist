import { Divider, Flex, Switch } from "antd";
/* import { NavLink } from "react-router-dom"; */

import { useAppDispatch, useAppSelector } from "../../../store/typedDispatch";
import { setSpoilers, toggleFCNames } from "../../../store/settingsSlice";

/* import { APP_PALETTE } from "../../../lib/consts"; */

/* import ZoomWidget from "./ZoomWidget"; */
import ImportCollectionWidget from "./ImportCollectionWidget";
import LangWidget from "./LangWidget";
import { t } from "../../../i18n";
import ClearProgressWidget from "./ClearProgressWidget";
import CategoriesWidget from "./CategoriesWidget";

export default function SettingsPannel() {
  const dispatch = useAppDispatch();

  const spoilers = useAppSelector((state) => state.settings.spoilers);
  const showFCNames = useAppSelector((state) => state.settings.showFCNames);
  /*   const storedDiscovery = useAppSelector(
    (state) => state.discovery.calculatedDiscovery
  ); */

  /*   const checkpoints = useAppSelector((state) => state.checkpoints.checkpoints); */

  /*   const isElectron = !!window.electronAPI; */

  return (
    <>
      <Flex gap={10} align="center">
        <LangWidget />
        <span>|</span>
        <Flex gap={6} align="center">
          <span>{t("misc", "Spoilers")}:</span>
          <Switch
            size="small"
            checked={spoilers}
            onChange={(checked) => dispatch(setSpoilers(checked))}
          />
          <span>|</span>
          <span>{t("misc", "f/c. names")}:</span>
          <Switch
            size="small"
            checked={showFCNames}
            onChange={() => dispatch(toggleFCNames())}
          />
        </Flex>
        {/*         {isElectron && (
          <>
            <span>|</span>
            <ZoomWidget />
          </>
        )}
        <span>|</span>
        <FastCheckSwitch />
        <NavLink to="/discoveryCalculator">
          <Flex gap={6} align="center">
            <span>{t("misc", "Discovery")} :</span>
            <span style={{ color: APP_PALETTE.textPrimary }}>
              {storedDiscovery}
            </span>
          </Flex>
        </NavLink>
        <span>|</span>
        <NavLink to="/checkpoints">
          <Flex gap={6} align="center">
            <span>{t("misc", "Checkpoints")} :</span>
            <span style={{ color: APP_PALETTE.textPrimary }}>
              {checkpoints.length}
            </span>
          </Flex>
        </NavLink> */}
        <span>|</span>
        <ImportCollectionWidget />
        <span>|</span>
        <ClearProgressWidget />
      </Flex>
      <Divider size="small" />
      <Flex>
        <CategoriesWidget />
      </Flex>

      <Divider size="small" />
    </>
  );
}
