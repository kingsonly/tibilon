import React, { useState } from "react";
import pdfIcon from "../assests/pdf-icon-file.svg";
import docsIcon from "../assests/docs-icon.svg";
import { AiFillDelete, AiFillEdit, AiFillEye } from "react-icons/ai";
import AppModal from "./AppModal";
import DocumentsContent from "./DocumentsContent";
import DialogModal from "./DialogModal";

export default function FileTypeComponent({ document, action }) {
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [open, setOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [DialogTitle, setDialogTitle] = useState("");

  const deleteapiDocumet = async () => {
    action(document.id);
  };
  const deleteDocument = async () => {
    setOpen(true);
    setDialogMessage("test");
    setDialogTitle("test title");
  };

  return (
    <div>
      <AppModal
        modalIsOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
        title="Document"
      >
        <DocumentsContent document={document} />
      </AppModal>
      <DialogModal
        open={open}
        setOpen={setOpen}
        message={dialogMessage}
        title={DialogTitle}
        action={deleteapiDocumet}
        buttonText={"Delete"}
      />
      <div className="flex bg-[#ECECEC] p-[18px] items-end justify-between w-[236px] cursor-pointer">
        <div>
          <img
            src={`${document.type == "pdf" ? `${pdfIcon}` : `${docsIcon}`}`}
            alt="icon"
          />
          <div className="mt-6">
            <span className="font-bold text-[13px]">File</span>{" "}
            <span className="font-medium text-[12px]">{document.name}</span>{" "}
          </div>
          <div>
            <span>Date</span> <span>{document.date}</span>{" "}
          </div>
        </div>
        <div className="w-[37px]">
          <div>
            <input type="checkbox" />
          </div>
          <div className="bg-[white] rounded h-[154px] flex flex-col items-center justify-around mt-4">
            <div>
              <AiFillEye
                className="cursor-pointer text-[20px]"
                onClick={() => {
                  setModalIsOpen(true);
                }}
              />{" "}
            </div>
            <div>
              <AiFillEdit className="cursor-pointer text-[20px]" />
            </div>
            <div>
              <AiFillDelete
                className="cursor-pointer text-[20px]"
                onClick={() => deleteDocument()}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}