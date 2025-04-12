import sotenrieng from "../../assets/img/namenumber.png";
import { NUMEROLOGY_NAME } from "../../Data/numerology";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
function NameNumber() {
  const numberName = useSelector((state) => state.numberName.name);
  return (
    <div id="name_number">
      <div className="container">
        <h1 className=" h1 my-5 px-2">
          3{") "} Con Số tên <b className="text-info"> </b> của bạn là:{" "}
          <span className="text-danger"> {numberName} </span>
        </h1>
        <img className=" my-1 w-100" src={sotenrieng} />

        {NUMEROLOGY_NAME[numberName] && NUMEROLOGY_NAME[numberName].noidung
          ? parse(NUMEROLOGY_NAME[numberName].noidung)
          : ""}
      </div>
    </div>
  );
}

export default NameNumber;
