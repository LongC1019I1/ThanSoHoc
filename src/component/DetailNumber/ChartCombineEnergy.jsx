import { useEffect } from "react";
import { FiArrowRight } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { filterRealNumber } from "../../service/numerlogy";
import { numberKarmaActions } from "../../store/numberKarma";
import NumberGrid from "./SubComponent/NumberGrid";

// Cùng vị trí ô với biểu đồ Konva cũ: hàng trên 3-6-9-30-33, giữa 2-5-8-20-11, dưới 1-4-7-10-22.
const LAYOUT = [3, 6, 9, 30, 33, 2, 5, 8, 20, 11, 1, 4, 7, 10, 22];

const toList = (key) => (key ? key.split(",").map(Number) : []);

const ChartCombineEnergy = function () {
  const dispatch = useDispatch();
  // combineChart
  const birthString = useSelector((state) => state.numberKarmaMain.birth_day);
  const full_name_number = useSelector(
    (state) => state.numberName.full_name_number
  );
  const main = useSelector((state) => state.numberKarmaMain.number);
  const soul = useSelector((state) => state.numberName.soul);
  const destiny = useSelector((state) => state.numberName.destiny);
  const mature = useSelector((state) => state.numberName.mature);
  const express = useSelector((state) => state.numberName.express);
  const nameNumber = useSelector((state) => state.numberName.name);
  const atitute = useSelector((state) => state.numberKarmaMain.atitute);
  const day_birth = useSelector((state) => state.numberKarmaMain.day_birth);
  const top4 = useSelector((state) => state.numberKarmaMain.top4.top4_peak);
  const strongBirthNumb = filterRealNumber(birthString, 2);
  const strongNameNumb = filterRealNumber(full_name_number, 3);

  let listNumbCombine =
    "" +
    strongBirthNumb +
    strongNameNumb +
    atitute +
    day_birth +
    nameNumber +
    soul +
    express;

  const amountNumber = {};
  for (let chr of listNumbCombine.replaceAll("0", "")) {
    if (amountNumber[chr]) {
      amountNumber[chr] += 1;
    } else {
      amountNumber[chr] = 1;
    }
  }

  for (let top in top4) {
    if (!top4[top].num) {
      continue;
    }
    if (amountNumber[top4[top].num]) {
      amountNumber[top4[top].num] += 2;
    } else {
      amountNumber[top4[top].num] = 2;
    }
  }

  amountNumber[main] = amountNumber[main] ? amountNumber[main] + 4 : 4;

  amountNumber[destiny] = amountNumber[destiny] ? amountNumber[destiny] + 3 : 3;
  amountNumber[mature] = amountNumber[mature] ? amountNumber[mature] + 3 : 3;

  // start Kiem tra so manh va yeu

  const stong_arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 20, 22, 30, 33];
  const strongNumber = stong_arr.filter((num) => amountNumber[num] >= 4);

  const strong_arr_sort = strongNumber.sort(
    (a, b) => amountNumber[b] - amountNumber[a]
  );

  const weak_arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const weakNumbers = weak_arr.filter(
    // eslint-disable-next-line no-prototype-builtins -- giữ nguyên thuật toán gốc
    (num) => !amountNumber.hasOwnProperty(num)
  );
  const arr_check_weak = Object.keys(amountNumber).map(Number);

  const filteredWeakContents = weakNumbers.reduce((acc, numb) => {
    const strongNumCheck = {
      1: [11, 10],
      2: [22, 11],
      4: [22],
      3: [33, 30],
      6: [33],
    };

    const hasStrongNum = strongNumCheck[numb]?.some((num) =>
      arr_check_weak.includes(num)
    );

    if (!hasStrongNum) {
      acc.push(numb);
    }

    return acc;
  }, []);

  // end

  // Dispatch sau khi render (không dispatch trong lúc render); giá trị giữ nguyên như trước.
  const strongKey = strong_arr_sort.join(",");
  const weakKey = filteredWeakContents.join(",");
  useEffect(() => {
    dispatch(numberKarmaActions.setStrongListNumb(toList(strongKey)));
    dispatch(numberKarmaActions.setWeakListNumb(toList(weakKey)));
  }, [dispatch, strongKey, weakKey]);

  return (
    <figure className="chart-card chart-card--wide">
      <figcaption className="chart-caption">
        <h3>Tổng hợp năng lượng</h3>
        <p>
          Tổng hợp từ các số lặp trong ngày sinh và họ tên, các chỉ số chính và
          bốn đỉnh cao. Số có từ 4 lần trở lên là số mạnh; số mạnh và số yếu
          được dùng cho phần Tổng kết.
        </p>
      </figcaption>
      <NumberGrid layout={LAYOUT} columns={5} amountNumber={amountNumber} />
      <dl className="energy-lists">
        <div>
          <dt>Số mạnh</dt>
          <dd>{strong_arr_sort.length ? strong_arr_sort.join(", ") : "Không có"}</dd>
        </div>
        <div>
          <dt>Số yếu</dt>
          <dd>
            {filteredWeakContents.length ? filteredWeakContents.join(", ") : "Không có"}
          </dd>
        </div>
      </dl>
      <a className="ghost-button" href="#summary_all">
        Xem tóm tắt về bạn <FiArrowRight aria-hidden="true" />
      </a>
    </figure>
  );
};

export default ChartCombineEnergy;
