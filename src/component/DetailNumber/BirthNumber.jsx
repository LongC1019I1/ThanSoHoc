import songaysinh from "../../assets/img/songaysinh.png";
import { NUMEROLOGY_BIRTHDAY_NUMBER } from "../../Data/numerology";
import parse from "html-react-parser";
function BirthNumber() {
  return (
    <div id="birth_number">
      <div className="container">
        <h1 className=" h1 my-5 px-2">
          6{") "} Chỉ Số Ngày Sinh <b className="text-danger">Số 10 </b>
        </h1>
        <img className=" my-1 w-100" src={songaysinh} />
        {parse(NUMEROLOGY_BIRTHDAY_NUMBER[10].noidung)}
      </div>
    </div>
  );
}

export default BirthNumber;
