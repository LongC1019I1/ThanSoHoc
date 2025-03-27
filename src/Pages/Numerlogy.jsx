import React, { useEffect, useState } from "react";
import FormInfor from "../component/FormInfor";
import OverviewNumber from "../component/OverviewNumber";
import DetailNumber from "../component/DetailNumber";
const Numerlogy = () => {
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
    <div class="container w-100">
      <h2 class="text-center h2 pb-3">BÁO CÁO THẦN SỐ HỌC </h2>
      <div id="root_content">
        <FormInfor />
        <OverviewNumber />
        <DetailNumber />
      </div>

      <button
        onClick={scrollToTop}
        style={{
          position: "fixed",
          bottom: "50px",
          right: "30px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          padding: "10px 15px",
          borderRadius: "5px",
          cursor: "pointer",
          display: showButton ? "block" : "none",
        }}
      >
        ⬆ Lên Trên
      </button>
    </div>
  );
};

export default Numerlogy;
