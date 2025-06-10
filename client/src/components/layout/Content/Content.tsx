import Tabs from "./Tabs";
import { Layout } from "antd";
import styles from "./Content.module.scss";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

const { Content: AppContent } = Layout;

export default function Content() {
  return (
    <AppContent className={styles.content}>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/:tabKey" element={<Tabs />} />
        </Routes>
      </Router>
    </AppContent>
  );
}
