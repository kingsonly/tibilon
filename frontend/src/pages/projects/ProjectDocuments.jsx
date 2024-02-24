import React, { useState } from "react";
import AllDocuments from "./DocumentsTabs/AllDocuments";
import Drawings from "./DocumentsTabs/Drawings";
import Gallery from "./DocumentsTabs/Gallery";
import BreadCrumb from "../../components/BreadCrumb";
import { useLocation } from "react-router-dom";
export default function ProjectDocuments() {
  const breadCrumbs = ["All Documents", "Drawings", "Photos/Videos"];

  const { state } = useLocation();
  const breadCrumb = [
    {
      name: "Project Actions",
      link: `/projects/actions/${state?.id}/${state?.name}`,
    },
    {
      name: "Project Documents",
      link: "#",
    },
  ];

  const [bookingStatge, setBookingStage] = useState();
  const [active, setActive] = useState(0);
  const renderPage = (stage) => {
    switch (stage) {
      case 1:
        return <AllDocuments />;
      case 2:
        return <Drawings />;
      case 3:
        return <Gallery />;
      default:
        return <AllDocuments />;
    }
  };

  const updateStage = (index) => {
    setActive(index);

    switch (index) {
      case 0:
        setBookingStage(1);
        break;
      case 1:
        setBookingStage(2);
        break;
      case 2:
        setBookingStage(3);
        break;
      default:
        setBookingStage(1);
    }
  };
  return (
    <div className="bg-[white] p-[47px]">
      <div>
        <BreadCrumb breadCrumbs={breadCrumb} />

        <div className="flex gap-0 items-center justify-center mb-8">
          {breadCrumbs.map((title, index) => (
            <div
              className="flex items-center justify-center text-[D7B569] font-bold text-[22px] cursor-pointer"
              style={{
                borderBottom: `${active === index ? "" : "2px solid #CCCCCC"}`,
                borderTop: `${active !== index ? "" : "2px solid #CCCCCC"}`,
                borderLeft: `${active !== index ? "" : "2px solid #CCCCCC"}`,
                borderRight: `${active !== index ? "" : "2px solid #CCCCCC"}`,
                width: "400px",
                height: "60px",
              }}
              onClick={() => updateStage(index)}
            >
              <div className="ml-[-2rem]"> {title}</div>
            </div>
          ))}
        </div>
      </div>
      {renderPage(bookingStatge)}
    </div>
  );
}
