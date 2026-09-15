import { useSelector } from "react-redux";
import {
  FiArrowRight,
  FiCalendar,
  FiHeart,
  FiMoon,
  FiSmile,
  FiStar,
  FiTarget,
  FiTrendingUp,
  FiUser,
} from "react-icons/fi";
import { LifePathRing, MysticLandscape } from "./Decor";
import DownloadPdfButton from "./DownloadPdfButton";

function OverviewNumber() {
  const birth_day_list = useSelector(
    (state) => state.numberKarmaMain.birth_day_list
  );
  const full_name_list = useSelector(
    (state) => state.numberName.full_name_list
  );
  const numberKarma = useSelector((state) => state.numberKarmaMain.number);
  const numbeAtitute = useSelector((state) => state.numberKarmaMain.atitute);
  const numberDestiny = useSelector((state) => state.numberName.destiny);
  const numberName = useSelector((state) => state.numberName.name);
  const numberExpress = useSelector((state) => state.numberName.express);
  const numberInner = useSelector((state) => state.numberName.inner);
  const numberSoul = useSelector((state) => state.numberName.soul);
  const numberMature = useSelector((state) => state.numberName.mature);
  const numberDayBirth = useSelector(
    (state) => state.numberKarmaMain.day_birth
  );

  // "Số chủ đạo" là tên khác của Số đường đời nên chỉ hiển thị một lần ở thẻ chính.
  const cards = [
    { label: "Số tên riêng", value: numberName, id: "name_number", Icon: FiUser },
    { label: "Số định mệnh", value: numberDestiny, id: "destiny_number", Icon: FiTarget },
    { label: "Số thái độ", value: numbeAtitute, id: "atitute_number", Icon: FiSmile },
    { label: "Số trưởng thành", value: numberMature, id: "mature_number", Icon: FiTrendingUp },
    { label: "Số ngày sinh", value: numberDayBirth, id: "birth_number", Icon: FiCalendar },
    { label: "Số linh hồn", value: numberSoul, id: "soul_number", Icon: FiHeart },
    { label: "Số biểu đạt", value: numberExpress, id: "express_number", Icon: FiStar },
    { label: "Số nội cảm", value: numberInner || "Không có", id: "inner_number", Icon: FiMoon },
  ];

  return (
    <section id="overview" className="overview" aria-labelledby="overview-title">
      <div className="overview-hero">
        <MysticLandscape className="overview-landscape" idPrefix="overview-land" />
        <div className="overview-intro">
          <span className="eyebrow">Báo cáo thần số học</span>
          <h1 id="overview-title">Bản đồ thần số học của bạn</h1>
          <p className="overview-name">
            {full_name_list}
            <span className="name-rule" aria-hidden="true" />
          </p>
          <p className="overview-meta">Ngày sinh: {birth_day_list}</p>
          <DownloadPdfButton className="primary-button overview-pdf" />
        </div>
        <a className="lifepath-card" href="#main_number">
          <span className="lifepath-label">Số đường đời</span>
          <span className="lifepath-ring">
            <LifePathRing />
            <span className="lifepath-value">{numberKarma}</span>
          </span>
          <span className="lifepath-note">Còn gọi là Số chủ đạo</span>
          <span className="more-link">
            Xem chi tiết <FiArrowRight aria-hidden="true" />
          </span>
        </a>
      </div>

      <ul className="overview-grid">
        {cards.map((card) => {
          const CardIcon = card.Icon;
          const isText = typeof card.value === "string" && !/\d/.test(card.value);
          return (
            <li key={card.id}>
              <a className="index-card" href={`#${card.id}`}>
                <span className="index-icon" aria-hidden="true">
                  <CardIcon />
                </span>
                <span className="index-label">{card.label}</span>
                <span className={`index-value${isText ? " is-text" : ""}`}>
                  {card.value}
                </span>
                <span className="more-link">
                  Xem chi tiết <FiArrowRight aria-hidden="true" />
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default OverviewNumber;
