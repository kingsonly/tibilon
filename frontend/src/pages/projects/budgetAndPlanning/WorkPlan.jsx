import React from "react";
import TableComponent from "../../../components/TableComponent";

export default function WorkPlan() {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }
  const searchFunction = () => {
    //Api call to search and update table data
    alert("Fetching search....");
  };

  const paginationChange = (page) => {
    //Api call to paginate and update table data
    alert(`Paginating....page ${page}`);
  };

  const data = [
    {
      name: "A",
      description: "Substructure",
      amount: "14,057,750.00",
    },
    {
      name: "C",
      description: "Upper Floor",
      amount: "14,057,750.00",
    },
    {
      name: "D",
      description: "Upper Floor",
      amount: "14,057,750.00",
    },
    {
      name: "E",
      description: "Upper Floor",
      amount: "14,057,750.00",
    },
  ];

  const dataKeyAccessors = ["name", "description", "amount"];

  const columns = ["Item", "Description", "Amount(₦)"];

  return (
    <div>
      <TableComponent
        actionText="Upload Data"
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
