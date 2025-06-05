import { Layout, ConfigProvider, theme } from "antd";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Content from "./components/Content";
import "./styles/reset.scss";

const App = () => {
  return (
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          background:
            "linear-gradient(90deg, rgba(45, 45, 35, 1) 0%, rgba(19, 19, 9, 1) 100%)",
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
