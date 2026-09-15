import { FiChevronLeft } from "react-icons/fi";

export function MissingContent({
  children = "Chưa có nội dung diễn giải cho mục này.",
}) {
  return <p className="missing-content">{children}</p>;
}

function NumberArticle({
  id,
  title,
  value,
  subtitle,
  intro,
  hasContent = true,
  children,
}) {
  const headingId = `${id}-title`;
  const hasValue = value !== undefined && value !== null && value !== "";

  return (
    <article id={id} className="number-article" aria-labelledby={headingId}>
      <a className="article-back" href="#overview">
        <FiChevronLeft aria-hidden="true" /> Tổng quan
      </a>
      <header className="article-header">
        <h3 id={headingId} className="article-title">
          {title}
          {hasValue && <span className="article-value">{value}</span>}
        </h3>
        {subtitle && <p className="article-subtitle">{subtitle}</p>}
      </header>
      {intro && (
        <div className="article-intro">
          {intro.split("\n\n").map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      )}
      <div className="article-body">
        {hasContent ? children : <MissingContent />}
      </div>
    </article>
  );
}

export default NumberArticle;
