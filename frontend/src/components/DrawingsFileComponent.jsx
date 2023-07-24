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
        <DocumentsContent document={document} />
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
        <div className="">
          <span className="font-bold text-[13px]">Category</span>{" "}
          <span className="font-medium text-[12px]">{document.category}</span>{" "}
        </div>
        <div>
          <span>Date</span> <span>{document.date}</span>{" "}
        </div>
      </div>
    </div>
  );
}
