import React from "react";
import TextInput from "../../components/TextInput";
import { Button } from "@mui/material";
import TableComponent from "../../components/TableComponent";


const data = [
    {
      index: 1,
      name: "Toks joww",
      address: "1 Masarki Close Wuse 2",
      mobile: "080312345678",
      description: "4 Bedroom Terrace Duplex",
      location: "Guzape",
      price: "80,000,000",
      action: "view",
    },
    {
      index: 1,
      name: "Micahel Hiwwk",
      address: "12 Dalaba Street, Lugbe",
      mobile: "080312345678",
      description: "2 Bedroom Block of Flats",
      location: "Jahi",
      price: "75,000,000",
      action: "view",
    },
    {
      index: 1,
      name: "Mrs jay Audu",
      address: "1 Masarki Close Wuse 2",
      mobile: "080312345678",
      description: "4 Bedroom Terrace Duplex",
      location: "Guzape",
      price: "80,000,000",
      action: "view",
    },

  ];
  
  const columns = [
    "S/No",
    "Client Name",
    "Address",
    "Phone No",
    "Property Type",
  
    "Location",
    "Price(₦)",
    "Payments",
  ];
  
  const dataKeyAccessors = [
    "index",
    "name",
    "address",
    "mobile",
    "description",
    "location",
    "price",
    "action",
  ];

export default function NewRequisition() {
  const options = [
    { label: "Gwarinpa", value: 2 },
    { label: "Gwagwalada", value: 5 },
    { label: "Kubwa", value: 3 },
    { label: "Nicpe", value: 4 },
  ];


  return (
    <div
      style={{ height: "max-content" }}
      className="border-4 h-screen h-[100%] pb-56"
    >
      <div className="flex bg-white justify-between">
        <div
          style={{ height: "max-content" }}
          className="flex flex-col border-r-4 w-1/2 p-6"
        >
          <div className="mb-6">New Requisition Form</div>
          <div className="w-[100%]">
            <TextInput
              className="h-[70px] mt-6 w-[100%]"
              required
              id="outlined-required"
              label="Requisition Number"
              // defaultValue="Property Description"
              onChange={(e) => {
                console.log(e.target.value);
              }}
            />
          </div>
          <div className="w-[100%]">
            <TextInput
              className="h-[70px] mt-6 w-[100%]"
              required
              id="outlined-required"
              label="Requested By"
              // defaultValue="Property Description"
              onChange={(e) => {
                console.log(e.target.value);
              }}
            />
          </div>
          <div className="w-[100%]">
            <TextInput
              className="h-[70px] mt-6 w-[100%]"
              required
              id="outlined-required"
              label="Company Name"
              // defaultValue="Property Description"
              onChange={(e) => {
                console.log(e.target.value);
              }}
            />
          </div>
          <div>
            <TextInput
              className="h-[70px] mt-6"
              required
              id="outlined-required"
              label="Select Client"
              defaultValue="Select Client"
              onChange={(e) => {
                console.log(e.target.value);
              }}
              isSelect={true}
              options={options}
            />
          </div>
          <div>
            <TextInput
              className="h-[70px] mt-6"
              required
              id="outlined-required"
              label="Department"
              defaultValue="Department"
              onChange={(e) => {
                console.log(e.target.value);
              }}
              isSelect={true}
              options={options}
            />
          </div>
          <div>
            <TextInput
              className="h-[70px] mt-6"
              required
              id="outlined-required"
              label="Purchase"
              defaultValue="Purchase"
              onChange={(e) => {
                console.log(e.target.value);
              }}
              isSelect={true}
              options={options}
            />
          </div>
          <div className="w-[100%]">
            <TextInput
              className="h-[70px] mt-6 w-[100%]"
              required
              id="outlined-required"
              label="Location"
              // defaultValue="Property Description"
              onChange={(e) => {
                console.log(e.target.value);
              }}
            />
          </div>
          <div className="flex gap-4">
            <div className="w-1/2">
              <TextInput
                className="h-[70px] mt-6"
                required
                id="outlined-required"
                label="Currency"
                defaultValue="N"
                onChange={(e) => {
                  console.log(e.target.value);
                }}
                isSelect={true}
                options={options}
              />
            </div>
            <div className="w-1/2">
              <TextInput
                className="h-[70px] mt-6"
                required
                id="outlined-required"
                label="Priority"
                defaultValue="High"
                onChange={(e) => {
                  console.log(e.target.value);
                }}
                isSelect={true}
                options={options}
              />
            </div>
          </div>
          <div className="w-[100%]">
            <TextInput
              className="h-[70px] mt-6 w-[100%]"
              required
              id="outlined-required"
              label="LOCATION"
              // defaultValue="Property Description"
              onChange={(e) => {
                console.log(e.target.value);
              }}
            />
          </div>
        </div>
        {/* // COLUMN 2 */}
        <div className="w-1/2 p-6">
          <div className="mb-6">Add New Requisition Items</div>
          <div className="flex gap-4">
            <div className="w-1/2">
              {" "}
              <TextInput
                className="h-[70px] mt-6"
                required
                id="outlined-required"
                label="Client Name"
                // defaultValue="Property Description"
                onChange={(e) => {
                  console.log(e.target.value);
                }}
              />
            </div>
            <div className="w-1/2">
              {" "}
              <TextInput
                className="h-[70px] mt-6"
                required
                id="outlined-required"
                label="Client Name"
                // defaultValue="Property Description"
                onChange={(e) => {
                  console.log(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-1/2">
              {" "}
              <TextInput
                className="h-[70px] mt-6"
                required
                id="outlined-required"
                label="Client Name"
                // defaultValue="Property Description"
                onChange={(e) => {
                  console.log(e.target.value);
                }}
              />
            </div>
            <div className="w-1/2">
              {" "}
              <TextInput
                className="h-[70px] mt-6"
                required
                id="outlined-required"
                label="Client Name"
                // defaultValue="Property Description"
                onChange={(e) => {
                  console.log(e.target.value);
                }}
              />
            </div>
            <div>
              {" "}
              <Button
                style={{
                  background: "green",
                  color: "white",
                }}
              >
                Add Item
              </Button>
            </div>
          </div>
          <div>
        <TableComponent
          actionText="Add New Contractor"
          columns={columns}
          data={data}
          // action={showCreationCreate}
          // searchFunction={searchFunction}
          // paginationChange={paginationChange}
          dataKeyAccessors={dataKeyAccessors}
        />
      </div>
        </div>
      </div>
      <div className="mt-4">
        <Button
          style={{
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            border: "2px solid #40A74E",
            color: "#40A74E",
            width: "507px",
          }}
        >
          Save
        </Button>
      </div>
    </div>
  );
}
