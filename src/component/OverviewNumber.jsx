import React, { Fragment, useEffect } from "react";

import { useState } from "react";
import classes from "./OverviewNumber.module.css";
import { useSelector } from "react-redux";

function OverviewNumber() {
  const numberKarma = useSelector((state) => state.numberKarmaMain.number);
  const numberDestiny = useSelector((state) => state.numberName.destiny);

  useEffect(() => {}, [numberKarma, numberDestiny]);

  let numbers = [
    [
      {
        label: "Số Chủ Đạo",
        value: numberKarma,
        color: " text-white",
        style: "#3cbc9b",
      },
      // {
      //   label: "Số Tên Riêng",
      //   value: "21/3",
      //   color: " text-white",
      //   style: "#53cd73",
      // },
      {
        label: "Số Đường Đời",
        value: numberKarma,
        color: " text-white",
        style: "#3498da",
      },
      {
        label: "Số Định Mệnh",
        value: numberDestiny,
        color: " text-white",
        style: "#9c5fb6",
      },
      //   {
      //     label: "Số Thái Độ",
      //     value: "2",
      //     color: "text-white",
      //     style: "#e74d3c",
      //   },
      //   {
      //     label: "Trưởng Thành",
      //     value: "5",
      //     color: " text-white",
      //     style: "#2a80b9",
      //   },
      //   {
      //     label: "Số Ngày Sinh",
      //     value: "10",
      //     color: " text-white",
      //     style: "#46ae5f",
      //   },
      // ],
      // [
      //   {
      //     label: "Số Linh Hồn",
      //     value: "8",
      //     color: " text-white",
      //     style: "#31a086",
      //   },
      //   {
      //     label: "Số Biểu Đạt",
      //     value: "51/6",
      //     color: " text-white",
      //     style: "#2a80b9",
      //   },
      //   {
      //     label: "Số Nội Cảm",
      //     value: "8",
      //     color: " text-white",
      //     style: "#3cbc9b",
      //   },
      //   {
      //     label: "Số Thiếu",
      //     value: "4 9",
      //     color: " text-white",
      //     style: "#53cd73",
      //   },
      //   {
      //     label: "Số Năm 2025",
      //     value: "2",
      //     color: "text-white",
      //     style: "#e74d3c",
      //   },
      //   {
      //     label: "Tháng 3/2025",
      //     value: "5",
      //     color: " text-white",
      //     style: "#e57e29",
      //   },
      //   {
      //     label: "Tháng 4/2025",
      //     value: "6",
      //     color: " text-white",
      //     style: "#f39d2f",
      //   },
    ],
  ];

  const [hoverIndex, setHoverIndex] = useState(null);

  return (
    <Fragment>
      <div className="text-center mt-4 mb-4">
        <h2 className="mx-auto text-center">
          Bạn{" "}
          <span style={{ fontWeight: "bold", color: "blue" }}>
            BACH THANH LONG
          </span>
          , ngày sinh{" "}
          <span style={{ fontWeight: "bold", color: "blue" }}>10/10/1996</span>
        </h2>

        <button className="scale-up btn btn-danger mt-3 transition ">
          Xem Lại
        </button>
      </div>
      <div className="w-75  mx-auto  p-3 border border-dark-subtle rounded mt-4 ">
        {numbers.map((numberRow, rowIndex) => (
          <div className="row g-3 mb-4 ">
            {numberRow.map((item, index) => (
              <div key={`${rowIndex}-${index}`} className="col">
                <div
                  className="text-center card-container"
                  onMouseEnter={() => setHoverIndex(`${rowIndex}-${index}`)}
                >
                  <span className={classes.title_number}>{item.label}</span>
                  <a href="#">
                    <div
                      className={`fw-bold py-2 px-3 rounded-3 transition ${
                        item.color
                      } ${
                        hoverIndex === `${rowIndex}-${index}` ? "scale-up" : ""
                      }
                       ${classes.box_shadow}
                      `}
                      style={{ backgroundColor: item.style }}
                    >
                      {item.value}
                    </div>
                  </a>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </Fragment>
  );
}

export default OverviewNumber;
