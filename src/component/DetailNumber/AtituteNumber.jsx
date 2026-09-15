import { useSelector } from "react-redux";
import { NUMEROLOGY_ATTITUDE } from "../../Data/numerology";
import parse from "html-react-parser";
import NumberArticle from "./SubComponent/NumberArticle";
import { INDEX_INTROS } from "./indexIntros";

function AtituteNumber() {
  const numbeAtitute = useSelector((state) => state.numberKarmaMain.atitute);
  const content = NUMEROLOGY_ATTITUDE[numbeAtitute]?.noidung;

  return (
    <NumberArticle
      id="atitute_number"
      title="Số thái độ"
      value={numbeAtitute}
      intro={INDEX_INTROS.atitute_number}
      hasContent={Boolean(content)}
    >
      {content && <div className="prose">{parse(content)}</div>}
    </NumberArticle>
  );
}

export default AtituteNumber;
