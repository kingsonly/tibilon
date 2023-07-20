import React from "react";
import TableComponent from "../../components/TableComponent";
import TextInput from "../../components/TextInput";
import { Button } from "@mui/material";
import AppModal from "../../components/AppModal";

export default function ProjectTasks() {
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
    <div className="bg-white p-4">
      <AppModal
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
        title={"Enter New Property"}
      >
        <div className="flex flex-col">
          <TextInput
            className="h-[70px] mt-6"
            required
            id="outlined-required"
            label="Property Description Required"
            defaultValue="Property Description"
            onChange={(e) => {
              console.log(e.target.value);
            }}
          />
          <div className="w-[100%] flex items-end gap-4">
            <div className="w-1/2">
              <TextInput
                className="h-[70px]"
                required
                id="outlined-required"
                label="Property Description Required"
                defaultValue="Property Description"
                onChange={(e) => {
                  console.log(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="w-[100%] flex items-end gap-4">
            <div className="w-1/2">
              <TextInput
                className="h-[70px]"
                required
                id="outlined-required"
                label="Unit Price Required"
                defaultValue="Unit Price Required"
                onChange={(e) => {
                  console.log(e.target.value);
                }}
              />
            </div>
            <div className="w-1/2">
              <TextInput
                className="h-[70px]"
                required
                id="outlined-required"
                label="No of Units Required"
                defaultValue="No of Units Required"
                onChange={(e) => {
                  console.log(e.target.value);
                }}
              />
            </div>
          </div>
          <TextInput
            className="h-[70px]"
            required
            id="outlined-required"
            label="Property Addresses"
            defaultValue="Property Addresses"
            onChange={(e) => {
              console.log(e.target.value);
            }}
          />
          <TextInput
            className="h-[70px]"
            required
            id="outlined-required"
            label="Property Status"
            defaultValue="Property Status"
            onChange={(e) => {
              console.log(e.target.value);
            }}
          />
          <div className="flex justify-between">
            <Button style={{ backgroundColor: "#CCCCCC" }} variant="contained">
              Add Address
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={() => setIsOpen(false)}
            >
              Save
            </Button>
          </div>
        </div>
      </AppModal>
      <div className="font-bold text-[20px]">Project Tasks</div>

      <TableComponent
        actionText="Add New Task"
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
