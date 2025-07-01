import { Button, Flex, Switch } from "antd";
import { useAppDispatch, useAppSelector } from "../../../store/typedDispatch";
import { setFastcheck } from "../../../store/settingsSlice";
import { APP_PALETTE } from "../../../lib/consts";
import { t } from "../../../i18n";
import { trackEvent } from "../../../lib/ga";

export default function FastCheckSwitch() {
  const dispatch = useAppDispatch();
  const fastcheck = useAppSelector((state) => state.settings.fastcheck);

  const handleSwitch = (value: boolean) => {
    dispatch(setFastcheck(value));
    trackEvent("Toggle Fastcheck", "UI", {
      label: "Fastcheck toggle",
      value: value ? 1 : 0,
      state: value ? "enabled" : "disabled",
    });
  };

  return (
    <Flex align="center" gap={10}>
      <Button type="text" size="small" onClick={() => handleSwitch(false)}>
        <span
          style={
            !fastcheck
              ? {
                  color: APP_PALETTE.textPrimary,
                }
              : {}
          }
        >
          {" "}
          {t("misc", "Galery")}
        </span>
      </Button>
      <Switch
        size="small"
        checked={fastcheck}
        onChange={() => handleSwitch(!fastcheck)}
      />
      <Button type="text" size="small">
        <span
          style={
            fastcheck
              ? {
                  color: APP_PALETTE.textPrimary,
                }
              : {}
          }
          onClick={() => handleSwitch(true)}
        >
          {" "}
          {t("misc", "Fast-check")}
        </span>
      </Button>
    </Flex>
  );
}
