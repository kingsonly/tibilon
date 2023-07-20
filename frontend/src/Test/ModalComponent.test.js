import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import AppModal from "../components/AppModal";

describe("Tab", () => {
  it("Modal should open and render tab body and title", () => {
    const handleClose = jest.fn();
    render(
      <AppModal
        modalIsOpen={true}
        setIsOpen={handleClose}
        title={"Enter New Property"}
      >
        The way up is down!!
      </AppModal>
    );

    const modalTitle = screen.getByText(/Enter New Property/i);
    expect(modalTitle).toBeInTheDocument();

    const modalBody = screen.getByText(/The way up is down!!/i);
    expect(modalBody).toBeInTheDocument();
  });

  it("modal shows the children and a close button", () => {
    const handleClose = jest.fn();
    render(
      <AppModal
        modalIsOpen={true}
        setIsOpen={handleClose}
        title={"Enter New Property"}
      >
        The way up is down!!
      </AppModal>
    );

    fireEvent.click(screen.getByText(/close/i));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
