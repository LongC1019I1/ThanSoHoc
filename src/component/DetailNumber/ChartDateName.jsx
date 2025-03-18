import React, { useEffect, useRef, useState } from "react";
import { Stage, Layer, Rect, Text } from "react-konva";

const ChartDateName = ({ numbersData, color, buttonText, buttonColor }) => {
  const [wRightPanel, setWLeftPanel] = useState();

  const numbersPosition = [
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
    [4, 0],
    [0, 1],
    [1, 1],
    [2, 1],
    [3, 1],
    [4, 1],
    [0, 2],
    [1, 2],
    [2, 2],
    [3, 2],
    [4, 2],
  ];

  const canvasEl = useRef(null);

  useEffect(() => {
    const width = canvasEl?.current?.offsetWidth;
    console.log({ canvasEl });

    setWLeftPanel(width);
  }, []);

  const gridSize = (wRightPanel / 5) * 0.6; // Kích thước mỗi ô
  const padding = 10; // Khoảng cách giữa các ô

  return (
    <div class="col-6 my-3" ref={canvasEl}>
      <div className=" d-flex justify-content-center ">
        {/* Vẽ biểu đồ bằng React Konva */}
        <Stage width={gridSize * 5} height={gridSize * 3}>
          <Layer>
            {/* Vẽ lưới */}
            {numbersPosition.map(([x, y], index) => (
              <Rect
                key={index}
                x={x * gridSize}
                y={y * gridSize}
                width={gridSize - padding}
                height={gridSize - padding}
                stroke="black"
              />
            ))}
            {/* Vẽ số */}
            {numbersData.map(({ num, x, y }, index) => (
              <Text
                key={index}
                text={num.toString()}
                x={x * gridSize}
                y={y * gridSize}
                width={gridSize - padding}
                height={gridSize - padding}
                fontSize={24}
                fontStyle="bold"
                align="center"
                verticalAlign="middle"
                fill={color}
              />
            ))}
          </Layer>
        </Stage>
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

export default ChartDateName;
