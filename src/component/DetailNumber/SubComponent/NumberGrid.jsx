const byValue = (a, b) => a - b;

function NumberGrid({ layout, columns, amountNumber, showMissing = false }) {
  const present = layout.filter((number) => amountNumber[number]).sort(byValue);
  const missing = layout.filter((number) => !amountNumber[number]).sort(byValue);

  return (
    <>
      <div
        className="number-grid"
        style={{ "--grid-columns": columns }}
        aria-hidden="true"
      >
        {layout.map((number) => {
          const count = amountNumber[number];
          return (
            <div
              key={number}
              className={`number-cell ${count ? "is-present" : "is-empty"}`}
            >
              <span className="cell-number">{number}</span>
              {count ? <span className="cell-count">×{count}</span> : null}
            </div>
          );
        })}
      </div>
      <p className="chart-summary">
        <strong>Có mặt:</strong>{" "}
        {present.length
          ? present.map((number) => `${number} (${amountNumber[number]} lần)`).join(", ")
          : "không có số nào"}
        {showMissing && (
          <>
            <br />
            <strong>Không có:</strong>{" "}
            {missing.length ? missing.join(", ") : "đủ các số"}
          </>
        )}
      </p>
    </>
  );
}

export default NumberGrid;
