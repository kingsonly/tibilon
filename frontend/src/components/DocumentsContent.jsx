import React from "react";
import { imageBaseUrl } from "../services/apiservices/urls";
import { Document, Page, pdfjs } from "react-pdf";
import { Viewer } from "react-doc-viewer";

// import 'react-pdf/dist/Page/AnnotationLayer.css';
// import 'react-pdf/dist/Page/TextLayer.css';
import {useState } from "react"

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

console.log(pdfjs.version, "ok");

// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export default function DocumentsContent({ document }) {
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function renderDocument(fileName) {
    const extentionType = fileName.split(".").pop().toLowerCase();

    console.log(`${imageBaseUrl}/${document.file}`, "KKKKKK", extentionType);
    // fileName checks the extension of the file to determine how to render the document.

    const validImageExtensions = ["jpg", "jpeg", "png", "gif", "bmp"];

    const validDocExtensions = ["docx", "doc", "xlsx", "xls"];

    if (validImageExtensions.includes(extentionType)) {
      return <img src={`${imageBaseUrl}/${document.file}`} />;
    } else if (extentionType == "pdf") {
      console.log("ooooooppp");
      return (
        <div>
          {`${imageBaseUrl}/${document.file}`}
          <Document
            file={`${imageBaseUrl}/${document.file}`}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} />
          </Document>
          <p>
            Page {pageNumber} of {numPages}
          </p>
        </div>
      );
    } else if (validDocExtensions.includes(extentionType)) {
      return <Viewer file={`${imageBaseUrl}/${document.file}`} />;
    } else {
      return <img src={`${imageBaseUrl}/${document.file}`} />;
    }
  }

  return <div>{renderDocument(document.file)}</div>;
}
