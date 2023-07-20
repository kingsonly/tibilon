import React from "react";
import { Link } from "react-router-dom";
import ProjectActionCards from "../../components/ProjectActionCards";
import propertiesIcon from "../../assests/house.svg";
import taskIcon from "../../assests/task_1.svg";
import materialIcon from "../../assests/materials.svg";

export default function Dashboard() {
  return (
    <div>
      
      <div
        style={{ backgroundColor: "#FCFCFD" }}
        className="flex flex-wrap items-between p-6 gap-6 h-screen"
      >
        <div>
          <Link to={"/clientadmin/project"}>
            <ProjectActionCards
              name={"Project"}
              image={materialIcon}
            />
          </Link>
        </div>

        <div>
          <Link to={"/clientadmin/property"}>
            <ProjectActionCards name={"Properties"} image={propertiesIcon} />
          </Link>
        </div>
      </div>
    </div>
  );
}
