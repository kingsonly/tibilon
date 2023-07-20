import React from "react";
import TableComponent from "../../components/TableComponent";
export default function Users() {
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
      index: 1,
      vendor: "A",
      amount: 300,
      dueDate: "14,057,750.00",
      amountPaid: 400,
      actualAmount: 4000,
      balance: 300,
      view: "",
    },
    {
      index: 1,
      vendor: "A",
      amount: 300,
      dueDate: "14,057,750.00",
      amountPaid: 400,
      actualAmount: 4000,
      balance: 300,
      view: "",
    },
    {
      index: 1,
      vendor: "A",
      amount: 300,
      dueDate: "14,057,750.00",
      amountPaid: 400,
      actualAmount: 4000,
      balance: 300,
      view: "",
    },
  ];

  const dataKeyAccessors = [
    "index",
    "vendor",
    "amount",
    "dueDate",
    "amountPaid",
    "actualAmount",
    "balance",
    "view",
  ];

  const columns = [
    "Index",
    "Contractor/Vendor",
    "Amount(₦)",
    "Due Date",
    "Amount Paid (₦)",
    "Actual Pay day",
    "Balance",
    "View",
  ];

  return (
    <div className="p-[47px] bg-white">
      <div className="font-bold text-[30px] text-left">  Users Details</div>
      <hr className="mb-8 mt-3"/>
      <TableComponent
        actionText="Add Users"
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
