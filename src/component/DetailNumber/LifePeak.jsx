const PEAK_POSITIONS = [
  [170, 205],
  [330, 205],
  [250, 125],
  [250, 40],
];
const BASE_LABELS = ["Tháng", "Ngày", "Năm"];

function LifePeak({ topFour, kind = "peak" }) {
  const phases = ["top01", "top02", "top03", "top04"].map((key) => topFour?.[key]);
  const base = [
    topFour?.numberbase?.num1,
    topFour?.numberbase?.num2,
    topFour?.numberbase?.num3,
  ];
  const stage = kind === "peak" ? "Đỉnh" : "Thử thách";
  const title = kind === "peak" ? "Sơ đồ bốn đỉnh cao" : "Sơ đồ bốn thử thách";
  const description =
    `${title}. ` +
    phases.map((phase, index) => `${stage} ${index + 1}: số ${phase?.num}`).join("; ") +
    `. Hàng đáy sau khi rút gọn: tháng ${base[0]}, ngày ${base[1]}, năm ${base[2]}.`;

  return (
    <svg
      className={`peak-diagram is-${kind}`}
      viewBox="0 0 500 345"
      role="img"
      aria-label={description}
    >
      <g className="peak-lines" fill="none" strokeWidth="2" strokeLinejoin="round">
        <path d="M50 285 L250 40 L450 285 Z" />
        <path d="M90 285 L170 205 L250 285 L330 205 L410 285" />
        <path d="M170 205 L250 125 L330 205 Z" />
      </g>
      {phases.map(
        (phase, index) =>
          phase && (
            <g
              key={index}
              transform={`translate(${PEAK_POSITIONS[index][0]} ${PEAK_POSITIONS[index][1]})`}
            >
              <circle r="26" className="peak-node" />
              <text className="peak-num" textAnchor="middle" dy="8">
                {phase.num}
              </text>
              <text className="peak-index" x="30" y="-18" textAnchor="start">
                {index + 1}
              </text>
            </g>
          )
      )}
      {base.map((number, index) => (
        <g key={index} transform={`translate(${90 + index * 160} 285)`}>
          <circle r="20" className="base-node" />
          <text className="base-num" textAnchor="middle" dy="6">
            {number}
          </text>
          <text className="base-label" textAnchor="middle" y="44">
            {BASE_LABELS[index]}
          </text>
        </g>
      ))}
    </svg>
  );
}

export default LifePeak;
