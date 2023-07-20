import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import LineGraph from "../components/LineGraph";
import { Chart as ChartJS } from "chart.js";
import PieChart from "../components/PieChart";

jest.mock("chart.js");

const pieChartData1 = [
  { value: 1, sectionColor: "red", label: "Katampe Main Phase 1&2" },
  { value: 3, sectionColor: "#636363", label: "Guzape Phase 2" },
  { value: 4, sectionColor: "#40A74E", label: "Mabushi" },
  { value: 9, sectionColor: "#D7B569", label: "Garki" },
];

const tableHeader = ["Property/Location", "Available"];

describe("Tab", () => {
  it("Ensure Line Chart and Title is rendered alongside data.", async () => {
    render(
      <PieChart
        graphName={"Property Availability Category"}
        data={pieChartData1}
        pieCenterText={"Total Properties"}
        pieCenterValue={100}
        tableHeader={tableHeader}
      />
    );

    expect(screen.getByRole("graph-name")).toHaveTextContent(
      "Property Availability Category"
    );

    expect(screen.getByRole("pie-chart")).toBeInTheDocument();
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
      <PieChart
        graphName={"Property Availability Category"}
        data={pieChartData1}
        pieCenterText={"Total Properties"}
        pieCenterValue={100}
        tableHeader={tableHeader}
      />
    );

    // Assert on the chart instance creation
    expect(ChartJS).toHaveBeenCalledTimes(1);
    expect(ChartJS.mock.lastCall[1].type).toBe("doughnut");
    expect(ChartJS.mock.lastCall[1].data.labels).toEqual(
      pieChartData1.map((label) => label.label)
    );
    expect(ChartJS.mock.lastCall[1].data.datasets[0].data).toEqual([
      ...pieChartData1.map((label) => label.value),
    ]);

  });

  it("Ensure the inner statistics summary is displayed", async () => {
    // Mock the Chart component
    ChartJS.mockImplementation(() => {
      return {
        update: jest.fn(),
        destroy: jest.fn(),
      };
    });

    render(
      <PieChart
        graphName={"Property Availability Category"}
        data={pieChartData1}
        pieCenterText={"Total Properties"}
        pieCenterValue={100}
        tableHeader={tableHeader}
      />
    );

    // Ensure the inner statistics summary is displayed
    expect(ChartJS.mock.lastCall[1].plugins[0].id).toEqual("Id Chart");
    expect(ChartJS.mock.lastCall[0]).toEqual(expect.any(HTMLCanvasElement));
  });
});
