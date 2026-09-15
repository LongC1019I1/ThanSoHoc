import { useSelector } from "react-redux";
import { NUMEROLOGY_SOUL_NUMBER } from "../../Data/numerology";
import parse from "html-react-parser";
import NumberArticle from "./SubComponent/NumberArticle";
import { INDEX_INTROS } from "./indexIntros";

function SoulNumber() {
  const numberSoul = useSelector((state) => state.numberName.soul);
  const content = NUMEROLOGY_SOUL_NUMBER[numberSoul]?.noidung;

  return (
    <NumberArticle
      id="soul_number"
      title="Số linh hồn"
      value={numberSoul}
      intro={INDEX_INTROS.soul_number}
      hasContent={Boolean(content)}
    >
      {content && <div className="prose">{parse(content)}</div>}
    </NumberArticle>
  );
}

export default SoulNumber;
