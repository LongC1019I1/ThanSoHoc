import MainNumber from "./DetailNumber/MainNumber";
import NameNumber from "./DetailNumber/NameNumber";
import AtituteNumber from "./DetailNumber/AtituteNumber";
import MatureNumber from "./DetailNumber/MatureNumber";
import DestinyNumber from "./DetailNumber/DestinyNumber";
import BirthNumber from "./DetailNumber/BirthNumber";
import SoulNumber from "./DetailNumber/SoulNumber";
import ExpressNumber from "./DetailNumber/ExpressNumber";
import InnerNumber from "./DetailNumber/InnerNumber";
import ChartDateName from "./DetailNumber/ChartDateName";
import { useSelector } from "react-redux";
import ChartCombineEnergy from "./DetailNumber/ChartCombineEnergy";
import SummaryAll from "./DetailNumber/SummaryAll";
import DateToKnown from "./DetailNumber/DateToKnown";
import FourPeak from "./DetailNumber/FourPeak";
import FourChallenge from "./DetailNumber/FourChallenge";

function DetailNumber() {
  const top4 = useSelector((state) => state.numberKarmaMain.top4);
  const birth_day = useSelector((state) => state.numberKarmaMain.birth_day);
  const birth_day_list = useSelector(
    (state) => state.numberKarmaMain.birth_day_list
  );
  const full_name_numb = useSelector(
    (state) => state.numberName.full_name_number
  );
  const combine_numb_birth_name = birth_day + "" + full_name_numb;

  if (!birth_day) return null;

  return (
    <div id="detail_number">
      <section id="indices" className="report-group" aria-labelledby="indices-title">
        <header className="group-header">
          <span className="eyebrow">Các chỉ số</span>
          <h2 id="indices-title">Chi tiết các chỉ số</h2>
        </header>
        <MainNumber />
        <NameNumber />
        <DestinyNumber />
        <AtituteNumber />
        <MatureNumber />
        <BirthNumber />
        <SoulNumber />
        <ExpressNumber />
        <InnerNumber />
      </section>

      {/* ChartCombineEnergy phải render trước SummaryAll vì nó tính danh sách số mạnh/yếu. */}
      <section id="charts" className="report-group" aria-labelledby="charts-title">
        <header className="group-header">
          <span className="eyebrow">Biểu đồ</span>
          <h2 id="charts-title">Biểu đồ và năng lượng</h2>
          <p className="group-lead">
            Mỗi ô là một con số. Ô viền liền ghi số lần xuất hiện (×n); ô viền
            đứt là số không có.
          </p>
        </header>
        <div className="chart-grid">
          <ChartDateName
            numbersData={birth_day}
            title="Biểu đồ ngày sinh"
            description={`Các chữ số của ngày sinh ${birth_day_list}`}
          />
          <ChartDateName
            numbersData={full_name_numb}
            title="Biểu đồ họ tên"
            description="Các chữ số quy đổi từ họ tên"
          />
          <ChartDateName
            numbersData={combine_numb_birth_name}
            title="Biểu đồ tổng hợp"
            description="Gộp chữ số của ngày sinh và họ tên"
          />
        </div>
        <ChartCombineEnergy />
        <DateToKnown />
      </section>

      <section id="lifepeak" className="report-group" aria-labelledby="lifepeak-title">
        <header className="group-header">
          <span className="eyebrow">Giai đoạn cuộc đời</span>
          <h2 id="lifepeak-title">Đỉnh cao và thử thách</h2>
        </header>
        <FourPeak topFour={top4?.top4_peak} />
        <FourChallenge topFour={top4?.top4_challenge} />
      </section>

      <SummaryAll />
    </div>
  );
}

export default DetailNumber;
