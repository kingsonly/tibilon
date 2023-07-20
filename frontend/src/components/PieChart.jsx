import React from "react";
import { Chart } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import { SlCalender } from "react-icons/sl";
import { v4 as uuidv4 } from "uuid";
ChartJS.register(...registerables);

export default function PieChart({
  graphName,
  data,
  line1LabelKey,
  pieCenterText,
  pieCenterValue,
  tableHeader,
}) {
  const Linedata = {
    labels: data.map((label) => label.label),
    datasets: [
      {
        label: line1LabelKey,
        backgroundColor: data.map((label) => label.sectionColor),
        borderColor: data.map((label) => label.sectionColor),
        borderWidth: 2,
        hoverBackgroundColor: data.map((label) => label.sectionColor),
        hoverBorderColor: data.map((label) => label.sectionColor),
        data: data && data.map((label) => label.value),
      },
    ],
  };

  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);

  const textCenter = {
    id: "Id Chart",
    beforeDraw: function (chart) {
      let ctx = chart.ctx;
      ctx.save();
      ctx.font = "15px Roboto";
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.fillText(
        `${pieCenterText}`,
        chart.getDatasetMeta(0).data[0].x,
        chart.getDatasetMeta(0).data[0].y - 20
      );
      ctx.fillText(
        `${pieCenterValue}`,
        chart.getDatasetMeta(0).data[0].x,
        chart.getDatasetMeta(0).data[0].y
      );
    },
  };

  return (
    <div>
      <div className="w-[100%] text-left mb-5 flex items-center">
        <div className="w-[50%]">
          <span role="graph-name" className="text-left">
            {graphName}
          </span>
        </div>
        <div className="flex w-[50%] justify-between px-10">
          <div className="flex items-center gap-5">
            <span role="graph-key" className="text-left">
              Today
            </span>
            <SlCalender className="text-[#8A8A8A]" />
          </div>
          <div>
            <span role="graph-date" className="text-left">
              {today.toDateString()}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center">
        <div className="w-[40%]">
          <table className="w-[180px] text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 border-b-2 border-black dark:text-black-400">
              <tr>
                {tableHeader?.map((header) => (
                  <th key={uuidv4()} scope="col" className="px-6 py-3">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.length !== 0 &&
                data.map((datum) => (
                  <tr key={uuidv4()} className="bg-white">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex border-r-2 border-black"
                    >
                      <div
                        className={`bg-[${datum.sectionColor}] w-[20px] h-[20px] rounded-full mr-2`}
                        style={{ background: `${datum.sectionColor}` }}
                      ></div>
                      {datum.label}
                    </th>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {datum.value}
                    </th>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="left-1/2 -ml-0.5 w-8 h-[250px] bg-[#F6F8FA] ml-10 mr-10"></div>

        <div className="w-[40%]">
          <Chart
            role="pie-chart"
            data={Linedata}
            type="doughnut"
            plugins={[textCenter]}
            options={{
              plugins: {
                legend: {
                  display: false,
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
                  display: false,
                  title: {
                    display: false,
                  },
                },
                x: {
                  display: false,
                  title: {
                    display: true,
                  },
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
