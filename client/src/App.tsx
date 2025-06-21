import { Layout, ConfigProvider, theme } from "antd";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import Content from "./components/layout/Content/Content";
import "./styles/reset.scss";
import "./styles/global.scss";
import { HashRouter } from "react-router-dom";
import { useEffect } from "react";

declare global {
  interface Window {
    electronAPI?: {
      zoom: (dir: number) => void;
    };
  }
}

const App = () => {
  const isElectron = !!window.electronAPI;

  useEffect(() => {
    if (!isElectron) return; // зум отключён в браузере

    const handler = (e: WheelEvent) => {
      if (e.ctrlKey) {
        e.preventDefault();
        const direction = e.deltaY < 0 ? 1 : -1;
        window.electronAPI?.zoom?.(direction);
      }
    };

    window.addEventListener("wheel", handler, { passive: false });

    return () => {
      window.removeEventListener("wheel", handler);
    };
  }, []);

  return (
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      <HashRouter>
        <div className="container">
          <Layout className="layout">
            <Header />
            <Content />
            <Footer />
          </Layout>
        </div>
      </HashRouter>
    </ConfigProvider>
  );
};

export default App;
