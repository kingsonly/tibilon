import React from "react";
import ProjectActionCards from "../../components/ProjectActionCards";
import { Link, useParams } from "react-router-dom";
import budgetIcon from "../../assests/finance.svg";
import paymentIcon from "../../assests/payment.svg";
import propertiesIcon from "../../assests/house.svg";
import taskIcon from "../../assests/task_1.svg";
import materialIcon from "../../assests/materials.svg";
import BreadCrumb from "../../components/BreadCrumb";

export default function ProjectActions() {

  const { id, name } = useParams();

  const breadCrumbs = [
    {
      name: "Project",
      link: "/projects",
    },
    {
      name: `${name}`,
      link: "#",
    },
  ];
  return (
    <div className="p-[47px] bg-white">
      <BreadCrumb breadCrumbs={breadCrumbs} />
      <div
        style={{ backgroundColor: "#FCFCFD" }}
        className="flex flex-wrap items-between p-6 gap-6"
      >
        <div>
          <Link to={"/projects/actions/budget-planning"}>
            <ProjectActionCards name={"Budget & Planning"} image={budgetIcon} />
          </Link>
        </div>
        <div>
          <Link to={"/projects/actions/payment-schedule"}>
            <ProjectActionCards name={"Payment Schedule"} image={paymentIcon} />
          </Link>
        </div>
        <div>
          <Link to={`/projects/actions/project-properties/${id}`}>
            <ProjectActionCards name={"Properties"} image={propertiesIcon} />
          </Link>
        </div>
        <div>
          <Link to={"/projects/project-tasks"}>
            <ProjectActionCards name={"Tasks"} image={taskIcon} />
          </Link>
        </div>
        <div>
          <Link to={"/projects/project-materials"}>
            <ProjectActionCards name={"Materials"} image={materialIcon} />
          </Link>
        </div>
        <div>
          <Link to={"/projects/actions/budget-planning"}>
            <ProjectActionCards name={"Project Team"} image={propertiesIcon} />
          </Link>
        </div>
        <div>
          <Link to={`/projects/actions/documents/${id}`}>
            <ProjectActionCards name={"Documents"} image={propertiesIcon} />
          </Link>
        </div>
      </div>
    </div>
  );
}
