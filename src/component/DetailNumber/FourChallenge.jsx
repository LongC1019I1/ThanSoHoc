import { useSelector } from "react-redux";
import { TOP_CHALLENGE } from "../../Data/numerology";
import PhaseGroup from "./SubComponent/PhaseGroup";
import { INDEX_INTROS } from "./indexIntros";

const STAGE_TITLES = [
  "Thử thách đầu tiên",
  "Thử thách thứ hai",
  "Thử thách thứ ba",
  "Thử thách thứ tư",
];

function FourChallenge({ topFour }) {
  const birth_day_list = useSelector(
    (state) => state.numberKarmaMain.birth_day_list
  );

  return (
    <PhaseGroup
      id="four_challenge"
      kind="challenge"
      title="Các thử thách cuộc đời"
      subtitle={`Theo ngày sinh ${birth_day_list}`}
      intro={INDEX_INTROS.four_challenge}
      topFour={topFour}
      content={TOP_CHALLENGE}
      stageTitles={STAGE_TITLES}
    />
  );
}

export default FourChallenge;
