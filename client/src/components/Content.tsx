import { Layout } from "antd";
import Tabs from "./Tabs";

const { Content: AppContent } = Layout;

export default function Content() {
  return (
    <AppContent
      style={{
        flexGrow: 1,
        padding: 20,
        background: "#141414",
        overflowY: "scroll",
      }}
    >
      <Tabs />
    </AppContent>
  );
}
