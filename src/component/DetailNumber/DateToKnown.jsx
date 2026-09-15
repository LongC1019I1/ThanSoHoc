import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { ARROW } from "../../Data/numerology";
import NumberArticle, { MissingContent } from "./SubComponent/NumberArticle";
import { INDEX_INTROS } from "./indexIntros";

const ArrowItem = ({ arr, type }) => {
  const item = ARROW[arr]?.[type];
  const isFull = type === 1;
  const digits = String(arr).split("");

  return (
    <li className={`arrow-item ${isFull ? "is-full" : "is-empty"}`}>
      <div className="arrow-head">
        <span className="arrow-digits" aria-hidden="true">
          {digits.map((digit) => (
            <span key={digit}>{digit}</span>
          ))}
        </span>
        <div>
          <strong className="arrow-name">{item?.TEN ?? arr}</strong>
          <span className="arrow-tag">
            {isFull ? "Mũi tên đủ" : "Mũi tên trống"} · các số {digits.join(", ")}
          </span>
        </div>
      </div>
      <div className="prose">
        {item?.Y_NGHIA ? parse(item.Y_NGHIA) : <MissingContent />}
      </div>
    </li>
  );
};

const DateToKnown = () => {
  const arrows = useSelector((state) => state.numberKarmaMain.arrow) || [];
  const lack_arrow = useSelector((state) => state.numberKarmaMain.lack_arrow) || [];

  return (
    <NumberArticle
      id="date_to_known"
      title="Mật mã ngày sinh"
      intro={INDEX_INTROS.date_to_known}
    >
      {lack_arrow.length > 0 && (
        <section className="arrow-group">
          <h4>Các mũi tên trống</h4>
          <ul className="arrow-list">
            {lack_arrow.map((arr) => (
              <ArrowItem key={arr} arr={arr} type={0} />
            ))}
          </ul>
        </section>
      )}

      {arrows.length > 0 && (
        <section className="arrow-group">
          <h4>Các mũi tên đủ</h4>
          <ul className="arrow-list">
            {arrows.map((arr) => (
              <ArrowItem key={arr} arr={arr} type={1} />
            ))}
          </ul>
        </section>
      )}

      {!arrows.length && !lack_arrow.length && (
        <MissingContent>
          Ngày sinh này không tạo thành mũi tên đủ hoặc mũi tên trống nào.
        </MissingContent>
      )}
    </NumberArticle>
  );
};

export default DateToKnown;
