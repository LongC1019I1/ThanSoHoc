import React, { Fragment } from "react";

import { Form, Input, DatePicker } from "antd";

function FormInfor() {
  return (
    <div class="w-25 mx-auto pt-3" id="FormInfor">
      <Form layout="vertical">
        <Form.Item class="mx-auto w-50" label="Họ Và Tên">
          <Input
            class="form-control border-success"
            placeholder="Nhập Họ Tên "
          />
        </Form.Item>

        <Form.Item class="mx-auto w-50" label="Ngày Sinh (Trên CMT)  ">
          <DatePicker
            format="DD/MM/YYYY"
            placeholder="DD/MM/YYYY"
            class="w-100"
            style={{
              width: "100%",
            }}
          />
        </Form.Item>
      </Form>
    </div>
  );
}

export default FormInfor;
