import { Tag } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { Stage, Layer, Rect, Text, Label } from "react-konva";

const ChartDateName = ({
  numbersData,
  color = "red",
  buttonText,
  buttonColor,
  id_link,
}) => {
  const [wRightPanel, setWLeftPanel] = useState();

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

  const wMatrix = wRightPanel * 0.45;
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

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div class="col-6 my-3" ref={canvasEl}>
      <div className=" d-flex justify-content-center ">
        {/* Vẽ biểu đồ bằng React Konva */}
        {wMatrix && (
          <Stage width={wMatrix} height={hMatrix}>
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
          onClick={() => scrollToSection(id_link)}
        >
          👉 {buttonText}
        </button>
      </div>
    </div>
  );
};

export default ChartDateName;
