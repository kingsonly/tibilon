import React, { useState } from "react";
import DateUserTypes from "./forms/DateUserTypes";
import AvailableTimes from "./forms/AvailableTimes";
import CompleteBookings from "./forms/CompleteBookings";

export default function MakeBookings() {
  const breadCrumbs = [
    "Select Date and User Types",
    "Get Available Times",
    "Complete Bookings",
  ];
  const [bookingStatge, setBookingStage] = useState();
  const [active, setActive] = useState([0]);
  const renderPage = (stage) => {
    switch (stage) {
      case "stage_1":
        return <DateUserTypes />;
      case "stage_2":
        return <AvailableTimes />;
      case "stage_3":
        return <CompleteBookings />;
      default:
        return <DateUserTypes />;
    }
  };

  const updateStage = (index) => {

    setActive((prev) => [...prev, index]);

    if (active.includes(2)) {
      if (index == 0 || 1) {
        // setActive(active.filter(current=> current != index))
        alert("save__and_go_back");
        setActive([0]);
        return;
      }
    }
    
    switch (index) {
      case 0:
        setBookingStage("stage_1");
        break;
      case 1:
        setBookingStage("stage_2");
        break;
      case 2:
        setBookingStage("stage_3");
        break;
      default:
        setBookingStage("stage_1");
    }
  };
  return (
    <div>
      <div>
        <div className="flex gap-0 items-center justify-center mb-8">
          {breadCrumbs.map((title, index) => (
            <div
              className="flex items-center justify-center text-[white] cursor-pointer"
              style={{
                WebkitClipPath:
                  "polygon(75% 0%, 87% 49%, 75% 100%, 0% 100%, 8% 51%, 0% 0%)",
                clipPath:
                  "polygon(75% 0%, 87% 49%, 75% 100%, 0% 100%, 8% 51%, 0% 0%)",
                background: `${
                  !active?.includes(index) ? "#F1DBAD" : "#D7B569"
                }`,
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
