import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FormInfor from "./Pages/FormInfor";
import Numerlogy from "./Pages/Numerlogy";

function App() {
  return (
    <div className="container w-100">
      <div id="root_content">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<FormInfor />} />
            <Route path="/detail-number" element={<Numerlogy />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
