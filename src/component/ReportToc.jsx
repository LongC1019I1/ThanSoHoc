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

function ReportToc() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState("overview");
  const toggleRef = useRef(null);

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

  const close = () => setIsOpen(false);
  const isIndexActive = INDEX_SECTIONS.some((section) => section.id === activeId);

  const handleKeyDown = (event) => {
    if (event.key === "Escape" && isOpen) {
      close();
      toggleRef.current?.focus();
    }
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
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? <FiX aria-hidden="true" /> : <FiList aria-hidden="true" />}
        Mục lục
      </button>

      <nav id="report-toc-panel" className="toc-panel">
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
                  onClick={close}
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
                          onClick={close}
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
        <Link to="/" className="ghost-button toc-action" onClick={close}>
          <FiRefreshCw aria-hidden="true" /> Tra cứu lại
        </Link>
        <StarEmblem className="toc-emblem" />
      </nav>
    </aside>
  );
}

export default ReportToc;
