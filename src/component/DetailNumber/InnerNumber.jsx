import { useSelector } from "react-redux";
import { INNER_NUMBER } from "../../Data/numerology";
import parse from "html-react-parser";
import { Fragment } from "react";
import NumberArticle, { MissingContent } from "./SubComponent/NumberArticle";
import { INDEX_INTROS } from "./indexIntros";

function InnerNumber() {
  const spaceRegex = /\s+/g;
  const numberInner = useSelector((state) => state.numberName.inner);

  const contents = String(numberInner ?? "")
    .split(spaceRegex)
    .map((numb) => INNER_NUMBER[numb]?.noidung)
    .filter(Boolean);

  return (
    <NumberArticle
      id="inner_number"
      title="Số nội cảm"
      value={numberInner || "Không có"}
      intro={INDEX_INTROS.inner_number}
    >
      {contents.length ? (
        <div className="prose">
          {contents.map((content, index) => (
            <Fragment key={index}>{parse(content)}</Fragment>
          ))}
        </div>
      ) : (
        <MissingContent>
          Họ tên của bạn không có số nào xuất hiện từ 3 lần trở lên, nên không có
          Số nội cảm để diễn giải.
        </MissingContent>
      )}
    </NumberArticle>
  );
}

export default InnerNumber;
