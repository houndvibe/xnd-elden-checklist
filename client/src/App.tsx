import { Layout, ConfigProvider, theme } from "antd";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import Content from "./components/layout/Content/Content";
import "./styles/reset.scss";
import "./styles/global.scss";
import { BrowserRouter as Router } from "react-router-dom";

const App = () => {
  return (
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      <Router>
        <div className="container">
          <Layout className="layout">
            <Header />
            <Content />
            <Footer />
          </Layout>
        </div>
      </Router>
    </ConfigProvider>
  );
};

export default App;
