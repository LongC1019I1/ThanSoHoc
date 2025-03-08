import { Fragment } from "react";
import MainNumber from "./DetailNumber/MainNumber";
import NameNumber from "./DetailNumber/NameNumber";
import AtituteNumber from "./DetailNumber/AtituteNumber";
import MatureNumber from "./DetailNumber/MatureNumber";
import DestinyNumber from "./DetailNumber/DestinyNumber";
import BirthNumber from "./DetailNumber/BirthNumber";
import SoulNumber from "./DetailNumber/SoulNumber";
import ExpressNumber from "./DetailNumber/ExpressNumber";
import InnerNumber from "./DetailNumber/InnerNumber";
function DetailNumber() {
  return (
    <Fragment>
      <div id="detail_number">
        <MainNumber />
        <NameNumber />
        <DestinyNumber />
        <AtituteNumber />
        <MatureNumber />
        <BirthNumber />
        <SoulNumber />
        <ExpressNumber />
        <InnerNumber />
      </div>
    </Fragment>
  );
}

export default DetailNumber;
