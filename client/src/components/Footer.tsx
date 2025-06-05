import { Layout } from "antd";

const { Footer: AppFooter } = Layout;

export default function Footer() {
  return (
    <AppFooter
      style={{
        textAlign: "center",
        background: "#1f1f1f",
        color: "#999",
      }}
    >
      © {new Date().getFullYear()} Xnd. Elden Ring Checklist
    </AppFooter>
  );
}
