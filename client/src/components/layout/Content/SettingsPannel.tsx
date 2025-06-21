import { Divider, Flex, Switch } from "antd";
import { NavLink } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../store/typedDispatch";
import { setSpoilers } from "../../../store/settingsSlice";

import { APP_PALETTE } from "../../../lib/consts";

import ZoomWidget from "./ZoomWidget";
import ImportCollectionWidget from "./ImportCollectionWidget";

export default function SettingsPannel() {
  const dispatch = useAppDispatch();

  const spoilers = useAppSelector((state) => state.settings.spoilers);
  const storedDiscovery = useAppSelector(
    (state) => state.discovery.calculatedDiscovery
  );

  const isElectron = !!window.electronAPI;

  return (
    <>
      <Flex gap={10} align="center">
        <NavLink to="/discoveryCalculator">
          <Flex gap={6} align="center">
            <span>discovery:</span>
            <span style={{ color: APP_PALETTE.textPrimary }}>
              {storedDiscovery}
            </span>
          </Flex>
        </NavLink>
        <span>|</span>
        <Flex gap={6}>
          <span>spoilers</span>
          <Switch
            size="small"
            checked={spoilers}
            onChange={(checked) => dispatch(setSpoilers(checked))}
          />
        </Flex>
        {isElectron && (
          <>
            <span>|</span>
            <ZoomWidget />
          </>
        )}
        <span>|</span>
        <ImportCollectionWidget />
        <span>|</span>
        {/*  <LangWidget /> */}
      </Flex>

      <Divider size="small" />
    </>
  );
}
