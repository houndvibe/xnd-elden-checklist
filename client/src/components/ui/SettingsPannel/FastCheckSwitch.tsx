import { Switch } from "antd";
import { useAppDispatch, useAppSelector } from "../../../store/typedDispatch";
import { setFastcheck } from "../../../store/settingsSlice";
import { APP_PALETTE } from "../../../lib/consts";
import { t } from "../../../i18n";

export default function FastCheckSwitch() {
  const dispatch = useAppDispatch();
  const fastcheck = useAppSelector((state) => state.settings.fastcheck);
  return (
    <>
      <span
        style={
          !fastcheck
            ? {
                color: APP_PALETTE.textPrimary,
              }
            : {}
        }
      >
        {t("misc", "Galery")}
      </span>
      <Switch
        size="small"
        checked={fastcheck}
        onChange={() => dispatch(setFastcheck())}
      />
      <span
        style={
          fastcheck
            ? {
                color: APP_PALETTE.textPrimary,
              }
            : {}
        }
      >
        {t("misc", "Fast-check")}
      </span>
    </>
  );
}
