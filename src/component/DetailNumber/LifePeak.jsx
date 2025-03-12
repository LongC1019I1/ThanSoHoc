import {
  Stage,
  Layer,
  Label,
  Text,
  Tag,
  Arrow,
  Circle,
  Line,
} from "react-konva";
import React, { useEffect, useRef, useState, Fragment } from "react";
function LifePeak({ numbers, ages }) {
  const canvasEl = useRef(null);
  const [wRightPanel, setWLeftPanel] = useState();
  const [kamarNumeroMain, setKamarNumeroMain] = useState(9);

  const w4Top = wRightPanel * 0.9;
  const h4Top = w4Top / 2;

  const subWidth = w4Top / 6;
  const spaceForCenter = (w4Top - subWidth * 1.1 * 4) / 2;

  useEffect(() => {
    const width = canvasEl?.current?.offsetWidth;
    setWLeftPanel(width);
  }, [kamarNumeroMain]);

  // 4 dinh
  const topFour = {
    numberbase: { num1: "1", num2: "1", num3: "7" },
    top01: { num: "2", year: 2023, age: 27 },
    top02: { num: "8", year: 2032, age: 36 },
    top03: { num: "10", year: 2041, age: 45 },
    top04: { num: "8", year: 2050, age: 54 },
  };
  const radius = 10;
  const x0 = 50;
  const y0 = 5;

  var gray_color = "#b2aea5";
  return (
    <Fragment>
      <div
        ref={canvasEl}
        className="col-lg col-md-12 mt-5 border border-1 border-dark rounded mb-2 px-2"
      >
        <Stage
          width={w4Top}
          height={h4Top}
          className="d-flex mx-3 my-3 justify-content-center "
        >
          <Layer>
            {console.log({
              x: x0 + radius,
              y: subWidth + 2 * y0 + radius,
              x1: w4Top - 2 * radius - 3 * x0,
              y1: subWidth + 2 * y0 + radius,
            })}
            <Line
              points={[
                subWidth,
                h4Top / 2 + 50,
                subWidth + 300,
                h4Top / 2 + 50,
                subWidth + 150,
                h4Top / 4,
              ]}
              closed
              lineCap="round"
              lineJoin="round"
              stroke="black"
              strokeWidth={3}
            />
            {/* CAC DIEM VE CAC DINH */}

            {/* CAC DINH */}
            {/* DINH 4 */}
            <Circle
              x={subWidth + 150}
              y={h4Top / 4}
              radius={radius + 10}
              fill="white"
            />
            <Label x={subWidth + 150 - 5} y={h4Top / 4 - 3}>
              <Text
                align="center"
                verticalAlign="middle"
                text="8"
                fill="red"
                fontSize={subWidth * 0.09}
              />
            </Label>

            {/* DINH 3 */}
            <Line
              points={[
                subWidth + 100,
                h4Top / 2 - 10,
                subWidth + 200,
                h4Top / 2 - 10,
                subWidth + 150,
                h4Top / 2 - 10 - 60,
              ]}
              closed
              lineCap="round"
              lineJoin="round"
              stroke="black"
              strokeWidth={3}
            />
            <Circle
              x={subWidth + 150}
              y={h4Top / 2 - 10 - 60}
              radius={radius + 5}
              fill="white"
            />
            <Label x={subWidth + 150 - 5} y={h4Top / 2 - 10 - 60 - 8}>
              <Text
                align="center"
                verticalAlign="middle"
                text="8"
                fill="red"
                fontSize={subWidth * 0.09}
              />
            </Label>
            {/*   DINH 3 + TUOI */}
            <Line
              points={[
                subWidth + 130,
                h4Top / 2 - 10 - 60 - 10,
                subWidth + 130 - 60,
                h4Top / 2 - 10 - 60 - 40,
              ]}
              lineJoin="round"
              stroke="blue"
              strokeWidth={2}
              dash={[10, 10]}
            />
            <Label x={subWidth + 130 - 130} y={h4Top / 2 - 10 - 60 - 60}>
              <Text
                align="center"
                verticalAlign="middle"
                text="45 "
                fill="red"
                fontSize={15}
              />

              <Text
                align="center"
                verticalAlign="middle"
                x={+20}
                text="tuổi"
                fill="#908c89"
                fontSize={15}
              />

              <Text
                align="center"
                verticalAlign="middle"
                x={+48}
                text="(2041)"
                fill="blue"
                fontSize={15}
              />
            </Label>

            {/* DINH 2 */}
            <Line
              points={[
                subWidth + 150,
                h4Top / 2 + 50,
                subWidth + 250,
                h4Top / 2 + 50,
                subWidth + 200,
                h4Top / 2 - 10,
              ]}
              closed
              lineCap="round"
              lineJoin="round"
              stroke="black"
              strokeWidth={3}
            />
            <Circle
              x={subWidth + 200}
              y={h4Top / 2 - 10}
              radius={radius + 5}
              fill="white"
            />
            <Label x={subWidth + 200 - 5} y={h4Top / 2 - 15}>
              <Text
                align="center"
                verticalAlign="middle"
                text="8"
                fill="red"
                fontSize={subWidth * 0.09}
              />
            </Label>
            {/* DINH 1 */}

            <Line
              points={[
                subWidth + 50,
                h4Top / 2 + 50,
                subWidth + 150,
                h4Top / 2 + 50,
                subWidth + 100,
                h4Top / 2 - 10,
              ]}
              closed
              lineCap="round"
              lineJoin="round"
              stroke="black"
              strokeWidth={3}
            />
            <Circle
              x={subWidth + 100}
              y={h4Top / 2 - 10}
              radius={radius + 5}
              fill="white"
            />
            <Label x={subWidth + 100 - 5} y={h4Top / 2 - 15}>
              <Text
                align="center"
                verticalAlign="middle"
                text="8"
                fill="red"
                fontSize={subWidth * 0.09}
              />
            </Label>
            {/*   DINH 1 + TUOI */}

            <Line
              points={[
                subWidth + 50,
                h4Top / 2 + 50,
                subWidth + 50 - 60,
                h4Top / 2 - 10 - 60 ,
              ]}
              lineJoin="round"
              stroke="blue"
              strokeWidth={2}
              dash={[10, 10]}
            />
            <Label x={subWidth + 100 - 130} y={h4Top / 2 - 10 - 60}>
              <Text
                align="center"
                verticalAlign="middle"
                text="45 "
                fill="red"
                fontSize={15}
              />

              <Text
                align="center"
                verticalAlign="middle"
                x={+20}
                text="tuổi"
                fill="#908c89"
                fontSize={15}
              />

              <Text
                align="center"
                verticalAlign="middle"
                x={+48}
                text="(2041)"
                fill="blue"
                fontSize={15}
              />
            </Label>
            {/* DIEM 1 */}
            <Circle
              x={subWidth + 50}
              y={h4Top / 2 + 50}
              radius={radius}
              fill="white"
            />
            <Label x={subWidth + 50 - 5} y={h4Top / 2 + +50 - 8}>
              <Text
                align="center"
                verticalAlign="middle"
                text="1"
                fill={gray_color}
                fontSize={subWidth * 0.09}
              />
            </Label>

            {/* DIEM 2 */}
            <Circle
              x={subWidth + 149}
              y={h4Top / 2 + 50}
              radius={radius}
              fill="white"
            />
            <Label x={subWidth + 149 - 5} y={h4Top / 2 + 50 - 8}>
              <Text
                align="center"
                verticalAlign="middle"
                text="9"
                fill={gray_color}
                fontSize={subWidth * 0.09}
              />
            </Label>

            {/* DIEM 3 */}
            <Circle
              x={subWidth + 250}
              y={h4Top / 2 + 50}
              radius={radius}
              fill="white"
            />
            <Label x={subWidth + 250 - 5} y={h4Top / 2 + 50 - 8}>
              <Text
                align="center"
                verticalAlign="middle"
                text="7"
                fill={gray_color}
                fontSize={subWidth * 0.09}
              />
            </Label>
          </Layer>
        </Stage>
      </div>
    </Fragment>
  );
}

export default LifePeak;
