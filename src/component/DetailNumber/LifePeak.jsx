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
function LifePeak({ numbers, ages, btn }) {
  const canvasEl = useRef(null);
  const [wRightPanel, setWLeftPanel] = useState();
  const [kamarNumeroMain, setKamarNumeroMain] = useState(9);

  const w4Top = wRightPanel * 1.2;
  const h4Top = w4Top / 1.4;

  const subWidth = w4Top / 8;
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
  const radius = 15;

  var gray_color = "#b2aea5";

  //

  // VE TAM GIAC 4 DINH CUOC DOI

  const spaceShowNumPeak = { x: 90, y: 20 };

  const TAMGIACNGOAI = {
    x: subWidth,
    y: h4Top / 2 + 50,
    x1: subWidth + 300,
    y1: h4Top / 2 + 50,
    x2: subWidth + 150,
    y2: h4Top / 4,
  };

  // Dinh 3

  const TAMGIACDINH3 = {
    x: subWidth + 100,
    y: h4Top / 2 - 10,
    x1: subWidth + 200,
    y1: h4Top / 2 - 10,
    x2: subWidth + 150,
    y2: h4Top / 2 - 70,
  };

  const TUOIDINH3 = {
    muiten: {
      x: TAMGIACDINH3.x2 - 20,
      y: TAMGIACDINH3.y2 - 10,
      x1: TAMGIACDINH3.x2 - 80,
      y1: TAMGIACDINH3.y2 - 40,
    },
  };

  TUOIDINH3.chisotuoi = {
    x: TUOIDINH3.muiten.x1 - spaceShowNumPeak.x,
    y: TUOIDINH3.muiten.y1 - spaceShowNumPeak.y,
  };

  // Dinh 4

  const DINH4 = { x: TAMGIACNGOAI.x2, y: TAMGIACNGOAI.y2 };

  const TUOIDINH4 = {
    muiten: {
      x: DINH4.x + 20,
      y: DINH4.y - 10,
      x1: DINH4.x + 80,
      y1: DINH4.y - 40,
    },
  };

  TUOIDINH4.chisotuoi = {
    x: TUOIDINH4.muiten.x1 + 5,
    y: TUOIDINH4.muiten.y1 - spaceShowNumPeak.y,
  };

  // Dinh 2
  const TAMGIACDINH2 = {
    x: subWidth + 150,
    y: h4Top / 2 + 50,
    x1: subWidth + 250,
    y1: h4Top / 2 + 50,
    x2: subWidth + 200,
    y2: h4Top / 2 - 10,
  };

  const TUOIDINH2 = {
    muiten: {
      x: TAMGIACDINH2.x2 + 20,
      y: TAMGIACDINH2.y2 - 10,
      x1: TAMGIACDINH2.x2 + 80,
      y1: TAMGIACDINH2.y2 - 40,
    },
  };

  TUOIDINH2.chisotuoi = {
    x: TUOIDINH2.muiten.x1 + 5,
    y: TUOIDINH2.muiten.y1 - spaceShowNumPeak.y,
  };

  // Dinh 1
  const TAMGIACDINH1 = {
    x: subWidth + 50,
    y: h4Top / 2 + 50,
    x1: subWidth + 150,
    y1: h4Top / 2 + 50,
    x2: subWidth + 100,
    y2: h4Top / 2 - 10,
  };

  const TUOIDINH1 = {
    muiten: {
      x: TAMGIACDINH1.x2 - 20,
      y: TAMGIACDINH1.y2 - 10,
      x1: TAMGIACDINH1.x2 - 80,
      y1: TAMGIACDINH1.y2 - 40,
    },
  };

  TUOIDINH1.chisotuoi = {
    x: TUOIDINH1.muiten.x1 - spaceShowNumPeak.x,
    y: TUOIDINH1.muiten.y1 - spaceShowNumPeak.y,
  };

  return (
    <Fragment>
      <div ref={canvasEl} className="col-6 rounded mb-2 px-2 ">
        <div class="triangle">
          <Stage
            width={w4Top}
            height={h4Top}
            className="d-flex mx-3 my-3 justify-content-center "
          >
            <Layer>
              <Line
                points={[
                  TAMGIACNGOAI.x,
                  TAMGIACNGOAI.y,
                  TAMGIACNGOAI.x1,
                  TAMGIACNGOAI.y1,
                  TAMGIACNGOAI.x2,
                  TAMGIACNGOAI.y2,
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
                x={TAMGIACNGOAI.x2}
                y={TAMGIACNGOAI.y2}
                radius={radius}
                fill="white"
              />
              <Label x={TAMGIACNGOAI.x2 - 5} y={TAMGIACNGOAI.y2 - 8}>
                <Text
                  align="center"
                  verticalAlign="middle"
                  text="8"
                  fill="red"
                  fontSize="15"
                />
              </Label>

              {/*   DINH 4 + TUOI */}
              <Line
                points={[
                  TUOIDINH4.muiten.x,
                  TUOIDINH4.muiten.y,
                  TUOIDINH4.muiten.x1,
                  TUOIDINH4.muiten.y1,
                ]}
                lineJoin="round"
                stroke="blue"
                strokeWidth={2}
                dash={[10, 10]}
              />
              <Label x={TUOIDINH4.chisotuoi.x} y={TUOIDINH4.chisotuoi.y}>
                <Text
                  align="center"
                  verticalAlign="middle"
                  text="54 "
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
                  text="(2050)"
                  fill="blue"
                  fontSize={15}
                />
              </Label>

              {/* DINH 3
               **
               ***/}

              <Line
                points={[
                  TAMGIACDINH3.x,
                  TAMGIACDINH3.y,
                  TAMGIACDINH3.x1,
                  TAMGIACDINH3.y1,
                  TAMGIACDINH3.x2,
                  TAMGIACDINH3.y2,
                ]}
                closed
                lineCap="round"
                lineJoin="round"
                stroke="black"
                strokeWidth={3}
              />
              <Circle
                x={TAMGIACDINH3.x2}
                y={TAMGIACDINH3.y2}
                radius={radius + 5}
                fill="white"
              />
              <Label x={TAMGIACDINH3.x2 - 5} y={TAMGIACDINH3.y2 - 8}>
                <Text
                  align="center"
                  verticalAlign="middle"
                  text="8"
                  fill="red"
                  fontSize="15"
                />
              </Label>
              {/*   DINH 3 + TUOI */}
              <Line
                points={[
                  TUOIDINH3.muiten.x,
                  TUOIDINH3.muiten.y,
                  TUOIDINH3.muiten.x1,
                  TUOIDINH3.muiten.y1,
                ]}
                lineJoin="round"
                stroke="blue"
                strokeWidth={2}
                dash={[10, 10]}
              />
              <Label x={TUOIDINH3.chisotuoi.x} y={TUOIDINH3.chisotuoi.y}>
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

              {/* DINH 2
               **
               ***/}

              <Line
                points={[
                  TAMGIACDINH2.x,
                  TAMGIACDINH2.y,
                  TAMGIACDINH2.x1,
                  TAMGIACDINH2.y1,
                  TAMGIACDINH2.x2,
                  TAMGIACDINH2.y2,
                ]}
                closed
                lineCap="round"
                lineJoin="round"
                stroke="black"
                strokeWidth={3}
              />
              <Circle
                x={TAMGIACDINH2.x2}
                y={TAMGIACDINH2.y2}
                radius={radius}
                fill="white"
              />
              <Label x={TAMGIACDINH2.x2 - 5} y={TAMGIACDINH2.y2 - 8}>
                <Text
                  align="center"
                  verticalAlign="middle"
                  text="8"
                  fill="red"
                  fontSize="15"
                />
              </Label>

              {/*   DINH 2 + TUOI */}
              <Line
                points={[
                  TUOIDINH2.muiten.x,
                  TUOIDINH2.muiten.y,
                  TUOIDINH2.muiten.x1,
                  TUOIDINH2.muiten.y1,
                ]}
                lineJoin="round"
                stroke="blue"
                strokeWidth={2}
                dash={[10, 10]}
              />
              <Label x={TUOIDINH2.chisotuoi.x} y={TUOIDINH2.chisotuoi.y}>
                <Text
                  align="center"
                  verticalAlign="middle"
                  text="36 "
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
                  text="(2032)"
                  fill="blue"
                  fontSize={15}
                />
              </Label>

              {/* DINH 1
               ***
               ****/}

              <Line
                points={[
                  TAMGIACDINH1.x,
                  TAMGIACDINH1.y,
                  TAMGIACDINH1.x1,
                  TAMGIACDINH1.y1,
                  TAMGIACDINH1.x2,
                  TAMGIACDINH1.y2,
                ]}
                closed
                lineCap="round"
                lineJoin="round"
                stroke="black"
                strokeWidth={3}
              />
              <Circle
                x={TAMGIACDINH1.x2}
                y={TAMGIACDINH1.y2}
                radius={radius}
                fill="white"
              />
              <Label x={TAMGIACDINH1.x2 - 5} y={TAMGIACDINH1.y2 - 8}>
                <Text
                  align="center"
                  verticalAlign="middle"
                  text="8"
                  fill="red"
                  fontSize="15"
                />
              </Label>

              {/*    DINH 1 + TUOI  */}

              <Line
                points={[
                  TUOIDINH1.muiten.x,
                  TUOIDINH1.muiten.y,
                  TUOIDINH1.muiten.x1,
                  TUOIDINH1.muiten.y1,
                ]}
                lineJoin="round"
                stroke="blue"
                strokeWidth={2}
                dash={[10, 10]}
              />
              <Label x={TUOIDINH1.chisotuoi.x} y={TUOIDINH1.chisotuoi.y}>
                <Text
                  align="center"
                  verticalAlign="middle"
                  text="27 "
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
                  text="(2023)"
                  fill="blue"
                  fontSize={15}
                />
              </Label>

              {/**
             CÁC ĐIỂM DƯỚI ĐÁY ĐỂ TÍNH CÁC ĐỈNH
              ***
             */}

              {/* DIEM 1 */}
              <Circle
                x={TAMGIACNGOAI.x + 50}
                y={TAMGIACNGOAI.y}
                radius={radius}
                fill="white"
              />
              <Label x={TAMGIACNGOAI.x + 45} y={TAMGIACNGOAI.y - 8}>
                <Text
                  align="center"
                  verticalAlign="middle"
                  text="1"
                  fill={gray_color}
                  fontSize="15"
                />
              </Label>

              {/* DIEM 2 */}
              <Circle
                x={TAMGIACNGOAI.x + 149}
                y={TAMGIACNGOAI.y}
                radius={radius}
                fill="white"
              />
              <Label x={TAMGIACNGOAI.x + 144} y={TAMGIACNGOAI.y - 8}>
                <Text
                  align="center"
                  verticalAlign="middle"
                  text="9"
                  fill={gray_color}
                  fontSize="15"
                />
              </Label>

              {/* DIEM 3 */}
              <Circle
                x={TAMGIACNGOAI.x + 250}
                y={TAMGIACNGOAI.y}
                radius={radius}
                fill="white"
              />
              <Label x={TAMGIACNGOAI.x + 245} y={TAMGIACNGOAI.y - 8}>
                <Text
                  align="center"
                  verticalAlign="middle"
                  text="7"
                  fill={gray_color}
                  fontSize="15"
                />
              </Label>
            </Layer>
          </Stage>

          <button className={`custom-btn ${btn.class_name}`}>
            <span>👉</span> {btn.noi_dung}
          </button>
        </div>

        <div class="container mt-3"></div>
      </div>
    </Fragment>
  );
}

export default LifePeak;
