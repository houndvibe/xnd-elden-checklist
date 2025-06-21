import { Button, Divider, Flex, Switch } from "antd";
import { NavLink } from "react-router-dom";
import { ZoomInOutlined, ZoomOutOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../../store/typedDispatch";
import { setSpoilers } from "../../../store/settingsSlice";

import { APP_PALETTE } from "../../../lib/consts";
import ImportCollection from "./CollectionImport";

export default function SettingsPannel() {
  const dispatch = useAppDispatch();

  const spoilers = useAppSelector((state) => state.settings.spoilers);
  const storedDiscovery = useAppSelector(
    (state) => state.discovery.calculatedDiscovery
  );

  const isElectron = !!window.electronAPI;
  console.log(isElectron);

  const zoomIn = () => window.electronAPI?.zoom?.(1);
  const zoomOut = () => window.electronAPI?.zoom?.(-1);
  const resetZoom = () => window.electronAPI?.zoom?.(0);

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
        {isElectron ? (
          <>
            {" "}
            <span>|</span>
            <Flex justify="center" align="center" gap={2}>
              <>Zoom</>
              <Button type="text" size="small" onClick={zoomIn}>
                <ZoomInOutlined />
              </Button>
              <span>/</span>
              <Button type="text" size="small" onClick={zoomOut}>
                <ZoomOutOutlined />
              </Button>
              <span>/</span>
              <Button type="text" size="small" onClick={resetZoom}>
                default
              </Button>
            </Flex>
          </>
        ) : null}

        <span>|</span>
        <ImportCollection />
        <span>|</span>
      </Flex>

      <Divider size="small" />
    </>
  );
}
