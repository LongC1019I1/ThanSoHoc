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
  return (
    <Fragment>
      <div id="detail_number">
        <div
          id="lifepeak"
          className="  border rounded  row d-flex  p-3 m-3 justify-content-center"
        >
          <LifePeak
            numbers={sampleNumbers}
            ages={sampleAges}
            btn={{
              class_name: "btn btn-danger",
              noi_dung: "4 ĐỈNH CỦA CUỘC ĐỜI",
            }}
          />
          <LifePeak
            numbers={sampleNumbers}
            ages={sampleAges}
            btn={{
              class_name: "btn jade-green",
              noi_dung: "BIỂU ĐỒ THỬ THÁCH",
            }}
          />
        </div>
        <MainNumber />
        <NameNumber />
        <DestinyNumber />
        <AtituteNumber />
        <MatureNumber />
        <BirthNumber />
        <SoulNumber />
        <ExpressNumber />
        <InnerNumber />
      </div>
    </Fragment>
  );
}

export default DetailNumber;
