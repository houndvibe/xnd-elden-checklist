import { Layout } from "antd";
import { Routes, Route, Navigate } from "react-router-dom";

import Tabs from "./Tabs";
import styles from "./Content.module.scss";

const { Content: AppContent } = Layout;

export default function Content() {
  return (
    <AppContent className={styles.content}>
      <Routes>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path=":tabKey" element={<Tabs />} />
      </Routes>
    </AppContent>
  );
}
