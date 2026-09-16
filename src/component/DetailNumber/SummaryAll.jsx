import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FiArrowUp, FiRefreshCw } from "react-icons/fi";
import {
  STRONG_NUMB,
  WEAK_NUMB,
  ARROW,
  NUMEROLOGY_LIFE_PATH,
  NUMEROLOGY_SOUL_NUMBER,
  NUMERLOGY_JOB,
  SOLUTION_NUMB,
} from "../../Data/numerology";
import parse from "html-react-parser";
import { Fragment } from "react";
import { MissingContent } from "./SubComponent/NumberArticle";
import DownloadPdfButton from "../DownloadPdfButton";

function SummaryBlock({ title, lead, links = [], hasContent, children }) {
  return (
    <section className="summary-block">
      <h3>{title}</h3>
      {lead && <p className="summary-lead">{lead}</p>}
      {hasContent ? children : <MissingContent />}
      {links.length > 0 && (
        <p className="related-links">
          <span>Xem thêm:</span>
          {links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </p>
      )}
    </section>
  );
}

function SummaryAll() {
  const strongNumb = useSelector((state) => state.numberKarmaMain.strong_list);

  // Gộp bằng object sẽ mất nội dung khi số cơ bản và số master dùng chung tên thuộc tính
  // (1 và 10 đều có "lanhDaoVaDanDat", 7 và 11 đều có "trucGiac"), nên giữ danh sách
  // và chỉ lọc trùng theo nội dung.
  const strongTexts = [
    ...new Set(strongNumb.flatMap((numb) => Object.values(STRONG_NUMB[numb] ?? {}))),
  ];

  const weakNumb = useSelector((state) => state.numberKarmaMain.weak_list);
  const arrow = useSelector((state) => state.numberKarmaMain.arrow);
  const numberSoul = useSelector((state) => state.numberName.soul);
  const numberDestiny = useSelector((state) => state.numberName.destiny);
  const numberKarma = useSelector((state) => state.numberKarmaMain.number);

  // DEM DE NHOM DONG

  const totalItems = strongTexts.length;

  // ✅ Chia làm 3 nhóm gần bằng nhau
  const groupCount = 3;
  const baseSize = Math.floor(totalItems / groupCount);
  const remainder = totalItems % groupCount;

  const groups = [];
  let start = 0;

  for (let i = 0; i < groupCount; i++) {
    const size = baseSize + (i < remainder ? 1 : 0); // thêm 1 cho các nhóm đầu nếu dư
    groups.push(strongTexts.slice(start, start + size));
    start += size;
  }

  const strongArrows = (arrow || [])
    .map((arr) => ARROW[arr]?.[1]?.KET_LUAN)
    .filter(Boolean);
  const weakContents = weakNumb.map((numb) => WEAK_NUMB[numb]?.noidung).filter(Boolean);
  const motivations = [
    NUMEROLOGY_LIFE_PATH[numberDestiny]?.tomtat,
    NUMEROLOGY_SOUL_NUMBER[numberSoul]?.tomtat,
    NUMEROLOGY_SOUL_NUMBER[numberKarma]?.tomtat,
  ].filter(Boolean);
  const jobs = strongNumb.map((numb) => NUMERLOGY_JOB[numb]?.noidung).filter(Boolean);
  const solutions = weakNumb.map((numb) => SOLUTION_NUMB[numb]?.noidung).filter(Boolean);

  return (
    <section id="summary_all" className="report-group" aria-labelledby="summary-title">
      <header className="group-header">
        <span className="eyebrow">Tổng kết</span>
        <h2 id="summary-title">Xu hướng nghề nghiệp và tóm tắt về bạn</h2>
      </header>

      <div className="summary-stack">
        <SummaryBlock
          title="Điểm mạnh của bạn"
          lead="Là tài năng, năng lực, khả năng, đặc điểm chủ đạo của bạn"
          hasContent={strongTexts.length > 0 || strongArrows.length > 0}
          links={[
            { href: "#charts", label: "Tổng hợp năng lượng" },
            { href: "#date_to_known", label: "Mật mã ngày sinh" },
          ]}
        >
          <div className="prose">
            {groups.map(
              (group, index) =>
                group.length > 0 && (
                  <div className="summary-group" key={index}>
                    {group.map((text, textIndex) => (
                      <Fragment key={textIndex}>{parse(text)}</Fragment>
                    ))}
                  </div>
                )
            )}
            {strongArrows.map((text, index) => (
              <Fragment key={`arrow-${index}`}>{parse(text)}</Fragment>
            ))}
          </div>
        </SummaryBlock>

        <SummaryBlock
          title="Điểm yếu của bạn"
          lead="Là nhược điểm, bài học, khuyết điểm của bạn"
          hasContent={weakContents.length > 0}
          links={[{ href: "#charts", label: "Tổng hợp năng lượng" }]}
        >
          <div className="prose">
            {weakContents.map((text, index) => (
              <div className="summary-item" key={index}>
                {parse(text)}
              </div>
            ))}
          </div>
        </SummaryBlock>

        <SummaryBlock
          title="Động lực thỏa mãn"
          lead="Là khao khát nội tâm, mong muốn, sứ mệnh"
          hasContent={motivations.length > 0}
          links={[
            { href: "#destiny_number", label: "Số định mệnh" },
            { href: "#soul_number", label: "Số linh hồn" },
            { href: "#main_number", label: "Số đường đời" },
          ]}
        >
          <div className="prose">
            {motivations.map((text, index) => (
              <div className="summary-item" key={index}>
                {parse(text)}
              </div>
            ))}
          </div>
        </SummaryBlock>

        <SummaryBlock
          title="Xu hướng nghề nghiệp"
          lead="Đây là gợi ý xu hướng nghề nghiệp dựa trên năng lượng thuần trong bộ số của Bạn, trong thực tế để chọn được nghề nghiệp phù hợp Bạn cần xét thêm những yếu tố khác như: Nguồn lực (tài năng thực tế) và lợi thế cạnh tranh (mối quan hệ, truyền thống, gia đình, tài chính, nơi ở ..vv) của Bạn để Bạn lựa chọn được nghề nghiệp phù hợp nhất."
          hasContent={jobs.length > 0}
          links={[{ href: "#charts", label: "Tổng hợp năng lượng" }]}
        >
          <div className="career-grid prose">
            {jobs.map((text, index) => (
              <div key={index}>{parse(text)}</div>
            ))}
          </div>
        </SummaryBlock>

        <SummaryBlock
          title="Lời khuyên và cách phát triển"
          lead="Là những đề xuất phát triển giúp bạn trở nên hoàn thiện hơn"
          hasContent={solutions.length > 0}
          links={[{ href: "#lifepeak", label: "Đỉnh cao & thử thách" }]}
        >
          <div className="prose">
            {solutions.map((text, index) => (
              <div className="advice-item" key={index}>
                {parse(text)}
              </div>
            ))}
          </div>
          <p className="note-box">
            <strong>Lưu ý:</strong> Những nghề nêu trên không phải bạn không làm
            được mà bạn cần phải nỗ lực nhiều hơn để bù đắp
          </p>
        </SummaryBlock>
      </div>

      <div className="summary-actions">
        <a className="ghost-button" href="#overview">
          <FiArrowUp aria-hidden="true" /> Về đầu báo cáo
        </a>
        <DownloadPdfButton />
        <Link className="primary-button" to="/">
          <FiRefreshCw aria-hidden="true" /> Tra cứu lại
        </Link>
      </div>
    </section>
  );
}

export default SummaryAll;
