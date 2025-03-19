import { Fragment } from "react";
import sochudao from "../../assets/img/sochudao.png";
import { NUMEROLOGY_KARMA, ARROW } from "../../Data/numerology";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

function MainNumber() {
  const numberKarma = useSelector((state) => state.numberKarmaMain.number);
  const arrow = useSelector((state) => state.numberKarmaMain.arrow);
  const lack_arrow = useSelector((state) => state.numberKarmaMain.lack_arrow);

  console.log({ lack_arrow, arrow });
  return (
    <div id="main_number">
      <div className="container">
        <h1 className=" h1 my-5 px-2">
          1{") "} Con số chủ đạo của bạn là:
          <span className="text-danger">
            {" "}
            {NUMEROLOGY_KARMA[numberKarma]
              ? NUMEROLOGY_KARMA[numberKarma].SO_CHU_DAO
              : ""}
          </span>
        </h1>
        <img className=" my-1 w-100" src={sochudao} />

        <section className="mt-4">
          <h4 className="uppercase fw-bold my-4">🔥 Đặc điểm nổi bật</h4>
          {NUMEROLOGY_KARMA[numberKarma]
            ? parse(NUMEROLOGY_KARMA[numberKarma].DAC_DIEM)
            : ""}
        </section>

        <section className="mt-4">
          {NUMEROLOGY_KARMA[numberKarma]
            ? parse(NUMEROLOGY_KARMA[numberKarma].CAN_BANG.noidung)
            : ""}
        </section>

        <section className="mt-4">
          {NUMEROLOGY_KARMA[numberKarma]
            ? parse(NUMEROLOGY_KARMA[numberKarma].YEU.noidung)
            : ""}
        </section>

        <section className="mt-4">
          {NUMEROLOGY_KARMA[numberKarma]
            ? parse(NUMEROLOGY_KARMA[numberKarma].QUA_MANH.noidung)
            : ""}
        </section>

        <section className="mt-4">
          {NUMEROLOGY_KARMA[numberKarma]
            ? parse(NUMEROLOGY_KARMA[numberKarma].TOM_TAT.noidung)
            : ""}
        </section>

        <section className="mt-4 text-center">
          {NUMEROLOGY_KARMA[numberKarma] &&
          NUMEROLOGY_KARMA[numberKarma].noidung
            ? parse(NUMEROLOGY_KARMA[numberKarma].KET_LUAN.noidung)
            : ""}
          {NUMEROLOGY_KARMA[numberKarma] &&
          NUMEROLOGY_KARMA[numberKarma].thong_diep
            ? parse(NUMEROLOGY_KARMA[numberKarma].KET_LUAN.thong_diep)
            : ""}
        </section>
        {<Fragment>{arrow.length > 0 ? <h3>BẠN CÓ MŨI TÊN</h3> : ""}</Fragment>}
        {arrow.length > 0 &&
          arrow.map((arr, iAr) => {
            return (
              <Fragment key={`emp${iAr}`}>
                <p>{ARROW[arr][1].Y_NGHIA.toUpperCase()}</p>
              </Fragment>
            );
          })}

        {
          <Fragment>
            {lack_arrow.length > 0 ? <h3>BẠN CÓ MŨI TÊN TRỐNG</h3> : ""}
          </Fragment>
        }

        {lack_arrow.length > 0 &&
          lack_arrow.map((arr, iAr) => {
            return (
              <Fragment key={`emp${iAr}`}>
                <p>{ARROW[arr][0].Y_NGHIA.toUpperCase()}</p>
              </Fragment>
            );
          })}
      </div>
    </div>
  );
}

export default MainNumber;
