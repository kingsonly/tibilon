import React from "react";
import AddBudgetModal from "../../../components/AddBudgetModal";
import AddEmployeeModalDetails from "../../../components/AddEmployeeModalDetails";
import AppModal from "../../../components/AppModal";
import TableComponent from "../../../components/TableComponent";

export default function GenerateBudget() {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [openViewInfo, SetOpenViewInfo] = React.useState(false);
  const [budgetDetails, SetBudgetDetails] = React.useState({});
  const [readOnly, setReadOnly] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  const handleViewClick = (data, isView) => {
    if (isView) {
      setReadOnly(true)
    } 
    SetBudgetDetails(data)
    SetOpenViewInfo(true);
  };

  const searchFunction = () => {
    //Api call to search and update table data
    alert("Fetching search....");
  };

  const paginationChange = (page) => {
    //Api call to paginate and update table data
    alert(`Paginating....page ${page}`);
  };

  function setView() {
    SetOpenViewInfo(false);
  }

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
      <AppModal
        setIsOpen={setView}
        modalIsOpen={openViewInfo}
      >
        <AddBudgetModal 
        data={budgetDetails}      
        readOnly={readOnly}
        />
      </AppModal>

      <TableComponent
        actionText="Create New Budget"
        columns={columns}
        data={data}
        action={openModal}
        searchFunction={searchFunction}
        paginationChange={paginationChange}
        dataKeyAccessors={dataKeyAccessors}
        viewAction={handleViewClick}
        editAction={handleViewClick}
      />
    </div>
  );
}
