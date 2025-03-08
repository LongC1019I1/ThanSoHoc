import sonoicam from "../../assets/img/sonoicam.png";
import { INNER_NUMBER } from "../../Data/numerology";
import parse from "html-react-parser";
function InnerNumber() {
  return (
    <div id="inner_number">
      <div className="container">
        <h1 className=" h1 my-5 px-2">
          9{") "} Chỉ Số Nội Cảm <b className="text-danger">Số 8 </b>
        </h1>
        <img className=" my-1 w-100" src={sonoicam} />
        {parse(INNER_NUMBER[8].noidung)}
      </div>
    </div>
  );
}

export default InnerNumber;
