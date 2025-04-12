import { Tag } from "antd";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { Stage, Layer, Rect, Text, Label, Arrow } from "react-konva";
import { useSelector } from "react-redux";
import sotruongthanh from "../../assets/img/sotruongthanh.png";
import { ARROW } from "../../Data/numerology";
import parse from "html-react-parser";
const DateToKnown = ({
  numbersData,
  color = "red",
  buttonText,
  buttonColor,
}) => {
  const [wRightPanel, setWLeftPanel] = useState();
  const arrows = useSelector((state) => state.numberKarmaMain.arrow);
  const lack_arrow = useSelector((state) => state.numberKarmaMain.lack_arrow);

  const amountNumber = {};
  for (let chr of numbersData.replaceAll("0", "")) {
    if (amountNumber[chr]) {
      amountNumber[chr] += 1;
    } else {
      amountNumber[chr] = 1;
    }
  }

  const canvasEl = useRef(null);

  useEffect(() => {
    const width = canvasEl?.current?.offsetWidth;
    setWLeftPanel(width);
  }, []);

  const wMatrix = wRightPanel * 0.2;
  const hMatrix = (wMatrix / 3) * 3;

  const DrawCell = () => {
    const rects = [];

    for (let x = 0; x < 3; x++) {
      const xx = (wMatrix / 3) * x + 3;
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
              width={wMatrix / 3 - 10}
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
    <Fragment>
      <div className="date_to_known">
        <h1 className=" h1 my-5 px-2">2{") "} Mật mã ngày sinh </h1>
        <img className=" my-1 w-100" src={sotruongthanh} />
      </div>
      <div class=" my-3 row">
        <div className=" d-flex justify-content-center " ref={canvasEl}>
          {/* Vẽ biểu đồ bằng React Konva */}
          {wMatrix && (
            <Stage width={wMatrix} height={hMatrix}>
              <Layer>{DrawCell()}</Layer>
            </Stage>
          )}
        </div>
        {/* MUI TEN TRONG */}

        {lack_arrow.length > 0 && (
          <h5 className=" fw-bold pt-3 pb-2 mx-3 ">CÁC MŨI TÊN TRỐNG</h5>
        )}

        {wRightPanel &&
          lack_arrow.length > 0 &&
          lack_arrow.map((arr, iAr) => {
            const x0 = 10;
            const y0 = 20;
            const arrW = wMatrix * 0.95;
            return (
              <React.Fragment key={`emp${iAr}`}>
                <div className="row my-2  py-1">
                  <div className="col-12">
                    <Stage width={wMatrix + 20} height={hMatrix * 0.2}>
                      <Layer>
                        <Text
                          x={x0 * 2}
                          width={arrW * 0.5}
                          align="left"
                          text={ARROW[arr][0].TEN}
                          fontStyle="bold"
                          fontSize={arrW * 0.06}
                        />
                        {[...Array(3)].map((_, iNum) => {
                          return (
                            <Label
                              key={`empNum${iNum}`}
                              x={x0 + arrW * 0.5 + (arrW / 6) * iNum}
                              y={y0 * 0.15}
                            >
                              <Text
                                width={arrW / 6}
                                align="center"
                                text={arr[iNum]}
                                fontStyle="bold"
                                fontSize={arrW * 0.05}
                              />
                            </Label>
                          );
                        })}
                        <Arrow
                          points={[
                            x0 + (wMatrix * 0.05) / 2,
                            y0 + 15,
                            x0 + hMatrix * 0.95 + 10,
                            y0 + 15,
                          ]}
                          stroke="red"
                          strokeWidth={4}
                        />
                      </Layer>
                    </Stage>
                  </div>
                  <div className="col-12 text-left pb-auto px-4">
                    {parse(ARROW[arr][0].Y_NGHIA)}
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        {/* MUI TEN DU */}
        {arrows.length > 0 && (
          <h5 className=" fw-bold pt-3 pb-2 mx-3 ">CÁC MŨI TÊN ĐỦ</h5>
        )}
        {wRightPanel &&
          arrows.length > 0 &&
          arrows.map((arr, iAr) => {
            const x0 = 10;
            const y0 = 20;
            const arrW = wMatrix * 0.95;
            return (
              <React.Fragment key={iAr}>
                <div className="row my-2 py-1">
                  <div className="col-12">
                    <Stage width={wMatrix + 20} height={hMatrix * 0.2}>
                      <Layer>
                        <Text
                          x={x0 * 2}
                          width={arrW * 0.5}
                          align="left"
                          text={ARROW[arr][1].TEN}
                          fontStyle="bold"
                          fontSize={arrW * 0.06}
                        />
                        {[...Array(3)].map((_, iNum) => {
                          return (
                            <Label
                              key={iNum}
                              x={x0 + arrW * 0.5 + (arrW / 6) * iNum}
                              y={y0 * 0.15}
                            >
                              <Text
                                width={arrW / 6}
                                align="left"
                                text={arr[iNum]}
                                fontStyle="bold"
                                fontSize={arrW * 0.05}
                              />
                            </Label>
                          );
                        })}
                        <Arrow
                          points={[
                            x0 + (wMatrix * 0.05) / 2,
                            y0 + 15,
                            x0 + hMatrix * 0.95 + 10,
                            y0 + 15,
                          ]}
                          stroke="green"
                          strokeWidth={4}
                        />
                      </Layer>
                    </Stage>
                  </div>
                  <div className="col-12 pb-auto px-4">
                    {parse(ARROW[arr][1].Y_NGHIA)}
                  </div>
                </div>
              </React.Fragment>
            );
          })}
      </div>
    </Fragment>
  );
};

export default DateToKnown;
