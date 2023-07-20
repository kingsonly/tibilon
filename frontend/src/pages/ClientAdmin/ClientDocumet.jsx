
import React, { useState } from "react";
import AllDocuments from "./DocumentsTabs/AllDocuments";
import Drawings from "./DocumentsTabs/Drawings";
import Gallery from "./DocumentsTabs/Gallery";

export default function ClientDocumet() {
  const breadCrumbs = [
    
    "Photos/Videos",
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
        return <Gallery />;
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
        setBookingStage(3);
    }
  };
  return (
    <div className="bg-[white] p-[47px]">
      <div>
        <div className="flex gap-0 items-center justify-center mb-8">
          {breadCrumbs.map((title, index) => (
            <div
              className="flex items-center justify-center text-[D7B569] font-bold text-[22px]"
              style={{
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
