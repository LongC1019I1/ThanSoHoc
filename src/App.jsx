import { BrowserRouter, Routes, Route } from "react-router-dom";
import FormInfor from "./Pages/FormInfor";
import Numerlogy from "./Pages/Numerlogy";
import SiteHeader from "./component/SiteHeader";

function App() {
  return (
    <BrowserRouter>
      <a className="skip-link" href="#main-content">
        Bỏ qua đến nội dung chính
      </a>
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<FormInfor />} />
          <Route path="/detail-number" element={<Numerlogy />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
