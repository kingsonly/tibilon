import React from "react";
import AddBudgetModal from "../../../components/AddBudgetModal";
import TableComponent from "../../../components/TableComponent";

export default function GenerateBudget() {
  const [modalIsOpen, setIsOpen] = React.useState(false);
//   const [openBudgetModal, setOpenBudgetModal] = React.useState(false);

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
      index: 1,
      budgetName: "Budget 1 (Substructure)"
    },
    {
      index: 2,
      budgetName: "Budget 2 (Superstructure)"
    }
  ];

  const dataKeyAccessors = ["index", "budgetName", "CTA"];

  const columns = ["S/N", "Budget Name", "Action"];

  return (
    <div>
        <AddBudgetModal setIsOpen={setIsOpen} modalIsOpen={modalIsOpen}   />
      <TableComponent
        actionText="Create New Budget"
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
