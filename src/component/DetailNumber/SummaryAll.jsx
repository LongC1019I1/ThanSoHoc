import { useSelector } from "react-redux";
import tomtat from "../../assets/img/tomtat.png";
import {
  STRONG_NUMB,
  WEAK_NUMB,
  ARROW,
  NUMEROLOGY_LIFE_PATH,
  NUMEROLOGY_SOUL_NUMBER,
  NUMERLOGY_COMMON,
  NUMERLOGY_JOB,
  SOLUTION_NUMB,
} from "../../Data/numerology";
import parse from "html-react-parser";
import { Fragment } from "react";

function SummaryAll() {
  const strongNumb = useSelector((state) => state.numberKarmaMain.strong_list);
  const weakNumb = useSelector((state) => state.numberKarmaMain.weak_list);
  const arrow = useSelector((state) => state.numberKarmaMain.arrow);
  const lack_arrow = useSelector((state) => state.numberKarmaMain.lack_arrow);
  const numberSoul = useSelector((state) => state.numberName.soul);
  const numberDestiny = useSelector((state) => state.numberName.destiny);
  const numberKarma = useSelector((state) => state.numberKarmaMain.number);
  return (
    <div id="summary">
      <div className="container">
        <h1 className=" h1 my-5 px-2">
          9{") "} <b className="text-info"> Xu hướng nghề nghiệp </b> và{" "}
          <b className="text-danger"> Tóm tắt </b>về bạn{" "}
        </h1>
        <img className=" my-1 w-100" src={tomtat} />
        <div className="m-3  px-3 py-4    border border-dark-subtle rounded  ">
          <h4 className=" mt-3 px-2">ĐIỂM MẠNH CỦA BẠN</h4>
          <p class="text-danger">
            Là tài năng, năng lực, khả năng, đặc điểm chủ đạo của bạn
          </p>
          {strongNumb.map((numb, index) =>
            STRONG_NUMB[numb] && STRONG_NUMB[numb].noidung ? (
              <Fragment key={index}>
                {parse(STRONG_NUMB[numb].noidung)}
              </Fragment>
            ) : null
          )}

          {arrow.length > 0 &&
            arrow.map((arr, iAr) => {
              return (
                <Fragment key={`emp${iAr}`}>
                  <p>{parse(ARROW[arr][1].Y_NGHIA)}</p>
                </Fragment>
              );
            })}
        </div>

        <div className="m-3  px-3 py-4   border border-dark-subtle rounded  ">
          <h4 className=" mt-3 px-2">ĐIỂM YẾU CỦA BẠN</h4>
          <p class="text-primary">
            Là nhược điểm, bài học, khuyết điểm của bạn
          </p>
          <div>
            {weakNumb.map((numb, index) => {
              return (
                <Fragment key={index}>
                  {WEAK_NUMB[numb] && WEAK_NUMB[numb].noidung
                    ? parse(WEAK_NUMB[numb].noidung)
                    : null}
                </Fragment>
              );
            })}
          </div>
          <div className="">
            {lack_arrow.length > 0 &&
              lack_arrow.map((arr, iAr) => {
                return (
                  <Fragment key={`emp${iAr}`}>
                    {parse(ARROW[arr][0].KET_LUAN)}
                  </Fragment>
                );
              })}
          </div>
        </div>

        <div className="m-3  p-3    border border-dark-subtle rounded  ">
          <h4 className=" mt-3 px-2">ĐỘNG LỰC THỎA MÃN</h4>
          <p class="text-danger">Là khao khát nội tâm, mong muốn, sứ mệnh</p>
          <p>
            {NUMEROLOGY_LIFE_PATH[numberDestiny] &&
            NUMEROLOGY_LIFE_PATH[numberDestiny].tomtat
              ? parse(NUMEROLOGY_LIFE_PATH[numberDestiny].tomtat)
              : ""}
          </p>
          <p>
            {NUMEROLOGY_SOUL_NUMBER[numberSoul] &&
            NUMEROLOGY_SOUL_NUMBER[numberSoul].tomtat
              ? parse(NUMEROLOGY_SOUL_NUMBER[numberSoul].tomtat)
              : ""}
          </p>
          <p>
            {NUMEROLOGY_SOUL_NUMBER[numberKarma] &&
            NUMEROLOGY_SOUL_NUMBER[numberKarma]
              ? parse(NUMEROLOGY_SOUL_NUMBER[numberKarma].tomtat)
              : ""}
          </p>
        </div>
        <div className="m-3  p-3    border border-dark-subtle rounded  ">
          <h4 className="  mt-3 px-2 ">XU HƯỚNG NGHỀ NGHIỆP</h4>
          <p class="text-danger">
            Đây là gợi ý xu hướng nghề nghiệp dựa trên năng lượng thuần trong bộ
            số của Bạn, trong thực tế để chọn được nghề nghiệp phù hợp Bạn cần
            xét thêm những yếu tố khác như: Nguồn lực (tài năng thực tế) và lợi
            thế cạnh tranh (mối quan hệ, truyền thống, gia đình, tài chính, nơi
            ở ..vv) của Bạn để Bạn lựa chọn được nghề nghiệp phù hợp nhất.
          </p>
          <div>
            {strongNumb.map((numb, index) =>
              NUMERLOGY_JOB[numb] && NUMERLOGY_JOB[numb].noidung ? (
                <div className="mt-4" key={index}>
                  {parse(NUMERLOGY_JOB[numb].noidung)}
                </div>
              ) : null
            )}
          </div>
        </div>
        <div className="m-3  p-3    border border-dark-subtle rounded  ">
          <h4 className="  mt-3 px-2 ">LỜI KHUYÊN VÀ CÁCH PHÁT TRIỂN</h4>
          <p class="text-danger">
            Là những đề xuất phát triển giúp bạn trở nên hoàn thiện hơn
          </p>
          <div>
            {weakNumb.map((numb, index) => {
              return (
                <Fragment key={index}>
                  {SOLUTION_NUMB[numb] && SOLUTION_NUMB[numb].noidung
                    ? parse(SOLUTION_NUMB[numb].noidung)
                    : null}
                </Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SummaryAll;
