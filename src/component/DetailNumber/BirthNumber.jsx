import { useSelector } from "react-redux";
import { NUMEROLOGY_BIRTHDAY_NUMBER } from "../../Data/numerology";
import parse from "html-react-parser";
import NumberArticle from "./SubComponent/NumberArticle";
import { INDEX_INTROS } from "./indexIntros";

function BirthNumber() {
  const numberDayBirth = useSelector(
    (state) => state.numberKarmaMain.day_birth
  );
  const content = NUMEROLOGY_BIRTHDAY_NUMBER[numberDayBirth]?.noidung;

  return (
    <NumberArticle
      id="birth_number"
      title="Số ngày sinh"
      value={numberDayBirth}
      intro={INDEX_INTROS.birth_number}
      hasContent={Boolean(content)}
    >
      {content && <div className="prose">{parse(content)}</div>}
    </NumberArticle>
  );
}

export default BirthNumber;
