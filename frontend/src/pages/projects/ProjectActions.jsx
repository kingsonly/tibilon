import React from "react";
import ProjectActionCards from "../../components/ProjectActionCards";
import { Link, useNavigate, useParams } from "react-router-dom";
import budgetIcon from "../../assests/finance.svg";
import paymentIcon from "../../assests/payment.svg";
import propertiesIcon from "../../assests/house.svg";
import taskIcon from "../../assests/task_1.svg";
import materialIcon from "../../assests/materials.svg";
import BreadCrumb from "../../components/BreadCrumb";

export default function ProjectActions() {
  const { id, name } = useParams();
  const navigate = useNavigate()

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
          <div
            onClick={() =>
              navigate("/projects/actions/budget-planning", { state: {name, id} })
            }
          >
            <ProjectActionCards name={"Budget & Planning"} image={budgetIcon} />
          </div>
        </div>
        <div>
          <div
            onClick={() =>
              navigate("/projects/actions/payment-schedule", { state: {name, id} })
            }
          >
            {" "}
            <ProjectActionCards name={"Payment Schedule"} image={paymentIcon} />
          </div>
        </div>
        <div>
          <div
            onClick={() =>
              navigate(`/projects/actions/project-properties/${id}`, {
                state: {name, id},
              })
            }
          >
            {" "}
            <ProjectActionCards name={"Properties"} image={propertiesIcon} />
          </div>
        </div>
        <div>
          <div
            onClick={() => navigate("/projects/project-tasks", { state: {name, id} })}
          >
            {" "}
            <ProjectActionCards name={"Tasks"} image={taskIcon} />
          </div>
        </div>
        <div>
          <div
            onClick={() =>
              navigate("/projects/project-materials", { state: {name, id} })
            }
          >
            {" "}
            <ProjectActionCards name={"Materials"} image={materialIcon} />
          </div>
        </div>
        <div>
          <div
            onClick={() =>
              navigate("/projects/actions/budget-planning", { state: {name, id} })
            }
          >
            {" "}
            <ProjectActionCards name={"Project Team"} image={propertiesIcon} />
          </div>
        </div>
        <div>
          <div
            onClick={() =>
              navigate(`/projects/actions/documents/${id}`, { state: {name, id} })
            }
          >
            {" "}
            <ProjectActionCards name={"Documents"} image={propertiesIcon} />
          </div>
        </div>
      </div>
    </div>
  );
}
