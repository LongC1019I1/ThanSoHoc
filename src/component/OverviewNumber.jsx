import React, { Fragment } from "react";

import { useState } from "react";
import { href } from "react-router-dom";

function OverviewNumber() {
  const numbers = [
    {
      label: "Số Chủ Đạo",
      value: "9",
      color: " text-white",
      style: "#3cbc9b",
    },
    {
      label: "Số Tên Riêng",
      value: "21/3",
      color: " text-white",
      style: "#53cd73",
    },
    {
      label: "Số Đường Đời",
      value: "27/9",
      color: " text-white",
      style: "#3498da",
    },
    {
      label: "Số Định Mệnh",
      value: "59/14/5",
      color: " text-white",
      style: "#9c5fb6",
    },
    {
      label: "Số Thái Độ",
      value: "2",
      color: "text-white",
      style: "#e74d3c",
    },
    {
      label: "Trưởng Thành",
      value: "5",
      color: " text-white",
      style: "#2a80b9",
    },
    {
      label: "Số Ngày Sinh",
      value: "10",
      color: " text-white",
      style: "#46ae5f",
    },
  ];

  const numbers2 = [
    {
      label: "Số Linh Hồn",
      value: "8",
      color: " text-white",
      style: "#31a086",
    },
    {
      label: "Số Biểu Đạt",
      value: "51/6",
      color: " text-white",
      style: "#2a80b9",
    },
    {
      label: "Số Nội Cảm",
      value: "8",
      color: " text-white",
      style: "#3cbc9b",
    },
    {
      label: "Số Thiếu",
      value: "49",
      color: " text-white",
      style: "#53cd73",
    },
    {
      label: "Số Năm 2025",
      value: "2",
      color: "text-white",
      style: "#e74d3c",
    },

    {
      label: "Tháng 3/2025",
      value: "5",
      color: " text-white",
      style: "#e57e29",
    },
    {
      label: "Tháng 4/2025",
      value: "6",
      color: " text-white",
      style: "#f39d2f",
    },
  ];

  const [hoverIndex, setHoverIndex] = useState(null);

  return (
    <div className="w-75  mx-auto  p-3 border border-dark-subtle rounded mt-4 ">
      <div className="text-center mt-4 mb-4">
        <h2>
          Bạn{" "}
          <span style={{ fontWeight: "bold", color: "blue" }}>
            BACH THANH LONG
          </span>
          , ngày sinh{" "}
          <span style={{ fontWeight: "bold", color: "blue" }}>10/10/1996</span>
        </h2>
        <button className="btn btn-danger mt-3">Xem Lại</button>
      </div>
      <div className="row g-3 mb-4 ">
        {numbers.map((item, index) => (
          <div key={index} className="col">
            <div
              className="text-center card-container"
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              <p className="text-muted">{item.label}</p>
              <a href="#">
                <div
                  className={`fw-bold py-2 px-3 rounded-3 shadow-md transition ${
                    item.color
                  } ${hoverIndex === index ? "scale-up" : ""}`}
                  style={{ backgroundColor: item.style }}
                >
                  {item.value}
                </div>
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-3 mb-4">
        {numbers2.map((item, index) => (
          <div key={item.label} className="col">
            <a href="#">
              <div
                className="text-center card-container"
                onMouseEnter={() => setHoverIndex(item.label)}
                onMouseLeave={() => setHoverIndex(null)}
              >
                <p className="text-muted">{item.label}</p>
                <div
                  className={`fw-bold py-2 px-3 rounded-3  shadow-md transition ${
                    item.color
                  } ${hoverIndex === item.label ? "scale-up" : ""}`}
                  style={{ backgroundColor: item.style }}
                >
                  {item.value}
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OverviewNumber;
