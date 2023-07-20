import React from "react";
import RecentActivities from "../components/RecentActivityCard/RecentActivities";

function RecentActivityPage() {

    const ActivityList = [
        {
            id: "1",
            date: "19th Oct",
            activities: [
                {
                    id: "1",
                    activity: "A new proposal was submitted",
                    time: "02:30pm"
                },
                {
                    id: "2",
                    activity: "A new proposal was submitted",
                    time: "02:30pm"
                },
                {
                    id: "3",
                    activity: "A new proposal was submitted",
                    time: "02:30pm"
                },
                {
                    id: "4",
                    activity: "A new proposal was submitted",
                    time: "02:30pm"
                },
            ]
        },
        {
            id: "2",
            date: "19th Oct",
            activities: [
                {
                    id: "1",
                    activity: "A new proposal was submitted",
                    time: "02:30pm"
                },
                {
                    id: "2",
                    activity: "A new proposal was submitted",
                    time: "02:30pm"
                },
                {
                    id: "3",
                    activity: "A new proposal was submitted",
                    time: "02:30pm"
                },
                {
                    id: "4",
                    activity: "A new proposal was submitted",
                    time: "02:30pm"
                },
            ]
        }
    ]

    return (
        <div className="">
            <div><b>Recent Activities</b> </div>
            {ActivityList.map((items, keys) => (
                <div className="" role="activity-lists" key={items.id}>
                    <div className="">
                        <RecentActivities
                            date={items.date}
                            activities={items.activities}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default RecentActivityPage;