import DocumentCard from "../components/DocumentCard";
import pdfImage from "../assests/pdf-icon.svg";

function DocumentCardPage() {
  function handleFirstDownload() {
    const texts = ["Mabuchi site document"];
    // file object
    const file = new Blob(texts, { type: "text/plain" });
    // anchor link
    const element = document.createElement("a");
    element.href = URL.createObjectURL(file);
    element.download = "Mabuchi site report-" + new Date() + ".text";
    // simulate link click
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }

  const style = { color: "gray", fontSize: "50" };

  const reports = [
    {
      imgDocument: pdfImage,
      text: "Mabuchi Site Report",
      createdDate: "Created on 11/10/2023",
      reference: "Tc#523-wo",
    },
    {
      imgDocument: pdfImage,
      text: "Decking for new site Jahi",
      createdDate: "Created on 11/10/2023",
      reference: "Tc#523-wo",
    },
    {
      imgDocument: pdfImage,
      text: "Mabuchi Site Report",
      createdDate: "Created on 11/10/2023",
      reference: "Tc#523-wo",
    },
    {
      imgDocument: pdfImage,
      text: "Clearing for blocks C & D",
      createdDate: "Sent on 11/10/2023",
      reference: "Tc#523-wo",
    },
    {
      imgDocument: pdfImage,
      text: "Mabuchi Site Report",
      createdDate: "Created on 11/10/2023",
      reference: "Tc#523-wo",
    },
  ];
  return (
    <div className="flex flex-col gap-[12px]">
      {reports?.map((report) => (
        <DocumentCard
          imgDocument={report.imgDocument}
          text={report.text}
          createdDate={report.createdDate}
          reference={report.reference}
          handleDocDownload={handleFirstDownload}
        />
      ))}
    </div>
  );
}
export default DocumentCardPage;
