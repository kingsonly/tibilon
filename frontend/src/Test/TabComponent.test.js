import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import TabComponent from "../components/TabComponent";

export function Tab1() {
  return <div>All Payments Tab</div>;
}

export function Tab2() {
  return <div>One-Off Payments Tab</div>;
}

const components = [
  {
    id: 1,
    component: Tab1,
    header: "All Payments",
  },
  {
    id: 2,
    component: Tab2,
    header: "One-Off Payments",
  },
];

describe("Tab", () => {
  it("Tab Component should contain Payment Tab", () => {
    render(<TabComponent components={components} />);
    const tab = screen.getByRole("tab", { name: "All Payments" });
    fireEvent.click(tab);
    expect(screen.getByRole("tab", { selected: true })).toHaveTextContent(
      "All Payments"
    );
  });

  it("to check that the second tab becomes selected when clicked on", async () => {
    render(<TabComponent components={components} />);
    const allPaymentsTab = screen.getByText("All Payments");
    const OneOffTab = screen.getByText("One-Off Payments");

    // Default
    expect(allPaymentsTab).toHaveAttribute("aria-selected", "true");
    expect(OneOffTab).toHaveAttribute("aria-selected", "false");

    //When the One-Off Payments Tab is clicked on
    fireEvent.click(OneOffTab);
    expect(allPaymentsTab).toHaveAttribute("aria-selected", "false");
    expect(OneOffTab).toHaveAttribute("aria-selected", "true");
  });
});
