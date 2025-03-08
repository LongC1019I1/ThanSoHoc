import sobieudat from "../../assets/img/sobieudat.png";
import { EXPRESSION_NUMBER } from "../../Data/numerology";
import parse from "html-react-parser";
function ExpressNumber() {
  return (
    <div id="express_number">
      <div className="container">
        <h1 className=" h1 my-5 px-2">
          8{") "} Chỉ Số Biểu Đạt <b className="text-danger">Số 6 </b>
        </h1>
        <img className=" my-1 w-100" src={sobieudat} />
        {parse(EXPRESSION_NUMBER[6].noidung)}
      </div>
    </div>
  );
}

export default ExpressNumber;
