import React from "react";
import TabComponent from "../../components/TabComponent";
import Inventory from "./Inventory";
import MaterialRequests from "./MaterialRequests";
import PurchasedAndReceived from "./PurchasedAndReceived";


const components = [
  {
    id: 1,
    component: Inventory,
    header: "Inventory",
  },
  {
    id: 2,
    component: PurchasedAndReceived,
    header: "Purchased & Received",
  },
  {
    id: 3,
    component: MaterialRequests,
    header: "Material Requests",
  },
];

export default function Storage() {
  return (
    <div className="bg-white p-[47px]">
      <TabComponent components={components} />
    </div>
  );
}
