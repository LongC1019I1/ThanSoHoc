import React from "react";
import FormInfor from "../component/FormInfor";
import OverviewNumber from "../component/OverviewNumber";
const Numerlogy = () => {
  return (
    <div class="container w-100">
      <h2 class="text-center h2 pb-3">BÁO CÁO THẦN SỐ HỌC </h2>
      <div id="root_content">
        <FormInfor />
        <OverviewNumber />
      </div>
    </div>
  );
};

export default Numerlogy;
