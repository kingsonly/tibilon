import React from "react";
import TableComponent from "../../components/TableComponent";
import BreadCrumb from "../../components/BreadCrumb";
import { useLocation } from "react-router-dom";
import { Typography } from "@mui/material";

export default function PaymentSchedule() {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const { state } = useLocation();

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
    "index",
    "Contractor/Vendor",
    "Amount(₦)",
    "Due Date",
    "Amount Paid (₦)",
    "Actual Pay day",
    "Balance",
    "View",
  ];

  const breadCrumbs = [
    {
      name: "Project Actions",
      link: `/projects/actions/${state?.id}/${state?.name}`,
    },
    {
      name: "Payment Schedule",
      link: "#",
    },
  ];

  return (
    <div className="p-[47px] bg-white">
      <BreadCrumb breadCrumbs={breadCrumbs} />
      <Typography variant="h3">Coming Soon </Typography>
      {/* <TableComponent
        actionText="Upload Data"
        columns={columns}
        data={data}
        action={openModal}
        searchFunction={searchFunction}
        paginationChange={paginationChange}
        dataKeyAccessors={dataKeyAccessors}
      /> */}
    </div>
  );
}
