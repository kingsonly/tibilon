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
      <hr className="border"></hr>
      <div className="mt-20 mb-6 text-2xl flex justify-start font-semibold">
        View Budget
      </div>
      <hr className="border"></hr>
      <div className="flex space-x-72 mt-10">
        <div className="space-y-4">
          <div className="text-xl font-semibold">Budget Title</div>
          <div className="text-current">Budget 1 (Structure)</div>
        </div>
        <div className="space-y-4">
          <div className="text-xl font-semibold">No of Units</div>
          <div>20</div>
        </div>
        <div className="space-y-4">
          <div className="text-xl font-semibold">Budget Cost (#)</div>
          <div>40,317,000.00</div>
        </div>
      </div>
      <div className="border h-48 w-[100%] rounded-lg mt-10">
        <div className="mt-4 flex justify-start ml-2 text-xl font-semibold">
          Budget Description
        </div>
        <div className="line-clamp-3 mt-4 flex justify-start space-y-12 line-clamp-3">
          Lorem ipsum is a placeholder text commonly used to demonstrate the
          visual form of a document or a typeface without relying on meaningful
          content.
        </div>
      </div>
      <div className="flex space-x-28 mt-28 mb-6 text-2xl ">
        <div
        >Substructure</div>
        <div>Superstructure</div>
      </div>
      <hr className="border"></hr>
      {/* <TabComponent components={components} /> */}
    </div>
  );
}
