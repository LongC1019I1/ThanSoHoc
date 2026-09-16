import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FormInfor from "./Pages/FormInfor";
import SiteHeader from "./component/SiteHeader";

// Trang báo cáo kéo theo toàn bộ nội dung diễn giải (src/Data/numerology.js),
// nên tách thành chunk riêng để trang tra cứu tải nhẹ hơn.
const Numerlogy = lazy(() => import("./Pages/Numerlogy"));

function App() {
  return (
    <BrowserRouter>
      <a className="skip-link" href="#main-content">
        Bỏ qua đến nội dung chính
      </a>
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        <Suspense fallback={<p className="route-loading">Đang tải báo cáo…</p>}>
          <Routes>
            <Route path="/" element={<FormInfor />} />
            <Route path="/detail-number" element={<Numerlogy />} />
          </Routes>
        </Suspense>
      </main>
    </BrowserRouter>
  );
}

export default App;
