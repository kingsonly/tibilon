import React from "react";
import pdfIcon from "../assests/pdf-icon-file.svg";
import docsIcon from "../assests/docs-icon.svg";
import { AiFillDelete, AiFillEdit, AiFillEye } from "react-icons/ai";

export default function FileTypeComponent({ document }) {
  return (
    <div className="flex bg-[#ECECEC] p-[18px] items-end justify-between w-[236px] cursor-pointer">
      <div>
        <img
          src={`${document.type == "pdf" ? `${pdfIcon}` : `${docsIcon}`}`}
          alt="icon"
        />
        <div className="mt-6">
          <span className="font-bold text-[13px]">File</span> <span className="font-medium text-[12px]">{document.name}</span>{" "}
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
            <AiFillEye className="cursor-pointer text-[20px]" />{" "}
          </div>
          <div>
            <AiFillEdit className="cursor-pointer text-[20px]"  />
          </div>
          <div>
            <AiFillDelete className="cursor-pointer text-[20px]"  />
          </div>
        </div>
      </div>
    </div>
  );
}
