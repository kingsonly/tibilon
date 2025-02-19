import React from "react";
import pdfIcon from "../assests/pdf-icon-file.svg";
import AppModal from "./AppModal";
import DocumentsContent from "./DocumentsContent";

export default function DrawingsFileComponent({ document }) {
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  return (
    <div>
      <AppModal
        modalIsOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
        title="Document"
      >
        {/* <DocumentsContent document={document} /> */}
        <div
            className="border-2 rounded w-[200px] h-[48px] bg-[#40A74E] text-white flex items-center text-[15px] font-bold justify-center cursor-pointer"
          >
            <a href={`${document.file}`}>View document</a>
          </div>
      </AppModal>
      <div
        onClick={() => {
          setModalIsOpen(true);
        }}
        className="flex p-[18px] flex-col items-start justify-between w-[236px] cursor-pointer"
      >
        <div className="mb-[30px]">
          <img src={`${pdfIcon}`} alt="icon" />
        </div>
        <div className="">
          <span className="font-bold text-[13px]">File</span>{" "}
          <span className="font-medium text-[12px]">{document.name}</span>{" "}
        </div>
     
        <div>
          <span className="font-bold text-[13px]">Date</span> <span className="font-medium text-[12px]">{new Date(document.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })} </span>{" "}
        </div>
      </div>
    </div>
  );
}
