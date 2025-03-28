import { useSelector } from "react-redux";
import tomtat from "../../assets/img/tomtat.png";
import {
  STRONG_NUMB,
  WEAK_NUMB,
  ARROW,
  NUMEROLOGY_LIFE_PATH,
  NUMEROLOGY_SOUL_NUMBER,
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
  return (
    <div id="summary">
      <div className="container">
        <h1 className=" h1 my-5 px-2">
          9{") "} <b className="text-info"> Xu hướng nghề nghiệp </b> và{" "}
          <b className="text-danger"> Tóm tắt </b>về bạn{" "}
        </h1>
        <img className=" my-1 w-100" src={tomtat} />
        <div className="m-3  p-3    border border-dark-subtle rounded  ">
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
                  <p>{ARROW[arr][1].Y_NGHIA.toUpperCase()}</p>
                </Fragment>
              );
            })}
        </div>

        <div className="m-3  p-3    border border-dark-subtle rounded  ">
          <h4 className=" mt-3 px-2">ĐIỂM YẾU CỦA BẠN</h4>
          <p class="text-primary">
            Là nhược điểm, bài học, khuyết điểm của bạn
          </p>
          <div>
            {weakNumb.map((numb, index) => {
              // Danh sách số mạnh cần kiểm tra theo từng trường hợp của numb
              const strongNumCheck = {
                1: [11, 10],
                2: [22, 11],
                3: [33, 30],
                6: [33],
              };


              console.log({strongNumb})

              // Kiểm tra nếu strongNumb chứa bất kỳ số nào trong danh sách của numb
              const hasStrongNum = strongNumCheck[numb]?.some((num) =>
                strongNumb.includes(num)
              );

       

              if (!hasStrongNum) {
                return (
                  <Fragment key={index}>
                    {WEAK_NUMB[numb] && WEAK_NUMB[numb].noidung
                      ? parse(WEAK_NUMB[numb].noidung)
                      : null}
                  </Fragment>
                );
              }

              return null;
            })}
          </div>
          <div>
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

        <div className="m-3  p-3    border border-dark-subtle rounded  ">
          <h4 className=" my-5 px-2">SỨ MỆNH</h4>
          <b className="text-danger">{numberDestiny} </b>

          {NUMEROLOGY_LIFE_PATH[numberDestiny] &&
          NUMEROLOGY_LIFE_PATH[numberDestiny].noidung
            ? parse(NUMEROLOGY_LIFE_PATH[numberDestiny].noidung)
            : ""}
        </div>

        <div className="m-3  p-3    border border-dark-subtle rounded  ">
          <h4 className=" my-5 px-2">ĐỘNG LỰC THỎA MÃN</h4>
          {NUMEROLOGY_SOUL_NUMBER[numberSoul] &&
          NUMEROLOGY_SOUL_NUMBER[numberSoul].noidung
            ? parse(NUMEROLOGY_SOUL_NUMBER[numberSoul].noidung)
            : ""}
          'THEM CA NOI DUNG CUAR ' 'THEM CA NOI DUNG DONG LUC THAO MAN CAC SO
          CHU DAO '
        </div>

        <div className="m-3  p-3    border border-dark-subtle rounded  ">
          <h4 className=" my-5 px-2">XU HƯỚNG NGHỀ NGHIỆP</h4>
          VIET XU HUONG NGHE VOI CAC CHI SO MANH
        </div>
      </div>
    </div>
  );
}

export default SummaryAll;
