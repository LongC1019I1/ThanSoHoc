import { NUMEROLOGY_KARMA, NUMERLOGY_COMMON } from "../../Data/numerology";
import { useSelector } from "react-redux";
import NumberArticle, { MissingContent } from "./SubComponent/NumberArticle";
import { INDEX_INTROS } from "./indexIntros";

const toLines = (text) =>
  typeof text === "string" ? text.split("\n").filter((line) => line.trim()) : [];

function MainNumber() {
  const numberKarma = useSelector((state) => state.numberKarmaMain.number);
  const HumanNumerology = NUMERLOGY_COMMON.DUONG_DOI?.[numberKarma];
  const karma = NUMEROLOGY_KARMA[numberKarma];

  const lessons = [
    { title: "Bài học", lines: toLines(karma?.BAI_HOC) },
    { title: "Môi trường", lines: toLines(karma?.MOI_TRUONG) },
  ];

  // Tiêu đề khớp nội dung dữ liệu: HUONG_PT là hướng phát triển, KHAC_PHUC là khuynh hướng cần khắc phục.
  const readings = [
    { title: "Tính chất chung", text: HumanNumerology?.CHUNG },
    { title: "Mục đích sống", text: HumanNumerology?.MUC_DICH },
    { title: "Đặc điểm", text: HumanNumerology?.DAC_DIEM },
    { title: "Điều kiện phát triển", text: HumanNumerology?.DKPT },
    { title: "Hướng phát triển", text: HumanNumerology?.HUONG_PT },
    { title: "Khuynh hướng cần khắc phục", text: HumanNumerology?.KHAC_PHUC },
    { title: "Nghề nghiệp", text: HumanNumerology?.NGHE_NGHIEP },
  ];

  return (
    <NumberArticle
      id="main_number"
      title="Số đường đời"
      subtitle="Còn gọi là Số chủ đạo"
      value={numberKarma}
      intro={INDEX_INTROS.main_number}
      hasContent={Boolean(karma || HumanNumerology)}
    >
      <div className="lesson-grid">
        {lessons.map((lesson) => (
          <section key={lesson.title} className="lesson-card">
            <h4>{lesson.title}</h4>
            {lesson.lines.length ? (
              <ul>
                {lesson.lines.map((line, index) => (
                  <li key={index}>{line}</li>
                ))}
              </ul>
            ) : (
              <MissingContent />
            )}
          </section>
        ))}
      </div>

      {readings.map((reading) => (
        <section key={reading.title} className="reading-block">
          <h4>{reading.title}</h4>
          {toLines(reading.text).length ? (
            toLines(reading.text).map((line, index) => <p key={index}>{line}</p>)
          ) : (
            <MissingContent />
          )}
        </section>
      ))}
    </NumberArticle>
  );
}

export default MainNumber;
