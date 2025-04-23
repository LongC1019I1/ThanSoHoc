import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
  }, [numberKarma]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Fragment>
      {!numberKarma ? (
        <div className="flex flex-col items-center justify-center h-screen ">
          <div className=" text-center">
            <h1 className="text-3xl font-bold text-red-600 mb-4">Oops!</h1>
            <p className="text-lg text-gray-700 mb-6">
              Vui lòng quay lại nhập <strong>Họ Tên</strong> &{" "}
              <strong>Ngày Tháng Năm Sinh</strong> để tiếp tục.
            </p>
            <NavLink
              to="/"
              className="px-6 py-3 btn btn-danger rounded-lg shadow hover:bg-blue-600 transition"
            >
              Quay lại trang chính
            </NavLink>
          </div>
        </div>
      ) : (
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
      )}
    </Fragment>
  );
};

export default Numerlogy;
