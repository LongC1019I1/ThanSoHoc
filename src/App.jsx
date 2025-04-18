import React, { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FormInfor from "./Pages/FormInfor";
import Numerlogy from "./Pages/Numerlogy";

function App() {
  return (
    <Fragment>
      <nav
        id="menu"
        className="navbar navbar-expand-lg  justify-content-center py-3"
      >
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="#">
              HOME
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              ABOUT
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              NUMEROLOGY
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              CONTACT
            </a>
          </li>
        </ul>
      </nav>
      <div className="container w-100">
        <div id="root_content" style={{ position: "relative" }}>
          <div class="number-bg" style={{ top: "2%", left: "10%" }}>
            5
          </div>
          <div class="number-bg" style={{ top: "10%", left: "23%" }}>
            9
          </div>
          <div class="number-bg" style={{ top: "5%", left: "-4%" }}>
            3
          </div>
          <div class="number-bg" style={{ top: "2%", right: "10%" }}>
            4
          </div>
          <div class="number-bg" style={{ top: "10%", right: "23%" }}>
            1
          </div>
          <div class="number-bg" style={{ top: "7%", right: "9%" }}>
            22
          </div>
          <div class="number-bg" style={{ top: "10%", right: "0%" }}>
            7
          </div>
          <div class="number-bg" style={{ top: "5%", right: "-3%" }}>
            6
          </div>
          <div class="number-bg" style={{ top: "5%", left: "21%" }}>
            8
          </div>
          <div class="number-bg" style={{ top: "5%", right: "25%" }}>
            2
          </div>
          <div class="number-bg" style={{ top: "7%", left: "6%" }}>
            11
          </div>
          <div class="number-bg" style={{ top: "10%", left: "-7%" }}>
            10
          </div>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<FormInfor />} />
              <Route path="/detail-number" element={<Numerlogy />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
