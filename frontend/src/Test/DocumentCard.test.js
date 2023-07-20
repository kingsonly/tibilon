// import { HiDownload } from "react-icons/hi";
// import DocumentCard from "../components/DocumentCard";
// import { handleFirstDownload } from "../components/DocumentCard";
// import { render, fireEvent, screen } from "@testing-library/react";

// test("check the functionality of this component", () => {
//   render(
//     <DocumentCard
//       imgDocument="../assets/PDF.png"
//       text="Mabuchi Site Report"
//       createdDate="created at"
//       postDate="new date"
//       download={<HiDownload />}
//       handleDocDownload={handleFirstDownload}
//     />
//   );
//   expect(screen.getByTestId("pdf-image")).toHaveAttribute(
//     "src",
//     "../assets/PDF.png"
//   );
//   expect(screen.getByTestId("card-text")).toHaveTextContent(
//     "Mabuchi Site Report"
//   );
//   expect(screen.getByTestId("posted-date")).toHaveTextContent("created at");
//   expect(screen.getByTestId("posted-date")).toBeInTheDocument();
//   expect(screen.getByTestId("download-button")).toBeInTheDocument(
//     <HiDownload />
//   );
//   const btn = screen.getByTestId("download-button");
//   fireEvent.click(btn);
//   expect(btn).toBeValid(handleFirstDownload);
// });

test('document card test', () => {
    // render(<App />);
    // const linkElement = screen.getByText(/learn react/i);
    // expect(linkElement).toBeInTheDocument();
  });
