import { EXPRESSION_NUMBER } from "../../Data/numerology";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import NumberArticle from "./SubComponent/NumberArticle";
import { INDEX_INTROS } from "./indexIntros";

function ExpressNumber() {
  const numberExpress = useSelector((state) => state.numberName.express);
  const content = EXPRESSION_NUMBER[numberExpress]?.noidung;

  return (
    <NumberArticle
      id="express_number"
      title="Số biểu đạt"
      value={numberExpress}
      intro={INDEX_INTROS.express_number}
      hasContent={Boolean(content)}
    >
      {content && <div className="prose">{parse(content)}</div>}
    </NumberArticle>
  );
}

export default ExpressNumber;
