import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Numerlogy from "./Pages/Numerlogy";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Numerlogy />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
