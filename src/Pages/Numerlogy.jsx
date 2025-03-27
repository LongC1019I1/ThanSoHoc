import React, { Fragment, useEffect, useState } from "react";

import OverviewNumber from "../component/OverviewNumber";
import DetailNumber from "../component/DetailNumber";
import { FaChevronUp } from "react-icons/fa";
import { useSelector } from "react-redux";
const Numerlogy = () => {
  const numberKarma = useSelector((state) => state.numberKarmaMain.number);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Fragment>
       <OverviewNumber />
      <DetailNumber />

      <button
        onClick={scrollToTop}
        style={{
          position: "fixed",
          bottom: "50px",
          right: "30px",
          backgroundColor: "rgba(0, 0, 0, 0.3)", // Màu xám mờ
          color: "white",
          border: "none",
          borderRadius: "50%",
          padding: "10px 15px",
          cursor: "pointer",
          display: showButton ? "block" : "none",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FaChevronUp size={20} />
      </button>
    </Fragment>
  );
};

export default Numerlogy;
