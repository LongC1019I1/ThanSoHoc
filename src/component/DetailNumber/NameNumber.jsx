import namenumber from "../../assets/img/namenumber.png";
import { NUMEROLOGY_NAME } from "../../Data/numerology";
import parse from "html-react-parser";
function NameNumber() {
  return (
    <div id="name_number">
      <div className="container">
        <h1 className=" h1 my-5 px-2">
          2{") "} Con Số tên <b className="text-info">Long </b> của bạn là:
          <span className="text-danger"> 21/3 </span>
        </h1>
        <img className=" my-1 w-100" src={namenumber} />
        {parse(NUMEROLOGY_NAME[3].noidung)}
      </div>
    </div>
  );
}

export default NameNumber;
