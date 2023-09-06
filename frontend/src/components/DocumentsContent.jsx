import React, { useState } from "react";
import { imageBaseUrl } from "../services/apiservices/urls";
import { Document, Page ,pdfjs} from 'react-pdf';
import { Viewer } from "react-doc-viewer";
import nysc from "../assests/nysc.pdf"

export default function DocumentsContent({ document }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
console.log(imageBaseUrl)
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  function renderDocument(fileName) {
    const extentionType = fileName.split(".").pop().toLowerCase();
   // fileName checks the extension of the file to determine how to render the document.

    const validImageExtensions = ["jpg", "jpeg", "png", "gif", "bmp"];

    const validDocExtensions = ["docx", "doc", "xlsx", "xls"];

    if (validImageExtensions.includes(extentionType)) {
      return <img src={`${imageBaseUrl}/${document.file}`} />;
    } else if (extentionType == "pdf") {
      return (
        <Document file={ nysc}  onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
      )
    } else if (validDocExtensions.includes(extentionType)) {
      return <Viewer file={`${imageBaseUrl}/${document.file}`} />;

    } else {
      return <img src={`${imageBaseUrl}/${document.file}`} />;
    }
  }

  return (
    <div>{renderDocument(document.file)}</div>
  )
}
