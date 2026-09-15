import { NUMEROLOGY_LIFE_PATH } from "../../Data/numerology";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import NumberArticle from "./SubComponent/NumberArticle";
import { INDEX_INTROS } from "./indexIntros";

function DestinyNumber() {
  const numberDestiny = useSelector((state) => state.numberName.destiny);
  const content = NUMEROLOGY_LIFE_PATH[numberDestiny]?.noidung;

  return (
    <NumberArticle
      id="destiny_number"
      title="Số định mệnh"
      value={numberDestiny}
      intro={INDEX_INTROS.destiny_number}
      hasContent={Boolean(content)}
    >
      {content && <div className="prose">{parse(content)}</div>}
    </NumberArticle>
  );
}

export default DestinyNumber;
