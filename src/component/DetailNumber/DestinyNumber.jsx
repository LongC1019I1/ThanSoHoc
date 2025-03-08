import sobieudat from "../../assets/img/sobieudat.png";
import { NUMEROLOGY_LIFE_PATH } from "../../Data/numerology";
import parse from "html-react-parser";
function DestinyNumber() {
  return (
    <div id="destiny_number">
      <div className="container">
        <h1 className=" h1 my-5 px-2">
          3{") "} Con Số Định Mệnh <b className="text-danger">Số 5 </b>
        </h1>
        <img className=" my-1 w-100" src={sobieudat} />
        {parse(NUMEROLOGY_LIFE_PATH[5].noidung)}
      </div>
    </div>
  );
}

export default DestinyNumber;
