

import React from "react";
import TabComponent from "../../components/TabComponent";
import NewRequisition from "./NewRequisition";
import ManageRequisition from "./ManageRequisition";
import Requests from "./Requests";
import CreateLPO from "./CreateLPO";


const components = [
  {
    id: 1,
    component: NewRequisition,
    header: "New Requisition",
  },
  {
    id: 2,
    component: ManageRequisition,
    header: "Manage Requisition",
  },
  {
    id: 3,
    component: Requests,
    header: "Requests",
  },
  {
    id: 4,
    component: CreateLPO,
    header: "Create LPO",
  },
];

export default function Procurements() {
  return (
    <div className="bg-white p-[47px]">
      <TabComponent components={components} />
    </div>
  );
}

