import sotruongthanh from "../../assets/img/sotruongthanh.png";
import { NUMEROLOGY_MATURITY } from "../../Data/numerology";
import parse from "html-react-parser";
function MatureNumber() {
  return (
    <div id="mature_number">
      <div className="container">
        <h1 className=" h1 my-5 px-2">
          5{") "} Con Số Trưởng Thành <b className="text-danger">Số 5 </b>
        </h1>
        <img className=" my-1 w-100" src={sotruongthanh} />
        {parse(NUMEROLOGY_MATURITY[5].noidung)}
      </div>
    </div>
  );
}

export default MatureNumber;
