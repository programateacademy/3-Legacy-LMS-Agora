import "./chart.css";

const Chart = ({ color, number }) => {
  return (
    <>
      <div className="donut-chart">
        <svg viewBox="0 0 32 32">
          <circle
            className="circle"
            r="16"
            cx="16"
            cy="16"
            style={{ strokeDasharray: `${number} 100`, stroke: color }}
          />
        </svg>
        <div className="donut-center">
          <p className="centerNumber">{number}%</p>
        </div>
      </div>
    </>
  );
};

export default Chart;
