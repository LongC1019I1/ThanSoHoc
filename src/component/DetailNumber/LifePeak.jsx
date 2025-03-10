import { Stage, Layer, Label, Text, Tag } from "react-konva";
import React, { useEffect, useRef, useState, Fragment } from "react";
function LifePeak({ numbers, ages }) {
  const canvasEl = useRef(null);
  const [wRightPanel, setWLeftPanel] = useState();
  const [kamarNumeroMain, setKamarNumeroMain] = useState(9);
  const [topEnergy, setTopEnergy] = useState([]);
  const [numberOfNum, setNumberOfNum] = useState({});
  const wMatrix = wRightPanel * 0.5;
  const hMatrix = (wMatrix / 5) * 3;

  const w4Top = wRightPanel * 0.9;
  const h4Top = (w4Top / 5) * 1.5;

  const subWidth = w4Top / 6;
  const spaceForCenter = (w4Top - subWidth * 1.1 * 4) / 2;

  const DrawCell = () => {
    const rects = [];

    for (let x = 0; x < 5; x++) {
      const xx = ((wMatrix + 1) / 5) * x + 3;
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
          <Label key={x + "" + y} x={xx} y={yy}>
            <Tag stroke="black" />
            <Text
              width={wMatrix / 5 - 10}
              height={hMatrix / 3 - 10}
              fill="black"
              text={
                numberOfNum.hasOwnProperty(text)
                  ? text + "^" + numberOfNum[text]
                  : ""
              }
              align="center"
              verticalAlign="middle"
              fontSize={wMatrix * 0.05}
            />
          </Label>
        );
      }
    }

    return rects;
  };

  useEffect(() => {
    const width = canvasEl?.current?.offsetWidth;
    setWLeftPanel(width);
  }, [kamarNumeroMain]);

  return (
    <Fragment>
      <div
        ref={canvasEl}
        className="col-lg col-md-12 border border-1 border-dark rounded mb-2 px-2"
      >
        <div className="text-center fw-bold py-2">TRỌNG SỐ NĂNG LƯỢNG</div>
        <div className="row">
          {wMatrix && (
            <Stage
              width={wMatrix}
              height={hMatrix}
              className="col-7 d-flex justify-content-left"
            >
              <Layer>{DrawCell()}</Layer>
            </Stage>
          )}
          <div className="col-5 d-flex flex-column">
            {topEnergy.map((p, key) => {
              return (
                <div key={key} className="d-flex align-items-center my-2">
                  <StarFilled className="text-primary" />
                  <Popover
                    style={{ whiteSpace: "pre-wrap" }}
                    content={
                      "Dương: " +
                      NUMEROLOGY_KARMA[p.num].DUONG +
                      "\n Âm: " +
                      NUMEROLOGY_KARMA[p.num].AM
                    }
                    trigger="click"
                  >
                    <span className="px-3" style={{ cursor: "pointer" }}>
                      {p.num + "^" + p.amount}
                    </span>
                  </Popover>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default LifePeak;
