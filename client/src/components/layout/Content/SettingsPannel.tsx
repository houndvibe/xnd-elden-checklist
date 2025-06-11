import { Divider, Flex, Switch } from "antd";
import { setSpoilers } from "../../../store/settingsSlice";
import { useAppDispatch, useAppSelector } from "../../../store/typedDispatch";

export default function SettingsPannel() {
  const dispatch = useAppDispatch();
  const { spoilers } = useAppSelector((state) => state.settings);
  const storedDiscovery = useAppSelector(
    (state) => state.discovery.calculatedDiscovery
  );

  return (
    <>
      <Flex gap={10}>
        <Flex gap={10}>
          <div>{"discovery:"}</div>
          <div>{storedDiscovery}</div>
        </Flex>
        {"| "}
        <Flex gap={10}>
          <>{"spoilers"}</>
          <Switch
            checked={spoilers}
            size="small"
            onChange={(v) => dispatch(setSpoilers(v))}
          />
        </Flex>
        {"| "}
      </Flex>

      <Divider size="small" />
    </>
  );
}
