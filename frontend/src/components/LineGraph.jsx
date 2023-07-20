import React from "react";
import { Chart } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
ChartJS.register(...registerables);

export default function LineGraph({
  graphName,
  labels,
  line1,
  line2,
  xAxisTitle,
  yAxisTitle,
  line1LabelKey,
  line2LabelKey,
  line1Color,
  line2Color,
}) {
  const Linedata = {
    labels: labels.map((label) => label),
    datasets: [
      {
        label: line1LabelKey,
        backgroundColor: ["white"],
        borderColor: line1Color,
        borderWidth: 2,
        hoverBackgroundColor: line1Color,
        hoverBorderColor: line1Color,
        data: line1 && line1.map((label) => label),
      },
      {
        label: line2LabelKey,
        backgroundColor: ["white"],
        lineColor: line2Color,
        borderColor: line2Color,
        borderWidth: 2,
        hoverBackgroundColor: line2Color,
        hoverBorderColor: line2Color,
        data: line2 && line2.map((label) => label),
      },
    ],
  };

  return (
    <div>
      <div className="w-[100%] text-left mb-5">
        <span role="graph-name" className="text-left">
          {graphName}
        </span>
      </div>

      <Chart
        role="line-chart"
        data={Linedata}
        type="line"
        options={{
          plugins: {
            legend: {
              display: true,
              labels: {
                color: "black",
                borderWidth: 40,
                usePointStyle: true,
                borderRadius: 300,
                pointStyle: "circle",
              },
            },
          },
          maintainAspectRatio: true,
          scales: {
            y: {
              // ticks: {
              //   callback: function (value) {
              //     return "$" + formatNumber(value);
              //   }
              // },
              title: {
                display: true,
                text: yAxisTitle,
                font: {
                  size: 13,
                },
              },
            },
            x: {
              title: {
                display: true,
                text: xAxisTitle,
                font: {
                  size: 13,
                },
              },
            },
          },
        }}
      />
    </div>
  );
}
