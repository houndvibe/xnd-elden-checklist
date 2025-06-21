import { Layout, ConfigProvider, theme } from "antd";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import Content from "./components/layout/Content/Content";
import "./styles/reset.scss";
import "./styles/global.scss";
import { HashRouter } from "react-router-dom";

const App = () => {
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
