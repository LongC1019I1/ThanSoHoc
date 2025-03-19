import React, { Fragment, useState } from "react";

import { Form, Input, DatePicker, Button } from "antd";
import {
  mergeNumberString,
  removeVietnameseTones,
  stringToNumber,
  soulAndExpress,
  numberAtLeastThreeTimes,
} from "../service/numerlogy";
import { numberKarmaActions } from "../store/numberKarma";
import { numberNameActions } from "../store/numberName";
import { useDispatch } from "react-redux";
function FormInfor() {
  const dispatch = useDispatch();

  const onFinish = (values) => {
    const spaceRegex = /\s+/g;
    // main number
    const birthString =
      values.date.$D + "" + (values.date.$M + 1) + values.date.$y;
    const main = mergeNumberString(birthString);
    dispatch(numberKarmaActions.setKamarNumeroMain(main));

    // atitute number  "" +
    const atitute = mergeNumberString(
      values.date.$D - 0 + (values.date.$M + 1) + ""
    );

    dispatch(numberKarmaActions.setKamarNumeroAtitute(atitute));

    // day birth number  "" +
    const day_birth = mergeNumberString(values.date.$D + "");

    dispatch(numberKarmaActions.setKamarNumeroDayBirth(day_birth));

    // destiny number

    const full_name = removeVietnameseTones(values.name.trim()).toUpperCase();

    const detinyNumber = mergeNumberString(stringToNumber(full_name));

    dispatch(numberNameActions.setNumberDestiny(detinyNumber));

    // name number

    const full_name_split = full_name.split(" ");

    const name = full_name_split[full_name_split.length - 1];
    const nameNumber = mergeNumberString(stringToNumber(name));

    dispatch(numberNameActions.setNumberName(nameNumber));

    // express soul number

    const prename = full_name_split.slice(0, -1).join("");

    const { soul, express } = soulAndExpress([
      ...prename.split(spaceRegex),
      ...name.split(spaceRegex),
    ]);

    console.log({ soul });

    dispatch(numberNameActions.setNumberSoul(soul));
    dispatch(numberNameActions.setNumberExpress(express));

    // inner number

    const list_number_name = stringToNumber(full_name).split("");

    const inner_number = numberAtLeastThreeTimes(list_number_name);

    dispatch(numberNameActions.setNumberInner(inner_number));

    // grow number
    const mature = mergeNumberString(main - 0 + (detinyNumber - 0) + "");
    dispatch(numberNameActions.setNumberMature(mature));
  };

  return (
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
  );
}

export default FormInfor;
