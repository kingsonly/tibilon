import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import LineGraph from "../components/LineGraph";
import { Chart as ChartJS } from "chart.js";

jest.mock("chart.js");

let labels = [
  "Jan",
  "Feb",
  "Mar",
  "April",
  "May",
  "Jun",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
const line1 = [1, 2, 3, 5, 7, 2, 9, 3, 9, 7, 8, 2];
const line2 = [6, 9, 2, 7, 9, 4, 7, 8, 4, 3, 1, 2];

describe("Tab", () => {
  it("Ensure Line Chart and Title is rendered alongside data.", async () => {
    render(
      <LineGraph
        graphName={"Percentage increase (%)"}
        labels={labels}
        line1={line1}
        line2={line2}
        line1LabelKey={"Tibilion Sales Team"}
        line2LabelKey={"Sales Affiliates"}
        line1Color="red"
        line2Color={"green"}
        xAxisTitle={"Year"}
        yAxisTitle={"Percentage"}
      />
    );

    expect(screen.getByRole("graph-name")).toHaveTextContent(
      "Percentage increase (%"
    );

    expect(screen.getByRole("line-chart")).toBeInTheDocument();
  });

  it("Assert chart instance creation, and ensure data is rendered.", async () => {
    // Mock the Chart component
    ChartJS.mockImplementation(() => {
      return {
        update: jest.fn(),
        destroy: jest.fn(),
      };
    });

    render(
      <LineGraph
        graphName={"Percentage increase (%)"}
        labels={labels}
        line1={line1}
        line2={line2}
        line1LabelKey={"Tibilion Sales Team"}
        line2LabelKey={"Sales Affiliates"}
        line1Color="red"
        line2Color={"green"}
        xAxisTitle={"Year"}
        yAxisTitle={"Percentage"}
      />
    );

    // Assert on the chart instance creation
    expect(ChartJS).toHaveBeenCalledTimes(1);
    expect(ChartJS.mock.lastCall[1].type).toBe("line");
    expect(ChartJS.mock.lastCall[1].data.datasets[0].data).toEqual(line1);
    expect(ChartJS.mock.lastCall[1].data.datasets[1].data).toEqual(line2);
    expect(ChartJS.mock.lastCall[0]).toEqual(expect.any(HTMLCanvasElement));
  });
});
