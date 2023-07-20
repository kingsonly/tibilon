import React from "react";
import TabComponent from "../../components/TabComponent";
import AllPayments from "./AllPayments";
import OneOffPayments from "./OneOffPayments";
import InstallmentalPayments from "./InstallmentalPayments";


const components = [
  {
    id: 1,
    component: AllPayments,
    header: "All Payments",
  },
  {
    id: 2,
    component: OneOffPayments,
    header: "One-Off Payments",
  },
  {
    id: 3,
    component: InstallmentalPayments,
    header: "Installmental Payments",
  },
];

export default function Payment() {
  return (
    <div className="bg-white p-[47px]">
      <TabComponent components={components} />
    </div>
  );
}
