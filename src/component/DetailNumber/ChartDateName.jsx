import { Tag } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { Stage, Layer, Rect, Text, Label } from "react-konva";
import DrawCellDateName from "./SubComponent/DrawCellDateName";
const ChartDateName = ({
  numbersData,
  color = "red",
  buttonText,
  buttonColor,
  id_link,
  disabled = false,
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
    const widthWindow = window.innerWidth;
    const handleResize = () => {
      widthWindow < 768 ? setWLeftPanel(width * 1.9) : setWLeftPanel(width);
    };

    handleResize(); // Gọi lần đầu khi mount
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const widthWindow = window.innerWidth ;
  let wMatrix = widthWindow < 768 ? wRightPanel * 0.4 : wRightPanel * 0.4;
  buttonText == "BIỂU ĐỒ  TỔNG HỢP" ? (wMatrix = wMatrix + 85) : "";
  const hMatrix = (wMatrix / 3) * 3;

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div class="col-sm-12 col-md-6 my-3" ref={canvasEl}>
      <div className=" d-flex justify-content-center ">
        {/* Vẽ biểu đồ bằng React Konva */}
        {wMatrix && (
          <DrawCellDateName
            wMatrix={wMatrix}
            hMatrix={hMatrix}
            amountNumber={amountNumber}
            color={color}
          />
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
          disabled={disabled}
        >
          👉 {buttonText}
        </button>
      </div>
    </div>
  );
};

export default ChartDateName;
