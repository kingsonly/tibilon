import React from "react";
import TabComponent from "../../components/TabComponent";
import MakeBookings from "./MakeBookings";
import Bookings from "./Bookings";
import DailyCalender from "./DailyCalender";
import { Typography } from "@mui/material";

const components = [
  {
    id: 1,
    component: MakeBookings,
    header: "Make Booking",
  },
  {
    id: 2,
    component: Bookings,
    header: "List of Bookings",
  },
  {
    id: 3,
    component: DailyCalender,
    header: "Daily Calender",
  },
];

export default function Logistics() {
  return (
    <div className="bg-white p-[47px]">
      <Typography variant="h3">Coming Soon </Typography>
      {/* <TabComponent components={components} /> */}
    </div>
  );
}
