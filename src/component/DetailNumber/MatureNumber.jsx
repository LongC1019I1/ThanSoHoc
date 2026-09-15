import { useSelector } from "react-redux";
import { NUMEROLOGY_MATURITY } from "../../Data/numerology";
import parse from "html-react-parser";
import NumberArticle from "./SubComponent/NumberArticle";
import { INDEX_INTROS } from "./indexIntros";

function MatureNumber() {
  const numberMature = useSelector((state) => state.numberName.mature);
  const content = NUMEROLOGY_MATURITY[numberMature]?.noidung;

  return (
    <NumberArticle
      id="mature_number"
      title="Số trưởng thành"
      value={numberMature}
      intro={INDEX_INTROS.mature_number}
      hasContent={Boolean(content)}
    >
      {content && <div className="prose">{parse(content)}</div>}
    </NumberArticle>
  );
}

export default MatureNumber;
