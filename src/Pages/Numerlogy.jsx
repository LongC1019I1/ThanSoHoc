import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronUp } from "react-icons/fa";
import { useSelector } from "react-redux";
import OverviewNumber from "../component/OverviewNumber";
import DetailNumber from "../component/DetailNumber";
import ReportToc from "../component/ReportToc";
import useHashScroll from "../hooks/useHashScroll";

const Numerlogy = () => {
  const numberKarma = useSelector((state) => state.numberKarmaMain.number);
  const birthDay = useSelector((state) => state.numberKarmaMain.birth_day);
  const top4 = useSelector((state) => state.numberKarmaMain.top4);
  const hasReport = Boolean(numberKarma && birthDay && top4);
  const [showButton, setShowButton] = useState(false);

  useHashScroll(hasReport);

  useEffect(() => {
    const handleScroll = () => setShowButton(window.scrollY > 300);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  if (!hasReport) {
    return (
      <section className="empty-state" aria-labelledby="empty-title">
        <h1 id="empty-title">Bạn chưa có dữ liệu báo cáo</h1>
        <p>
          Báo cáo được tạo từ họ tên và ngày sinh bạn nhập, và không được lưu lại
          khi mở trực tiếp hoặc tải lại trang.
        </p>
        <Link to="/" className="primary-button">
          Nhập thông tin
        </Link>
      </section>
    );
  }

  return (
    <div className="report-layout">
      <ReportToc />
      <div className="report-main">
        <OverviewNumber />
        <DetailNumber />
      </div>
      <button
        type="button"
        className="scroll-top"
        hidden={!showButton}
        aria-label="Về đầu báo cáo"
        onClick={scrollToTop}
      >
        <FaChevronUp aria-hidden="true" />
      </button>
    </div>
  );
};

export default Numerlogy;
