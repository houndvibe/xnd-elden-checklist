import { Layout, Input, Flex } from "antd";
import { SettingOutlined, QuestionCircleOutlined } from "@ant-design/icons";

const { Header: AppHeader } = Layout;

export default function Header() {
  return (
    <AppHeader
      style={{
        background: "#1f1f1f",
        padding: "0 20px",
        position: "sticky",
        color: "",
      }}
    >
      <Flex align="center" justify="space-between">
        <div
          style={{
            fontSize: 20,
            fontWeight: "bold",
            display: "flex",
            fontFamily: "Cinzel",
            flex: 1,
            justifyContent: "flex-start",
          }}
        >
          {"Xnd. Elden Ring Checklist"}
        </div>
        <div style={{ display: "flex", flex: 1, justifyContent: "center" }}>
          <Input.Search placeholder="Поиск..." allowClear />
        </div>
        <div
          style={{
            display: "flex",
            flex: 1,
            justifyContent: "flex-end",
            gap: 20,
          }}
        >
          <QuestionCircleOutlined style={{ fontSize: 20, color: "#fff" }} />
          <SettingOutlined style={{ fontSize: 20, color: "#fff" }} />
        </div>
      </Flex>
    </AppHeader>
  );
}
