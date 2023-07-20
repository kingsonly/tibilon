// import { Routes, Route } from "react-router-dom"
import React from "react";
import DashboardCard from "../components/Dashboard/Dashboard_card_component";

function DashboardPage() {
  var content = [
    {
      title: "Project",
      total: 16,
      completed: 10,
      ongoing: 20,
      completedtitle: "test",
    },

    {
      title: "New Payments",
      total: 16,
      completed: 10,
      ongoing: 20,
      completedtitle: "test",
    },

    {
      title: "Properties",
      total: 16,
      completed: 10,
      ongoing: 20,
      completedtitle: "test",
    },

    {
      title: "Contractors",
      total: 16,
      completed: 10,
      ongoing: 20,
      completedtitle: "test",
    },
  ];
  return (
    <div className="flex justify-end">
      <div className="w-screen flex items-center grid grid-cols-4 gap-4">
        {content.map((value) => (
          <div 
        //   className="w-1/2" 
        //   style={{border:"2px solid red"}}
          >
            <DashboardCard
              title={value.title}
              total={value.total}
              completed={value.completed}
              ongoing={value.ongoing}
              completedtitle={value.completedtitle}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardPage;
