import React from "react";
import FormInfor from "../component/FormInfor";
import OverviewNumber from "../component/OverviewNumber";
import DetailNumber from "../component/DetailNumber";
const Numerlogy = () => {
  return (
    <div class="container w-100">
      <h2 class="text-center h2 pb-3">BÁO CÁO THẦN SỐ HỌC </h2>
      <div id="root_content">
        <FormInfor />
        <OverviewNumber />
        <DetailNumber />
      </div>
    </div>
  );
};

export default Numerlogy;
