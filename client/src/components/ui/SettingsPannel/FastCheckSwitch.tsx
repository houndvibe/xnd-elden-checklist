import { Button, Flex, Switch } from "antd";
import { useAppDispatch, useAppSelector } from "../../../store/typedDispatch";
import { setFastcheck } from "../../../store/settingsSlice";
import { APP_PALETTE } from "../../../lib/consts";
import { t } from "../../../i18n";

export default function FastCheckSwitch() {
  const dispatch = useAppDispatch();
  const fastcheck = useAppSelector((state) => state.settings.fastcheck);
  return (
    <Flex align="center" gap={10}>
      <Button
        type="text"
        size="small"
        onClick={() => dispatch(setFastcheck(false))}
      >
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
        onChange={() => dispatch(setFastcheck(!fastcheck))}
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
          onClick={() => dispatch(setFastcheck(true))}
        >
          {" "}
          {t("misc", "Fast-check")}
        </span>
      </Button>
    </Flex>
  );
}
