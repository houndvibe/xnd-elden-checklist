import { Tooltip } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import { t } from "../../../i18n";

export default function CustomTableTitle({
  title,
}: {
  title: "name" | "collected";
}) {
  return title == "name" ? (
    <Tooltip
      title={t("misc", "Sort: alphabet=> dlc asc/desc => legendary asc/desc")}
    >
      <div style={{ width: "100%" }}>{t("misc", "Name")}</div>
    </Tooltip>
  ) : (
    <Tooltip title={t("misc", "Sort: alphabet => checked asc/dlc")}>
      <div style={{ width: "100%" }}>
        <CheckOutlined />
      </div>
    </Tooltip>
  );
}
