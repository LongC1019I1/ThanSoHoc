import React, { Fragment, useEffect } from "react";

import { useState } from "react";
import { useSelector } from "react-redux";
import classes from "./OverviewNumber.module.css";
import { motion, AnimatePresence } from "framer-motion";
function OverviewNumber() {
  const numberKarma = useSelector((state) => state.numberKarmaMain.number);
  const numbeAtitute = useSelector((state) => state.numberKarmaMain.atitute);
  const numberDestiny = useSelector((state) => state.numberName.destiny);
  const numberName = useSelector((state) => state.numberName.name);
  const numberExpress = useSelector((state) => state.numberName.express);
  const numberInner = useSelector((state) => state.numberName.inner);
  const numberSoul = useSelector((state) => state.numberName.soul);
  const numberMature = useSelector((state) => state.numberName.mature);
  const numberDayBirth = useSelector(
    (state) => state.numberKarmaMain.day_birth
  );

  useEffect(() => {}, [
    numberKarma,
    numbeAtitute,
    numberDestiny,
    numberName,
    numberExpress,
    numberSoul,
    numberInner,
    numberMature,
    numberDayBirth,
  ]);

  let numbers = [
    [
      {
        label: "Số Chủ Đạo",
        value: numberKarma,
        color: " text-white",
        style: "#3cbc9b",
      },
      {
        label: "Số Tên Riêng",
        value: numberName,
        color: " text-white",
        style: "#53cd73",
      },
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
      {
        label: "Số Thái Độ",
        value: numbeAtitute,
        color: "text-white",
        style: "#e74d3c",
      },
      {
        label: "Trưởng Thành",
        value: numberMature,
        color: " text-white",
        style: "#2a80b9",
      },
      {
        label: "Số Ngày Sinh",
        value: numberDayBirth,
        color: " text-white",
        style: "#46ae5f",
      },
      {
        label: "Số Linh Hồn",
        value: numberSoul,
        color: " text-white",
        style: "#31a086",
      },
      {
        label: "Số Biểu Đạt",
        value: numberExpress,
        color: " text-white",
        style: "#2a80b9",
      },
      {
        label: "Số Nội Cảm",
        value: numberInner ? numberInner : "Không có",
        color: " text-white",
        style: "#3cbc9b",
      },
      // {
      //   label: "Số Thiếu",
      //   value: "4 9",
      //   color: " text-white",
      //   style: "#53cd73",
      // },
      // {
      //   label: "Số Năm 2025",
      //   value: "2",
      //   color: "text-white",
      //   style: "#e74d3c",
      // },
      // {
      //   label: "Tháng 3/2025",
      //   value: "5",
      //   color: " text-white",
      //   style: "#e57e29",
      // },
      // {
      //   label: "Tháng 4/2025",
      //   value: "6",
      //   color: " text-white",
      //   style: "#f39d2f",
      // },
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
      <div className="m-3  p-3    border border-dark-subtle rounded  ">
        {numbers.map((numberRow, rowIndex) => (
          <div className="row  mb-4 row  d-flex border rounded p-3 m-3 d-flex justify-content-center  ">
            {numberRow.map((item, index) => (
              <div key={`${rowIndex}-${index}`} className="col-2">
                <div
                  className="text-center card-container"
                  onMouseEnter={() => setHoverIndex(`${rowIndex}-${index}`)}
                >
                  <span className={classes.title_number}>{item.label}</span>
                  <a href="#">
                    <motion.div
                      key={item.value} // Chỉ chữ số thay đổi mới render lại
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1, transition: { duration: 0.5 } }}
                      className={`fw-bold py-2 px-3 rounded-3 transition mb-3 ${
                        item.color
                      } ${
                        hoverIndex === `${rowIndex}-${index}` ? "scale-up" : ""
                      } ${classes.box_shadow}`}
                      style={{ backgroundColor: item.style }}
                    >
                      {item.value}
                    </motion.div>
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
