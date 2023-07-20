

import React from "react";
import TableComponent from "../../components/TableComponent";
import { useNavigate } from "react-router-dom";

export default function AllContractors() {
  let navigate = useNavigate();
  const data = [
    {
      index: 1,
      name: "Toks joww",
      address: "1 Masarki Close Wuse 2",
      mobile: "080312345678",
      description: "Building",
      source:"External",
      // price: "80,000,000",
      action: "view",
    },
    {
      index: 1,
      name: "Micahel Hiwwk",
      address: "12 Dalaba Street, Lugbe",
      mobile: "080312345678",
      description: "Construction",
      source: "Internal",
      // price: "75,000,000",
      action: "view",
    },
    {
      index: 1,
      name: "Mrs jay Audu",
      address: "1 Masarki Close Wuse 2",
      mobile: "080312345678",
      description: "Construction",
      source:"External",
      // price: "80,000,000",
      action: "view",
    },
    {
      index: 1,
      name: "Alh. Musa Bawa",
      address: "1 Masarki Close Wuse 2",
      mobile: "080312345678",
      description: "Construction",
      source:"External",
      // price: "80,000,000",
      action: "view",
    },
    {
      index: 1,
      name: "Alh. Musa Bawa",
      address: "1 Masarki Close Wuse 2",
      mobile: "080312345678",
      description: "Construction",
      source:"External",
      // price: "80,000,000",
      action: "view",
    },
  ];

  const columns = [
    "S/No",
    "Contractor",
    "Address",
    "Phone No",
    "Contract Type",
    "Source",
    // "Price(₦)",
    "View",
  ];

  const dataKeyAccessors = [
    "index",
    "name",
    "address",
    "mobile",
    "description",
    "source",
    // "price",
    "action",
  ];

  const searchFunction = () => {
    //Api call to search and update table data
    alert("Fetching search....");
  };

  const paginationChange = (page) => {
    //Api call to paginate and update table data
    alert(`Paginating....page ${page}`);
  };

  const showCreationCreate = () => {
    // /contractors-create
    navigate("/contractors/contractors-create");
  };

  return (
    <div>
      <hr />
      <TableComponent
        actionText="Add New Contractor"
        columns={columns}
        data={data}
        action={showCreationCreate}
        searchFunction={searchFunction}
        paginationChange={paginationChange}
        dataKeyAccessors={dataKeyAccessors}
      />
    </div>
  );
}
