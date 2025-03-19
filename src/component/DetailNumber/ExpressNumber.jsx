import sobieudat from "../../assets/img/sobieudat.png";
import { EXPRESSION_NUMBER } from "../../Data/numerology";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
function ExpressNumber() {
  const numberExpress = useSelector((state) => state.numberName.express);
  return (
    <div id="express_number">
      <div className="container">
        <h1 className=" h1 my-5 px-2">
          8{") "} Chỉ Số Biểu Đạt{" "}
          <b className="text-danger">Số {numberExpress} </b>
        </h1>
        <img className=" my-1 w-100" src={sobieudat} />
        {EXPRESSION_NUMBER[numberExpress] &&
        EXPRESSION_NUMBER[numberExpress].noidung
          ? parse(EXPRESSION_NUMBER[numberExpress].noidung)
          : ""}
      </div>
    </div>
  );
}

export default ExpressNumber;
