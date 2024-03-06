import { Typography } from "@mui/material";
import React from "react";
import BreadCrumb from "../../components/BreadCrumb";
import { useLocation } from "react-router-dom";

export default function ProjectMaterials() {
  const { state } = useLocation();
  const breadCrumbs = [
    {
      name: "Project Actions",
      link: `/projects/actions/${state?.id}/${state?.name}`,
    },
    {
      name: "Project Materials",
      link: "#",
    },
  ];
  return (
    <div>
      <BreadCrumb breadCrumbs={breadCrumbs} />
      <div>ProjectMaterials</div>
      <Typography variant="h3">Coming Soon </Typography>
    </div>
  );
}
