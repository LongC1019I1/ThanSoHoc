import parse from "html-react-parser";
import LifePeak from "../LifePeak";
import NumberArticle, { MissingContent } from "./NumberArticle";

const PHASE_KEYS = ["top01", "top02", "top03", "top04"];

function PhaseGroup({ id, kind, title, subtitle, intro, topFour, content, stageTitles }) {
  return (
    <NumberArticle
      id={id}
      title={title}
      subtitle={subtitle}
      intro={intro}
      hasContent={Boolean(topFour)}
    >
      <LifePeak topFour={topFour} kind={kind} />
      <ol className="phase-cards">
        {PHASE_KEYS.map((key, index) => {
          const phase = topFour?.[key];
          if (!phase) return null;
          const text = content[phase.num]?.noidung;

          return (
            <li key={key} className="phase-card">
              <div className="phase-head">
                <span className="phase-index" aria-hidden="true">
                  {index + 1}
                </span>
                <div>
                  <h4>{stageTitles[index]}</h4>
                  <p className="phase-time">
                    {phase.age} tuổi · năm {phase.year}
                  </p>
                </div>
                <span className="phase-number">
                  <span className="sr-only">Con số </span>
                  {phase.num}
                </span>
              </div>
              <div className="prose">{text ? parse(text) : <MissingContent />}</div>
            </li>
          );
        })}
      </ol>
    </NumberArticle>
  );
}

export default PhaseGroup;
