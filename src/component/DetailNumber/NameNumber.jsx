import { NUMEROLOGY_NAME } from "../../Data/numerology";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import NumberArticle from "./SubComponent/NumberArticle";
import { INDEX_INTROS } from "./indexIntros";

function NameNumber() {
  const numberName = useSelector((state) => state.numberName.name);
  const content = NUMEROLOGY_NAME[numberName]?.noidung;

  return (
    <NumberArticle
      id="name_number"
      title="Số tên riêng"
      value={numberName}
      intro={INDEX_INTROS.name_number}
      hasContent={Boolean(content)}
    >
      {content && <div className="prose">{parse(content)}</div>}
    </NumberArticle>
  );
}

export default NameNumber;
