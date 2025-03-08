import solinhhon from "../../assets/img/solinhhon.png";
import { NUMEROLOGY_SOUL_NUMBER } from "../../Data/numerology";
import parse from "html-react-parser";
function SoulNumber() {
  return (
    <div id="soul_number">
      <div className="container">
        <h1 className=" h1 my-5 px-2">
          7{") "} Chỉ Số Linh Hồn <b className="text-danger">Số 8 </b>
        </h1>
        <img className=" my-1 w-100" src={solinhhon} />
        {parse(NUMEROLOGY_SOUL_NUMBER[8].noidung)}
      </div>
    </div>
  );
}

export default SoulNumber;
