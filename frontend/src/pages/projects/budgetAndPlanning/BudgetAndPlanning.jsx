import React from "react";
import WorkPlan from "./WorkPlan";
import BillOfQuantity from "./BillOfQuantity";
import TabComponent from "../../../components/TabComponent";
import BreadCrumb from "../../../components/BreadCrumb";
import { useLocation } from "react-router-dom";
import { Typography } from "@mui/material";

export default function BudgetAndPlanning() {
  const { state } = useLocation();

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
      name: "Project Actions",
      link: `/projects/actions/${state?.id}/${state?.name}`,
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
      <Typography variant="h3">Coming Soon </Typography>
      {/* <TabComponent components={components} /> */}
    </div>
  );
}
