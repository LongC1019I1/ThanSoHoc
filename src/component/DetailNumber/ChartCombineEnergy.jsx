import { Tag } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { Stage, Layer, Rect, Text, Label } from "react-konva";
import { useDispatch, useSelector } from "react-redux";
import { filterRealNumber } from "../../service/numerlogy";
import { numberKarmaActions } from "../../store/numberKarma";
const ChartCombineEnergy = function ({
  color = "red",
  buttonText,
  buttonColor,
}) {
  const [wRightPanel, setWLeftPanel] = useState();
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

  dispatch(numberKarmaActions.setStrongListNumb(strong_arr_sort));
  console.log({ strongNumber });

  const weak_arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const weakNumbers = weak_arr.filter(
    (num) => !amountNumber.hasOwnProperty(num)
  );

  const filteredWeakContents = weakNumbers.reduce((acc, numb) => {
    const strongNumCheck = {
      1: [11, 10],
      2: [22, 11],
      3: [33, 30],
      6: [33],
    };

    const hasStrongNum = strongNumCheck[numb]?.some((num) =>
      strong_arr_sort.includes(num)
    );

    if (!hasStrongNum) {
      acc.push(numb);
    }

    return acc;
  }, []);
  console.log({ filteredWeakContents });

  dispatch(numberKarmaActions.setWeakListNumb(filteredWeakContents));

  // end
  const canvasEl = useRef(null);

  useEffect(() => {
    const width = canvasEl?.current?.offsetWidth;
    setWLeftPanel(width);
  }, []);

  const wMatrix = wRightPanel * 0.45;
  const hMatrix = (wMatrix / 3) * 3;

  const DrawCell = () => {
    const rects = [];

    for (let x = 0; x < 5; x++) {
      const xx = ((wMatrix + 190) / 5) * x + 3;
      for (let y = 0; y < 3; y++) {
        const yy = hMatrix - (hMatrix / 3) * (y + 1) + 5;

        const stt = y + 1 + 3 * x;
        let text =
          stt === 11
            ? 20
            : stt === 12
            ? 30
            : stt === 13
            ? 22
            : stt === 14
            ? 11
            : stt === 15
            ? 33
            : stt;
        rects.push(
          <React.Fragment key={`${x}-${y}`}>
            {/* Vẽ viền ô */}
            <Rect
              x={xx}
              y={yy}
              width={wMatrix / 5 + 30}
              height={hMatrix / 3 - 10}
              fill="white"
              stroke="black" // Thêm viền đen
              strokeWidth={2} // Độ dày viền
            />
            {/* Hiển thị số bên trong */}
            <Text
              x={xx}
              y={yy}
              width={wMatrix / 3 - 10}
              height={hMatrix / 3 - 10}
              fontStyle="bold"
              fill={color}
              align="center"
              text={
                amountNumber.hasOwnProperty(text)
                  ? text + "^" + amountNumber[text]
                  : ""
              }
              verticalAlign="middle"
              fontSize={wMatrix * 0.06}
            />
          </React.Fragment>
        );
      }
    }

    return rects;
  };

  return (
    <div class="col-6 my-3" ref={canvasEl}>
      <div className=" d-flex justify-content-center ">
        {/* Vẽ biểu đồ bằng React Konva */}
        {wMatrix && (
          <Stage width={wMatrix + 200} height={hMatrix}>
            <Layer>{DrawCell()}</Layer>
          </Stage>
        )}
      </div>
      {/* Nút bấm */}

      <div class="d-flex justify-content-center">
        <button
          className={` btn mybtn`}
          style={{
            backgroundColor: buttonColor,
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          👉 {buttonText}
        </button>
      </div>
    </div>
  );
};

export default ChartCombineEnergy;
