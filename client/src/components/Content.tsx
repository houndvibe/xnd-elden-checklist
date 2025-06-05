import { Layout } from "antd";

const { Content: AppContent } = Layout;

export default function Content() {
  return (
    <AppContent
      style={{
        flexGrow: 1,
        padding: 20,
        background: "#141414",
      }}
    >
      <div style={{ color: "#fff" }}>Контент</div>
    </AppContent>
  );
}
