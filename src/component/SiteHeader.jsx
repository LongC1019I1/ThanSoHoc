import { Link, useLocation } from "react-router-dom";
import { FiRefreshCw } from "react-icons/fi";
import { MoonPhases } from "./Decor";

const BrandMark = () => (
  <svg className="brand-mark" viewBox="0 0 40 40" fill="none" aria-hidden="true">
    <circle cx="20" cy="20" r="13" stroke="currentColor" strokeOpacity=".8" />
    <path d="M20 1v8M20 31v8M1 20h8M31 20h8" stroke="currentColor" strokeOpacity=".8" />
    <path
      d="m20 5 2.6 12.4L35 20l-12.4 2.6L20 35l-2.6-12.4L5 20l12.4-2.6L20 5Z"
      stroke="currentColor"
      strokeOpacity=".9"
    />
    <path d="M12.5 20c3-3.8 12-3.8 15 0c-3 3.8-12 3.8-15 0Z" stroke="currentColor" />
    <circle cx="20" cy="20" r="2.2" fill="currentColor" />
  </svg>
);

function SiteHeader() {
  const { pathname, hash } = useLocation();
  const isHome = pathname === "/";
  const isReport = pathname.startsWith("/detail-number");

  return (
    <header className={`site-header${isReport ? " is-report" : ""}`}>
      <div className="site-header-inner">
        <Link to="/" className="brand">
          <BrandMark />
          <span>THẦN SỐ HỌC</span>
        </Link>

        <nav className="site-nav" aria-label="Điều hướng chính">
          <Link to="/" aria-current={isHome && hash !== "#about" ? "page" : undefined}>
            Trang chủ
          </Link>
          <Link to="/#about" aria-current={isHome && hash === "#about" ? "location" : undefined}>
            Giới thiệu
          </Link>
        </nav>

        {isReport ? (
          <Link to="/" className="ghost-button header-action">
            <FiRefreshCw aria-hidden="true" /> Tra cứu lại
          </Link>
        ) : (
          <MoonPhases className="header-phases" />
        )}
      </div>
    </header>
  );
}

export default SiteHeader;
