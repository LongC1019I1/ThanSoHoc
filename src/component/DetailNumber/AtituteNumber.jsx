import attituteNumber from "../../assets/img/atitutenumber.png";
import { NUMEROLOGY_ATTITUDE } from "../../Data/numerology";
import parse from "html-react-parser";
function AtituteNumber() {
  return (
    <div id="atitute_number">
      <div className="container">
        <h1 className=" h1 my-5 px-2">
          4{") "} Con Số Thái Độ <b className="text-danger">Số 2 </b>
        </h1>
        <img className=" my-1 w-100" src={attituteNumber} />
        {parse(NUMEROLOGY_ATTITUDE[2].noidung)}
      </div>
    </div>
  );
}

export default AtituteNumber;
