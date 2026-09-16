import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiBarChart2,
  FiFileText,
  FiGrid,
  FiHome,
  FiList,
  FiRefreshCw,
  FiTriangle,
  FiX,
} from "react-icons/fi";
import {
  INDEX_SECTIONS,
  OBSERVED_SECTION_IDS,
  REPORT_SECTIONS,
} from "./reportSections";
import { StarEmblem } from "./Decor";
import DownloadPdfButton from "./DownloadPdfButton";

const ICONS = {
  overview: FiHome,
  main_number: FiGrid,
  charts: FiBarChart2,
  lifepeak: FiTriangle,
  summary_all: FiFileText,
};

// Nhãn hiển thị trên nút, để người đọc biết đang ở mục nào khi mục lục đang đóng.
const SECTION_LABELS = Object.fromEntries([
  ...REPORT_SECTIONS.filter((section) => !section.children).map((section) => [section.href, section.label]),
  ...INDEX_SECTIONS.map((section) => [section.id, section.label]),
]);

function ReportToc() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState("overview");
  const toggleRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    const visible = new Set();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        });
        const current = OBSERVED_SECTION_IDS.find((id) => visible.has(id));
        if (current) setActiveId(current);
      },
      { rootMargin: "-120px 0px -55% 0px" }
    );

    OBSERVED_SECTION_IDS.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // Mở mục lục thì chặn cuộn nền, tránh cuộn trang phía sau panel.
  useEffect(() => {
    if (!isOpen) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  const close = ({ restoreFocus = true } = {}) => {
    setIsOpen(false);
    if (restoreFocus) toggleRef.current?.focus();
  };

  const toggle = () => {
    setIsOpen((open) => {
      if (!open) {
        requestAnimationFrame(() => {
          // preventScroll: focus mặc định làm panel tự cuộn, cắt mất mục đầu tiên.
          if (panelRef.current) panelRef.current.scrollTop = 0;
          panelRef.current?.querySelector("a")?.focus({ preventScroll: true });
        });
      }
      return !open;
    });
  };

  const isIndexActive = INDEX_SECTIONS.some((section) => section.id === activeId);

  const handleKeyDown = (event) => {
    if (event.key === "Escape" && isOpen) close();
  };

  return (
    <aside
      className={`report-toc${isOpen ? " is-open" : ""}`}
      aria-label="Mục lục báo cáo"
      onKeyDown={handleKeyDown}
    >
      <button
        ref={toggleRef}
        type="button"
        className="toc-toggle"
        aria-expanded={isOpen}
        aria-controls="report-toc-panel"
        onClick={toggle}
      >
        {isOpen ? <FiX aria-hidden="true" /> : <FiList aria-hidden="true" />}
        <span>Mục lục</span>
        {!isOpen && SECTION_LABELS[activeId] && (
          <span className="toc-current">{SECTION_LABELS[activeId]}</span>
        )}
      </button>

      <div
        className="toc-backdrop"
        hidden={!isOpen}
        onClick={() => close({ restoreFocus: false })}
        aria-hidden="true"
      />

      <nav id="report-toc-panel" className="toc-panel" ref={panelRef}>
        <ul className="toc-list">
          {REPORT_SECTIONS.map((section) => {
            const Icon = ICONS[section.href];
            const isActive = section.children
              ? isIndexActive
              : activeId === section.href;

            return (
              <li key={section.href}>
                <a
                  href={`#${section.href}`}
                  className={`toc-link${isActive ? " is-active" : ""}`}
                  aria-current={isActive && !section.children ? "location" : undefined}
                  onClick={() => close({ restoreFocus: false })}
                >
                  <Icon aria-hidden="true" />
                  {section.label}
                </a>
                {section.children && (
                  <ul className="toc-sublist">
                    {section.children.map((child) => (
                      <li key={child.id}>
                        <a
                          href={`#${child.id}`}
                          className={`toc-sublink${activeId === child.id ? " is-active" : ""}`}
                          aria-current={activeId === child.id ? "location" : undefined}
                          onClick={() => close({ restoreFocus: false })}
                        >
                          {child.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
        <DownloadPdfButton className="ghost-button toc-action" />
        <Link to="/" className="ghost-button toc-action" onClick={() => close({ restoreFocus: false })}>
          <FiRefreshCw aria-hidden="true" /> Tra cứu lại
        </Link>
        <StarEmblem className="toc-emblem" />
      </nav>
    </aside>
  );
}

export default ReportToc;
