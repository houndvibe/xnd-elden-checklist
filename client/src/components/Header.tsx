import { Layout, Input, Flex } from "antd";
import { SettingOutlined } from "@ant-design/icons";

const { Header: AppHeader } = Layout;

export default function Header() {
  return (
    <AppHeader
      style={{
        background: "#1f1f1f",
        padding: "0 20px",
        position: "sticky",
      }}
    >
      <Flex align="center" justify="space-between">
        <div
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "#fff",
            display: "flex",
            fontFamily: "Cinzel",
            flex: 1,
            justifyContent: "flex-start",
          }}
        >
          Xnd. Elden Ring Checklist
        </div>
        <div style={{ display: "flex", flex: 1, justifyContent: "center" }}>
          <Input.Search placeholder="Поиск..." allowClear />
        </div>
        <div style={{ display: "flex", flex: 1, justifyContent: "flex-end" }}>
          <SettingOutlined style={{ fontSize: 20, color: "#fff" }} />
        </div>
      </Flex>
    </AppHeader>
  );
}
