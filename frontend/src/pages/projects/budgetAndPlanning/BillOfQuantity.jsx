import React from "react";
import TableComponent from "../../../components/TableComponent";

export default function BillOfQuantity() {
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
      index: "Item",
      task: "Site Clearing",
      duration: "2 days",
      start: "20/3/2020",
      end: "20/3/3003",
      status: "approved",
    },
    {
      index: "Item",
      task: "Site Clearing",
      duration: "3 days",
      start: "20/3/2020",
      end: "20/3/3003",
      status: "approved",
    },
  ];

  const dataKeyAccessors = ["index", "task", "duration", "start", "end", "status"];

  const columns = [
    "S/N",
    "Task/Activities",
    "Duration",
    "Start Date",
    "Finish Date",
    "Status",
  ];

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
