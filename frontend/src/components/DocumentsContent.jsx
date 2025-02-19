import React from "react";
import { Document, Page } from "@react-pdf/renderer";
import { Viewer } from "react-doc-viewer";

import { Viewer as PDFViewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

export default function DocumentsContent({ document }) {
  function renderDocument(fileName) {

 
    const extentionType = fileName.split(".").pop().toLowerCase();
   // fileName checks the extension of the file to determine how to render the document.

    const validImageExtensions = ["jpg", "jpeg", "png", "gif", "bmp"];

    const validDocExtensions = ["docx", "doc", "xlsx", "xls"];

    const fileUrl = `${document.file}`

    console.log(fileUrl)

    if (validImageExtensions.includes(extentionType)) {
      return <img src={`${document.file}`} />;
    } else if (extentionType == "pdf") {
      return (
        <Document file={fileUrl}>
          <Page pageNumber={1} />
        </Document>      
      );
    } else if (validDocExtensions.includes(extentionType)) {
      return <Viewer file={`${document.file}`} />;

    } else {
      return <img src={`${document.file}`} />;
    }
  }

  return (
    <div>{renderDocument(document.file)}</div>
  )
}
