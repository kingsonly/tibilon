import React from "react";
import { imageBaseUrl } from "../services/apiservices/urls";
import { Document, Page } from "@react-pdf/renderer";
import { Viewer } from "react-doc-viewer";

export default function DocumentsContent({ document }) {
  function renderDocument(fileName) {
    const extentionType = fileName.split(".").pop().toLowerCase();

    // console.log(fileName.split(".").pop().toLowerCase(), "kkkkkkggggg");

    console.log(`${imageBaseUrl}/${document.file}`, "ggggggg");

    const validImageExtensions = ["jpg", "jpeg", "png", "gif", "bmp"];

    const validDocExtensions = ["docx", "doc", "xlsx", "xls"];

    if (validImageExtensions.includes(extentionType)) {
      return <img src={`${imageBaseUrl}/${document.file}`} />;
    } else if (extentionType == "pdf") {
      return (
        <Document file={`${imageBaseUrl}/${document.file}`}>
          <Page pageNumber={1} />
        </Document>
      );
    } else if (validDocExtensions.includes(extentionType)) {
      return <Viewer file={`${imageBaseUrl}/${document.file}`} />;
      
    } else {
      return <img src={`${imageBaseUrl}/${document.file}`} />;
    }
  }

  console.log(document, "jjfjfjfjjfjfjfjjf");

  <div>{renderDocument(document.file)}</div>;
}
