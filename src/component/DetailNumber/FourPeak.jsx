import { useSelector } from "react-redux";
import { TOP_PEAK } from "../../Data/numerology";
import PhaseGroup from "./SubComponent/PhaseGroup";
import { INDEX_INTROS } from "./indexIntros";

const STAGE_TITLES = ["Đỉnh đầu tiên", "Đỉnh thứ hai", "Đỉnh thứ ba", "Đỉnh thứ tư"];

function FourPeak({ topFour }) {
  const birth_day_list = useSelector(
    (state) => state.numberKarmaMain.birth_day_list
  );

  return (
    <PhaseGroup
      id="four_peak"
      kind="peak"
      title="Các đỉnh cuộc đời"
      subtitle={`Theo ngày sinh ${birth_day_list}`}
      intro={INDEX_INTROS.four_peak}
      topFour={topFour}
      content={TOP_PEAK}
      stageTitles={STAGE_TITLES}
    />
  );
}

export default FourPeak;
