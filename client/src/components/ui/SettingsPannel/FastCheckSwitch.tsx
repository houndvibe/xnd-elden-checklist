import { Switch } from "antd";
import { useAppDispatch, useAppSelector } from "../../../store/typedDispatch";
import { setFastcheck } from "../../../store/settingsSlice";

export default function FastCheckSwitch() {
  const dispatch = useAppDispatch();
  const fastcheck = useAppSelector((state) => state.settings.fastcheck);
  return (
    <>
      <Switch checked={fastcheck} onChange={() => dispatch(setFastcheck())} />
    </>
  );
}
