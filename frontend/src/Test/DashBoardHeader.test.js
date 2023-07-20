import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashBoardHeader from "../components/DashBoardHeader";

describe("this test spans all the functionalities of the dashboard header component", () => {

  it("check that the notification button is in dashboard header", async () => {
    // render(
    //   <BrowserRouter>
    //     <Routes>
    //       <Route path="*" element={<DashBoardHeader title={"Dashboard"} />}></Route>
    //     </Routes>
    //   </BrowserRouter>
    // );
    // expect(screen.getByTestId("bell")).toBeInTheDocument();
  });

  // it("should expect title props and welcome text are rendered", async () => {
  //   render(
  //     <BrowserRouter>
  //       <Routes>
  //         <Route path="*" element={<DashBoardHeader title={"Dashboard"} />}></Route>
  //       </Routes>
  //     </BrowserRouter>
  //   );
  //   expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
  //   expect(screen.getByText(/Welcome/i)).toBeInTheDocument();
    

  // });


  // it("should check menu dropdowns", async () => {
  //   render(
  //     <BrowserRouter>
  //       <Routes>
  //         <Route path="*" element={<DashBoardHeader title={"Properties"} />}></Route>
  //       </Routes>
  //     </BrowserRouter>
  //   );
  //   const menuButton = screen.getByRole("menu");
  //   expect(menuButton).toBeInTheDocument();

  //   // check that on click of the menu icon the menu dropdown appears
  //   fireEvent.click(menuButton);
  //   expect(screen.getAllByRole("link").length).toBeGreaterThanOrEqual(3);

  //   // ensures that onclick again, the menu dropdown disappears
  //   fireEvent.click(menuButton);
  //   expect(screen.queryAllByRole("link")).toHaveLength(0);
  // });

});
