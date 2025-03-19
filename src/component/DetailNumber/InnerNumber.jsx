import { useSelector } from "react-redux";
import sonoicam from "../../assets/img/sonoicam.png";
import { INNER_NUMBER } from "../../Data/numerology";
import parse from "html-react-parser";

function InnerNumber() {
  const numberInner = useSelector((state) => state.numberName.inner);
  return (
    <div id="inner_number">
      <div className="container">
        <h1 className=" h1 my-5 px-2">
          9{") "} Chỉ Số Nội Cảm{" "}
          <b className="text-danger">Số {numberInner} </b>
        </h1>
        <img className=" my-1 w-100" src={sonoicam} />
        {INNER_NUMBER[numberInner] && INNER_NUMBER[numberInner].noidung
          ? parse(INNER_NUMBER[numberInner].noidung)
          : ""}
      </div>
    </div>
  );
}

export default InnerNumber;
