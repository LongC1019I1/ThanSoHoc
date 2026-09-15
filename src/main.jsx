import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ConfigProvider, theme } from "antd";
import viVN from "antd/locale/vi_VN";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store";

// Khi người dùng bật giảm chuyển động, tắt motion của antd thay vì rút ngắn transition:
// popup của antd chờ sự kiện kết thúc transition, thời lượng ~0 khiến DatePicker bị kẹt.
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const mysticTheme = {
  algorithm: theme.darkAlgorithm,
  token: {
    motion: !prefersReducedMotion,
    colorPrimary: "#7B4AE8",
    colorPrimaryHover: "#6A3BD6",
    colorPrimaryActive: "#5B2FC2",
    colorInfo: "#9B6DFF",
    colorError: "#FF8A9A",
    colorBgBase: "#10091F",
    colorBgContainer: "#1A0F2C",
    colorBgElevated: "#2B1944",
    colorBorder: "#7A62A0",
    colorText: "#F5F0FF",
    colorTextSecondary: "#C7BCD8",
    colorTextPlaceholder: "#A597BC",
    borderRadius: 12,
    controlHeightLG: 48,
    fontSize: 16,
    fontFamily: '"Be Vietnam Pro", "Segoe UI", system-ui, sans-serif',
  },
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ConfigProvider theme={mysticTheme} locale={viVN}>
      <Provider store={store}>
        <App />
      </Provider>
    </ConfigProvider>
  </StrictMode>
);
