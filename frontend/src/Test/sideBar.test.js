import Sidebar from "../components/SideBar/SideBar";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { SideBarLinks } from "../sideBarLinks";
import { BrowserRouter, Route, Routes } from "react-router-dom";

describe("Sidebar menu list", () => {
  it("Sidebar Menu should contain SideBar Links", () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route
            path="*"
            element={<Sidebar SideBarLinks={SideBarLinks} />}
          ></Route>
        </Routes>
      </BrowserRouter>
    );
    expect(screen.getByTestId("sidebarlinks")).toHaveTextContent("Projects");
    expect(screen.getByTestId("sidebarlinks")).toHaveTextContent("Overview");
  });

  it("should have an active class menu clicked", async () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route
            path="*"
            element={<Sidebar SideBarLinks={SideBarLinks} />}
          ></Route>
        </Routes>
      </BrowserRouter>
    );

    const aboutAnchorNode = screen.getByTestId("sidebar_Projects");
    
    fireEvent.click(aboutAnchorNode);
    expect(aboutAnchorNode).toHaveClass("nav-active");
  });

  it("should have inactive class when specified side menu isn't clicked", async () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route
            path="*"
            element={<Sidebar SideBarLinks={SideBarLinks} />}
          ></Route>
        </Routes>
      </BrowserRouter>
    );
    const PropertiesNodeClicked = screen.getByTestId(/sidebar_Projects/i);
    const aboutAnchorNode = screen.getByTestId(/sidebar_Overview/i);
    fireEvent.click(PropertiesNodeClicked);
    expect(aboutAnchorNode).toHaveClass("nav-style");
  });
});
