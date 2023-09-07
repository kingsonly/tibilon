import React, { Fragment, useRef } from "react";
import TableComponent from "../../components/TableComponent";

import AddPropertyModal from "../../components/AddPropertyModal";


export default function Properties() {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  const data = [
    {
      index: 1,
      description: "Course of Construction",
      location: "8 Units of 5 Bedroom duplex.",
      unit: "14",
      available: 12,
      price: 4000,
      status: "completed",
      view: "",
    },
    {
      index: 1,
      description: "Course of Construction",
      location: "8 Units of 5 Bedroom duplex.",
      unit: "14",
      available: 12,
      price: 4000,
      status: "completed",
      view: "",
    },
    {
      index: 1,
      description: "A",
      location: "8 Units of 5 Bedroom duplex.",
      unit: "14",
      available: 12,
      price: 4000,
      status: "completed",
      view: "",
    },
  ];

  const dataKeyAccessors = [
    "index",
    "description",
    "location",
    "unit",
    "available",
    "price",
    "status",
    "view",
  ];

  const columns = [
    "index",
    "Description",
    "Location",
    "Unit",
    "Available",
    "Price",
    "Status",
    "view",
  ];



  const searchFunction = () => {
    //Api call to search and update table data
    alert("Fetching search....");
  };

  const paginationChange = (page) => {
    //Api call to paginate and update table data
    alert(`Paginating....page ${page}`);
  };


  return (
    <div className="bg-white p-[47px] h-screen">
 
      {/* <AddPropertyModal setIsOpen={setIsOpen} modalIsOpen={modalIsOpen}/> */}

      <div className="flex justify-start mb-[2rem]">
        <b>Properties List</b>
      </div>

      <TableComponent
        actionText="Add New Property"
        columns={columns}
        data={data}
        action={openModal}
        searchFunction={searchFunction}
        paginationChange={paginationChange}
        dataKeyAccessors={dataKeyAccessors}
      />
    </div>
  );
}
