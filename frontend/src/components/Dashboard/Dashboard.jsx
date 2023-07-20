import React, { useEffect, useState } from "react";
import LineGraph from "../LineGraph";
import PieChart from "../PieChart";
import RecentActivities from "../RecentActivityCard/RecentActivities";
import axios from "axios";
import DashboardCard from "../../components/Dashboard/Dashboard_card_component";
import DocumentCard from "../../components/DocumentCard";
import { CircularProgress } from "@mui/material";

export default function Dashboard() {
  const [totalStats, setTotalStats] = useState([]);
  const [lineLabel, setLineLabel] = useState([]);
  const [line1Details, setLine1Details] = useState([]);
  const [line2Details, setLine2Details] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);
  const [totalProperty, setTotalProperty] = useState("");
  const [formWork, setFormwork] = useState([]);
  const [activity, setActivity] = useState(null);

  useEffect(() => {
    fetchData();
    fetchActivity();
  }, []);

  const fetchData = async () => {
    var token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/site`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Process the response data
      if (response.data.status == "success") {
        let totalStats = [
          {
            title: "Project",
            total: response.data.data.totalProjects,
            ongoing: response.data.data.totalInprogressProject,
            completed: response.data.data.totalCompletedProject,
            ongoingTitle: "Ongoing",
            completedTitle: "Completed",
          },
          {
            title: "Payment",
            total: response.data.data.totalPropertyPayment,
            ongoing: response.data.data.totalIncompletedPropertyPayment,
            completed: response.data.data.totalCompletedPropertyPayment,
            ongoingTitle: "Incomplete",
            completedTitle: "Completed",
          },
          {
            title: "Properties",
            total: response.data.data.totalProperty,
            ongoing: response.data.data.totalAvailableProperty,
            completed: response.data.data.totalSoldProperty,
            ongoingTitle: "Available",
            completedTitle: "Sold",
          },
          {
            title: "Contractors",
            total: response.data.data.totalContractors,
            ongoing: response.data.data.totalExternalContractor,
            completed: response.data.data.totalInhouseContractor,
            ongoingTitle: "External",
            completedTitle: "Inhouse",
          },
        ];
        // update totalStats  states
        setTotalStats(totalStats);

        // construct structure for line chart
        let lineDetails = {
          label: Object.keys(response.data.data.affiliate),
          line1: Object.values(response.data.data.affiliate),
          line2: Object.values(response.data.data.SalesTeam),
        };
        setLineLabel(Object.keys(response.data.data.affiliate));
        setLine1Details(Object.values(response.data.data.SalesTeam));
        setLine2Details(Object.values(response.data.data.affiliate));
        
        let pieChartData1 = [
          {
            value: response.data.data.totalAvailableProperty,
            sectionColor: "green",
            label: "Available",
          },
          {
            value: response.data.data.totalSoldProperty,
            sectionColor: "red",
            label: "Sold",
          },
        ];
        setPieChartData(pieChartData1);
        setTotalProperty(response.data.data.totalProperty);
        setFormwork(response.data.data.task);
      }
    } catch (error) {
      // Handle the error
      console.error(error);
    }
  };

  const fetchActivity = async () => {
    var token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/site/activities`,
        [],
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Process the response data
      if (response.data.status == "success") {
        setActivity(response.data.data);
      }
    } catch (error) {
      // Handle the error
      console.error(error);
    }
  };

  function goToFormwork() {
    // route a user to the formwork
  }

  const tableHeader = ["Property/Location", "Available"];

  return (
    <div className="bg-slate-100">
      {/* <button onClick={openModal}>View Modal</button> */}
      {totalStats.length === 0 && (
        <div className="flex items-center justify-center w-[100%] mb-[20px]">
          <CircularProgress />
        </div>
      )}
      <div className="flex flex-wrap">
        <div className="w-full">
          {" "}
          <div className="flex justify-end">
            <div className="w-screen flex items-center grid grid-cols-4 gap-4">
              {totalStats.map((value) => (
                <div
                //   className="w-1/2"
                //   style={{border:"2px solid red"}}
                >
                  <DashboardCard
                    title={value.title}
                    total={value.total}
                    completed={value.completed}
                    ongoing={value.ongoing}
                    completedtitle={value.completedTitle}
                    ongoingtitle={value.ongoingTitle}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex bg-white mt-10 gap-[15px] p-2">
        <div
          // className="w-1/4"
          className="bg-white w-1/2"
        >
          {lineLabel.length > 0 ? (
            <LineGraph
              graphName={"Percentage increase (%)"}
              labels={lineLabel}
              line1={line1Details}
              line2={line2Details}
              line1LabelKey={"Tibilion Sales Team"}
              line2LabelKey={"Sales Affiliates"}
              line1Color="red"
              line2Color={"green"}
              xAxisTitle={"Year"}
              yAxisTitle={"Percentage"}
            />
          ) : null}
        </div>
        <div
          // className="w-1/2"
          className="bg-white w-3/4"
        >
          {" "}
          {pieChartData.length > 0 ? (
            <PieChart
              graphName={"Property Availability"}
              data={pieChartData}
              pieCenterText={"Total Properties"}
              pieCenterValue={totalProperty}
              tableHeader={tableHeader}
            />
          ) : null}
        </div>
      </div>

      <div className="flex mt-10 gap-[15px]">
        <div className="w-1/2 bg-white p-5">
          <div>
            <b>Work Order</b>{" "}
          </div>
          {formWork.length > 0 ? (
            <div className="flex flex-col gap-[12px] h-[300px] overflow-auto">
              {formWork?.map((task) => (
                <DocumentCard
                  text={task.title}
                  createdDate={task.created_at}
                  reference={task.id}
                  taskid={task.id}
                />
              ))}
            </div>
          ) : (
            <div>No Available task</div>
          )}
        </div>
        <div className="w-1/2 bg-white p-5  ">
          <div>
            <b>Recent Activities</b>{" "}
          </div>
          <div className="h-[300px] overflow-auto">
            {activity !== null
              ? Object.keys(activity)?.map((items, keys) => (
                  <div className="" role="activity-lists" key={items.id}>
                    <div className="">
                      <RecentActivities
                        date={items}
                        activities={activity[items].data}
                      />
                    </div>
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>
    </div>
  );
}
