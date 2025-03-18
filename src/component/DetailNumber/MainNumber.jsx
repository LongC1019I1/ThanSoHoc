import sochudao from "../../assets/img/sochudao.png";
import { NUMEROLOGY_KARMA } from "../../Data/numerology";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

function MainNumber() {
  const numberKarma = useSelector((state) => state.numberKarmaMain.number);

  console.log({ numberKarma });

  return (
    <div id="main_number">
      <div className="container">
        <h1 className=" h1 my-5 px-2">
          1{") "} Con số chủ đạo của bạn là:
          <span className="text-danger">
            {" "}
            Số {NUMEROLOGY_KARMA[numberKarma].SO_CHU_DAO}
          </span>
        </h1>
        <img className=" my-1 w-100" src={sochudao} />

        <section className="mt-4">
          <h4 className="uppercase fw-bold my-4">🔥 Đặc điểm nổi bật</h4>
          {parse(NUMEROLOGY_KARMA[numberKarma].DAC_DIEM)}
        </section>

        <section className="mt-4">
          {parse(NUMEROLOGY_KARMA[numberKarma].CAN_BANG.noidung)}
        </section>

        <section className="mt-4">
          {parse(NUMEROLOGY_KARMA[numberKarma].YEU.noidung)}
        </section>

        <section className="mt-4">
          {parse(NUMEROLOGY_KARMA[numberKarma].QUA_MANH.noidung)}
        </section>

        <section className="mt-4">
          {parse(NUMEROLOGY_KARMA[numberKarma].TOM_TAT.noidung)}
        </section>

        <section className="mt-4 text-center">
          {/* {parse(NUMEROLOGY_KARMA[numberKarma].KET_LUAN.noidung)} */}
          {/* {parse(NUMEROLOGY_KARMA[numberKarma].KET_LUAN.thong_diep)} */}
        </section>
      </div>
    </div>
  );
}

export default MainNumber;
