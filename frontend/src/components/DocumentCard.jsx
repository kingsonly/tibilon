import React from "react";
import pdfImage from "../assests/pdf-icon.svg";
/**
 * This represents downloadable document cards component.
 * @function
 * @param {string} props - stores all the data of the document card component.
 * @param {Function} props - a handleclick function button that downloads the document when clicked.
 * @Description this component displays document cards which include imgDocument(PDF Document), text(site report),
 * download(download icon),postdate(description of document and the date created or sent), and a downloadable icon that downloads the document at a click.
 * It has a function that listens to the handle click when the icon is clicked
 */

function DocumentCard({
  imgDocument,
  text,
  reference,
  createdDate,
  taskid,
}) {

  const handleClick = () => {
    
  }

  return (
    <div className="flex gap-[1rem] items-center justify-between hover:bg-slate-50 w-[360px] h-[50px] p-[5px]" onClick={()=> handleClick(taskid)}>
      <div>
        <img
          src={pdfImage}
          data-testid="pdf-image"
          // className="w-[100px]"
          alt="pdf"
        />
      </div>

      <div className="text-center">
        <p className="text-[13px] font-bold" data-testid="card-text">
          {text}
        </p>
        <p className="text-[13px] font-medium" data-testid="posted-date">
          {createdDate }
        </p>
      </div>
      <span
        className="hover:cursor-pointer"
        data-testid="download-button"   
      >
        ##{reference}
      </span>
    </div>
  );
}
export default DocumentCard;
