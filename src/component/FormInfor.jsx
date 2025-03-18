import React, { Fragment, useState } from "react";

import { Form, Input, DatePicker, Button } from "antd";
import {
  mergeNumberString,
  removeVietnameseTones,
  stringToNumber,
} from "../service/numerlogy";
import { numberKarmaActions } from "../store/numberKarma";
import { numberNameActions } from "../store/numberName";
import { useDispatch } from "react-redux";
function FormInfor() {
  const dispatch = useDispatch();

  const onFinish = (values) => {
    const name = removeVietnameseTones(values.name.trim()).split(" ").join("");
    console.log({ name });
    const nameNumber = stringToNumber(name);
    console.log({ nameNumber });
    const detinyNumber = mergeNumberString(nameNumber, true);
    console.log({ detinyNumber });
    dispatch(numberNameActions.setNumberDestiny(detinyNumber));

    const birthString =
      values.date.$D + "" + (values.date.$M + 1) + values.date.$y;

    const main = mergeNumberString(birthString);
    dispatch(numberKarmaActions.setKamarNumeroMain(main));
  };

  return (
    <div class="w-25 mx-auto pt-3" id="FormInfor">
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item class="mx-auto w-50" label="Họ Và Tên" name="name">
          <Input
            class="form-control border-success"
            placeholder="Nhập Họ Tên "
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
  );
}

export default FormInfor;
