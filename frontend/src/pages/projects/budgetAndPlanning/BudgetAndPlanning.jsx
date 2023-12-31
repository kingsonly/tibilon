import React from "react";
import WorkPlan from "./WorkPlan";
import BillOfQuantity from "./BillOfQuantity";
import TabComponent from "../../../components/TabComponent";
import BreadCrumb from "../../../components/BreadCrumb";

export default function BudgetAndPlanning() {
  const components = [
    {
      id: 1,
      component: WorkPlan,
      header: "Bill of Quantity",
    },
    {
      id: 2,
      component: BillOfQuantity,
      header: "Work Plan/Schedule",
    },
  ];

  const breadCrumbs = [
    {
      name: "Project",
      link: "/projects",
    },
    {
      name: "Mabuchi Project",
      link: "#",
    },
    {
      name: "Budget Planning",
      link: "#",
    },
  ];
  return (
    <div className="bg-[white] p-[47px]">
      <BreadCrumb breadCrumbs={breadCrumbs} />
      <hr />
      <TabComponent components={components} />
    </div>
  );
}
