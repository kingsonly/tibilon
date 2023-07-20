import React from "react";
import { Link } from "react-router-dom";
import ProjectActionCards from "../../components/ProjectActionCards";
import propertiesIcon from "../../assests/house.svg";
import taskIcon from "../../assests/task_1.svg";
import materialIcon from "../../assests/materials.svg";

export default function Settings() {
  return (
    <div>
      
      <div
        style={{ backgroundColor: "#FCFCFD" }}
        className="flex flex-wrap items-between p-6 gap-6 h-screen"
      >
        <div>
          <Link to={"/settings/materials"}>
            <ProjectActionCards
              name={"Materials"}
              image={materialIcon}
            />
          </Link>
        </div>

        <div>
          <Link to={"/settings/amenities"}>
            <ProjectActionCards name={"Amenities"} image={propertiesIcon} />
          </Link>
        </div>
        <div>
          <Link to={"/settings/units"}>
            <ProjectActionCards name={"Units"} image={taskIcon} />
          </Link>
        </div>
      </div>
    </div>
  );
}
