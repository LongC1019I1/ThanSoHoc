import NumberGrid from "./SubComponent/NumberGrid";

// Cùng vị trí ô với biểu đồ Konva cũ: hàng trên 3-6-9, giữa 2-5-8, dưới 1-4-7.
const LAYOUT = [3, 6, 9, 2, 5, 8, 1, 4, 7];

const ChartDateName = ({ numbersData, title, description }) => {
  const amountNumber = {};
  for (const chr of String(numbersData ?? "").replaceAll("0", "")) {
    amountNumber[chr] = (amountNumber[chr] || 0) + 1;
  }

  return (
    <figure className="chart-card">
      <figcaption className="chart-caption">
        <h3>{title}</h3>
        {description && <p>{description}</p>}
      </figcaption>
      <NumberGrid layout={LAYOUT} columns={3} amountNumber={amountNumber} showMissing />
    </figure>
  );
};

export default ChartDateName;
