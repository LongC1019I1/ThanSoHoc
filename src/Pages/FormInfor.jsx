import React, { Fragment, useState } from "react";

import { Form, Input, DatePicker, Button } from "antd";
import { motion } from "framer-motion";
import {
  mergeNumberString,
  removeVietnameseTones,
  stringToNumber,
  soulAndExpress,
  numberAtLeastThreeTimes,
  checkArrow,
  lackArrow,
  fourTop,
} from "../service/numerlogy";
import { numberKarmaActions } from "../store/numberKarma";
import { numberNameActions } from "../store/numberName";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
function FormInfor() {
  const [refreshKey, setRefreshKey] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = (values) => {
    const spaceRegex = /\s+/g;

 

    // main number

    const { $D: day, $M, $y: year } = values.date;
    const month = $M + 1;

    const birthString = day + "" + month + year;

    const main = mergeNumberString(birthString);
    dispatch(numberKarmaActions.setKamarNumeroMain(main));
    /** 
     @setBirthDayNumber để cho vào bảng số tên
     */
    dispatch(numberKarmaActions.setBirthDayNumber(birthString));

    /** 
     @setBirthDayNumber để cho vào bảng số tên
     */
    const top4 = fourTop(day, month, year);
    dispatch(numberKarmaActions.setTop4Peak(top4));

    /**
     * @kiemtra_muitendaydu_muitentrong
     */

    dispatch(numberKarmaActions.setArrow(checkArrow(birthString)));
    dispatch(numberKarmaActions.setLackArrow(lackArrow(birthString)));

    // atitute number  "" +
    const atitute = mergeNumberString(
      values.date.$D - 0 + (values.date.$M + 1) + "",
      true
    );

    dispatch(numberKarmaActions.setKamarNumeroAtitute(atitute));

    // day birth number  "" +
    const day_birth = mergeNumberString(values.date.$D + "");

    dispatch(numberKarmaActions.setKamarNumeroDayBirth(day_birth));

    // destiny number

    const full_name = removeVietnameseTones(values.name.trim()).toUpperCase();

    const full_name_number = stringToNumber(full_name);
    const detinyNumber = mergeNumberString(full_name_number);

    dispatch(numberNameActions.setNumberDestiny(detinyNumber));
    dispatch(numberNameActions.setFullNameNumber(full_name_number));

    // name number

    const full_name_split = full_name.split(" ");

    const name = full_name_split[full_name_split.length - 1];
    const nameNumber = mergeNumberString(stringToNumber(name), true);

    dispatch(numberNameActions.setNumberName(nameNumber));

    // express soul number

    const prename = full_name_split.slice(0, -1).join("");

    const { soul, express } = soulAndExpress([
      ...prename.split(spaceRegex),
      ...name.split(spaceRegex),
    ]);

    dispatch(numberNameActions.setNumberSoul(soul));
    dispatch(numberNameActions.setNumberExpress(express));

    // inner number

    const list_number_name = stringToNumber(full_name).split("");

    const inner_number = numberAtLeastThreeTimes(list_number_name);

    dispatch(
      numberNameActions.setNumberInner(inner_number ? inner_number : "")
    );

    // grow number
    const mature = mergeNumberString(main - 0 + (detinyNumber - 0) + "", true);
    dispatch(numberNameActions.setNumberMature(mature));

    navigate("/detail-number");
  };

  return (
    <motion.div

      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 2 } }}
    >
      <Fragment>
        <h2 className="text-center h2 pb-3">BÁO CÁO THẦN SỐ HỌC</h2>
        <div class="w-25 mx-auto pt-3" id="FormInfor">
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item class="mx-auto w-50" label="Họ Và Tên" name="name">
              <Input
                class="form-control border-success"
                placeholder="Nhập Họ Tên "
                required
              />
            </Form.Item>

            <Form.Item
              class="mx-auto w-50"
              label="Ngày Sinh (Trên CMT)  "
              name="date"
            >
              <DatePicker
                name="prename"
                format="DD/MM/YYYY"
                placeholder="DD/MM/YYYY"
                class="w-100"
                style={{
                  width: "100%",
                }}
                required
              />
            </Form.Item>
            <div class="d-flex justify-content-center">
              <Button
                className="w-100"
                type="primary"
                htmlType="submit"
                size="medium"
              >
                Tra cứu
              </Button>
            </div>
          </Form>
        </div>
      </Fragment>
    </motion.div>
  );
}

export default FormInfor;
