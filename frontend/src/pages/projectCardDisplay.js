// import { Routes, Route } from "react-router-dom"
import React from "react";
import ProjectCardDisplay from "../components/Dashboard/projectCardDisplayComponent";
import { Link } from "react-router-dom";


function ProjectCardPage() {

    // const menuList = [
    //     {
    //         id: "1",
    //         title: "Project Name :",
    //         value: "Mabushi Project"
    //     },
    //     {
    //         id: "2",
    //         title: "Project Manager :",
    //         value: "Victor Ugwu"
    //     },

    //     {
    //         id: "3",
    //         title: "Site Location :",
    //         value: "Mabushi Abuja"
    //     },

    //     {
    //         id: "4",
    //         title: "Project Desc :",
    //         value: "8 Unit of 5 Bedroom Duplex"
    //     },
    //     {
    //         id: "5",
    //         title: "Project Owner :",
    //         value: "Tibilon Construction LTD"
    //     },
    //     {
    //         id: "6",
    //         title: "Actual Start Date :",
    //         value: "21/12/2021"
    //     },

    //     {
    //         id: "7",
    //         title: "Project Finnish :",
    //         value: "23/12/2022"
    //     },
    //     {
    //         id: "8",
    //         title: "Duration :",
    //         value: "366 Days"
    //     },

    //     {
    //         id: "9",
    //         title: "Stage :",
    //         value: "Course of Construction"
    //     },

    //     {
    //         id: "10",
    //         title: "Status :",
    //         value: "Ongoing"
    //     },


    // ];

    const ProjectObject = [
        {
            id: "1",
            image: "Untitled.jpeg",
            propertydetails: [
                {
                    id: "1",
                    title: "Project Name :",
                    value: "Mabushi Project"
                },
                {
                    id: "2",
                    title: "Project Manager :",
                    value: "Victor Ugwu"
                },

                {
                    id: "3",
                    title: "Site Location :",
                    value: "Mabushi Abuja"
                },

                {
                    id: "4",
                    title: "Project Desc :",
                    value: "8 Unit of 5 Bedroom Duplex"
                },
                {
                    id: "5",
                    title: "Project Owner :",
                    value: "Tibilon Construction LTD"
                },
                {
                    id: "6",
                    title: "Actual Start Date :",
                    value: "21/12/2021"
                },

                {
                    id: "7",
                    title: "Project Finnish :",
                    value: "23/12/2022"
                },
                {
                    id: "8",
                    title: "Duration :",
                    value: "366 Days"
                },

                {
                    id: "9",
                    title: "Stage :",
                    value: "Course of Construction"
                },

                {
                    id: "10",
                    title: "Status :",
                    value: "Ongoing"
                },


            ]
        },
        {
            id: "2",
            image: "Untitled.jpeg",
            propertydetails: [
                {
                    id: "1",
                    title: "Project Name :",
                    value: "Mabushi Project"
                },
                {
                    id: "2",
                    title: "Project Manager :",
                    value: "Victor Ugwu"
                },

                {
                    id: "3",
                    title: "Site Location :",
                    value: "Mabushi Abuja"
                },

                {
                    id: "4",
                    title: "Project Desc :",
                    value: "8 Unit of 5 Bedroom Duplex"
                },
                {
                    id: "5",
                    title: "Project Owner :",
                    value: "Tibilon Construction LTD"
                },
                {
                    id: "6",
                    title: "Actual Start Date :",
                    value: "21/12/2021"
                },

                {
                    id: "7",
                    title: "Project Finnish :",
                    value: "23/12/2022"
                },
                {
                    id: "8",
                    title: "Duration :",
                    value: "366 Days"
                },

                {
                    id: "9",
                    title: "Stage :",
                    value: "Course of Construction"
                },

                {
                    id: "10",
                    title: "Status :",
                    value: "Ongoing"
                },


            ]
        },
        {
            id: "3",
            image: "Untitled.jpeg",
            propertydetails: [
                {
                    id: "1",
                    title: "Project Name :",
                    value: "Mabushi Project"
                },
                {
                    id: "2",
                    title: "Project Manager :",
                    value: "Victor Ugwu"
                },

                {
                    id: "3",
                    title: "Site Location :",
                    value: "Mabushi Abuja"
                },

                {
                    id: "4",
                    title: "Project Desc :",
                    value: "8 Unit of 5 Bedroom Duplex"
                },
                {
                    id: "5",
                    title: "Project Owner :",
                    value: "Tibilon Construction LTD"
                },
                {
                    id: "6",
                    title: "Actual Start Date :",
                    value: "21/12/2021"
                },

                {
                    id: "7",
                    title: "Project Finnish :",
                    value: "23/12/2022"
                },
                {
                    id: "8",
                    title: "Duration :",
                    value: "366 Days"
                },

                {
                    id: "9",
                    title: "Stage :",
                    value: "Course of Construction"
                },

                {
                    id: "10",
                    title: "Status :",
                    value: "Ongoing"
                },


            ]
        }
    ];

    return (

        <div className="">
            {ProjectObject.map((items, keys) => (
                <Link
                    /* Below is the page path with an interpolated string where 
                    {items.id} is the dynamic bit which is being used to 
                    generate each page's unqiue url from the array the pre-fixed main 
                    path stays the same */


                    to={`/project/${items.id}`}
                    // state={{ ProjectCardPage }}
                    key={items.id}>
                    <div className="flex justify-end items-center mb-[10px]">
                        <div className="w-[990px] bg-[white] shadow-lg shadow-[#ccc] pl-[10px] h-[220px] flex items-center">
                            <ProjectCardDisplay
                                image={items.image}
                                ObjectList={items.propertydetails}
                            />
                        </div>
                    </div>
                </Link>
            ))}



        </div>

    );
}

export default ProjectCardPage;
