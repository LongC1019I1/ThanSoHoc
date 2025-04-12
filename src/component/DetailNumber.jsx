import { Fragment } from "react";
import MainNumber from "./DetailNumber/MainNumber";
import NameNumber from "./DetailNumber/NameNumber";
import AtituteNumber from "./DetailNumber/AtituteNumber";
import MatureNumber from "./DetailNumber/MatureNumber";
import DestinyNumber from "./DetailNumber/DestinyNumber";
import BirthNumber from "./DetailNumber/BirthNumber";
import SoulNumber from "./DetailNumber/SoulNumber";
import ExpressNumber from "./DetailNumber/ExpressNumber";
import InnerNumber from "./DetailNumber/InnerNumber";
import LifePeak from "./DetailNumber/LifePeak";
import ChartDateName from "./DetailNumber/ChartDateName";
import { useSelector } from "react-redux";
import ChartCombineEnergy from "./DetailNumber/ChartCombineEnergy";
import SummaryAll from "./DetailNumber/SummaryAll";
import DateToKnown from "./DetailNumber/DateToKnown";
import FourPeak from "./DetailNumber/FourPeak";
import FourChallenge from "./DetailNumber/FourChallenge";
// 🟢 Dữ liệu mẫu để truyền vào component
const sampleNumbers = {
  top: 8,
  left: 2,
  right: 8,
  center: 10,
};

const sampleAges = {
  bottomLeft: "27 tuổi - (2023)",
  bottomRight: "36 tuổi - (2032)",
  topLeft: "45 tuổi - (2041)",
  topRight: "54 tuổi - (2050)",
};

function DetailNumber() {
  const top4 = useSelector((state) => state.numberKarmaMain.top4);

  const birth_day = useSelector((state) => state.numberKarmaMain.birth_day);
  const full_name_numb = useSelector(
    (state) => state.numberName.full_name_number
  );
  const combine_numb_birth_name = birth_day + "" + full_name_numb;

  return (
    <Fragment>
      <div id="detail_number">
        {birth_day && (
          <Fragment>
            <div class="border rounded p-3 m-3 row ">
              <ChartDateName
                numbersData={birth_day}
                color="red"
                buttonText="BIỂU ĐỒ NGÀY SINH"
                buttonColor="green"
                id_link="date_to_known"
              />

              <ChartDateName
                numbersData={full_name_numb}
                color="#3498da"
                buttonText="BIỂU ĐỒ HỌ TÊN"
                buttonColor="purple"
                id_link=""
              />
            </div>

            <div class="border rounded p-3 m-3 d-flex justify-content-center">
              <ChartDateName
                numbersData={combine_numb_birth_name}
                color="blue"
                buttonText="BIỂU ĐỒ  TỔNG HỢP"
                buttonColor="#3cbc9b"
              />
            </div>

            <div class="border rounded p-3 m-3 d-flex justify-content-center">
              {combine_numb_birth_name && (
                <Fragment>
                  <ChartCombineEnergy
                    color="blue"
                    buttonText="BIỂU ĐỒ TỔNG HỢP"
                    buttonColor="#3cbc9b"
                  />
                </Fragment>
              )}
            </div>

            {top4 && (
              <Fragment>
                <div
                  id="lifepeak"
                  className="  border rounded  row d-flex  p-3 m-3 justify-content-center"
                >
                  <LifePeak
                    topFour={top4.top4_peak}
                    btn={{
                      class_name: "btn btn-danger",
                      noi_dung: "4 ĐỈNH CỦA CUỘC ĐỜI",
                    }}
                    id_link="four_peak"
                  />
                  <LifePeak
                    topFour={top4.top4_challenge}
                    btn={{
                      class_name: "btn jade-green",
                      noi_dung: "BIỂU ĐỒ THỬ THÁCH",
                    }}
                    id_link="four_challenge"
                  />
                </div>
              </Fragment>
            )}

            <MainNumber />
            <DateToKnown
              numbersData={birth_day}
              color="red"
              buttonText="BIỂU ĐỒ NGÀY SINH"
              buttonColor="green"
            />
            <NameNumber />
            <DestinyNumber />
            <AtituteNumber />
            <MatureNumber />
            <BirthNumber />
            <SoulNumber />
            <ExpressNumber />
            <InnerNumber />
            <FourPeak topFour={top4.top4_peak} />
            <FourChallenge topFour={top4.top4_challenge} />
            <SummaryAll />
          </Fragment>
        )}
      </div>
    </Fragment>
  );
}

export default DetailNumber;
