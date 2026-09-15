import { useState } from "react";
import { useStore } from "react-redux";
import { FiDownload, FiLoader } from "react-icons/fi";

function DownloadPdfButton({ className = "ghost-button", label = "Tải báo cáo PDF" }) {
  const store = useStore();
  const [status, setStatus] = useState("idle");
  const isLoading = status === "loading";

  const handleClick = async () => {
    if (isLoading) return;
    setStatus("loading");
    try {
      // Tải thư viện PDF khi cần để không làm nặng lần mở trang đầu.
      const { downloadReportPdf } = await import("../service/reportPdf");
      await downloadReportPdf(store.getState());
      setStatus("idle");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <span className="pdf-download">
      <button
        type="button"
        className={className}
        onClick={handleClick}
        disabled={isLoading}
        aria-busy={isLoading}
      >
        {isLoading ? (
          <FiLoader className="spin" aria-hidden="true" />
        ) : (
          <FiDownload aria-hidden="true" />
        )}
        {isLoading ? "Đang tạo PDF…" : label}
      </button>
      {status === "error" && (
        <span className="pdf-error" role="alert">
          Chưa tạo được PDF, vui lòng thử lại.
        </span>
      )}
    </span>
  );
}

export default DownloadPdfButton;
