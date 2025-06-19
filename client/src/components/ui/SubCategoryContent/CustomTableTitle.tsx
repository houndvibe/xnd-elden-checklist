import { Tooltip } from "antd";
import { CheckOutlined } from "@ant-design/icons";

export default function CustomTableTitle({
  title,
}: {
  title: "name" | "collected";
}) {
  return title == "name" ? (
    <Tooltip title={"Sort: alphabet=> dlc asc/desc => legendary asc/desc"}>
      <div style={{ width: "100%" }}>{"Name"}</div>
    </Tooltip>
  ) : (
    <Tooltip title={"Sort: alphabet => checked asc/dlc"}>
      <div style={{ width: "100%" }}>
        <CheckOutlined />
      </div>
    </Tooltip>
  );
}
