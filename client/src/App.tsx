import { Layout, ConfigProvider, theme } from "antd";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import Content from "./components/layout/Content/Content";
import "./styles/reset.scss";
import "./styles/global.scss";

const App = () => {
  return (
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      <div
        className="background"
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Layout
          style={{
            maxWidth: 1400,
            height: "100vh",
          }}
        >
          <Header />
          <Content />
          <Footer />
        </Layout>
      </div>
    </ConfigProvider>
  );
};

export default App;
