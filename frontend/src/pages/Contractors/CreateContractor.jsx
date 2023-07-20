import React from "react";
import SubPageName from "../../components/SubPageName";
import TextInput from "../../components/TextInput";
import UploadButton from "../../components/UploadButton";
import UploadIcon from "../../assests/upload.svg";
import houseIcon from "../../assests/house-damage.svg";
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
  {
    index: 1,
    name: "Alh. Musa Bawa",
    address: "1 Masarki Close Wuse 2",
    mobile: "080312345678",
    description: "4 Bedroom Terrace Duplex",
    location: "Guzape",
    price: "80,000,000",
    action: "view",
  },
  {
    index: 1,
    name: "Alh. Musa Bawa",
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

export default function CreateContractor() {
  const handleFileUploadChange = (e) => {
    try {
      const files = e.target.files || [];

      console.log(files, "files__");

      if (files.length == 0) {
        return;
      }

      const data = new FormData();
      data.append("file", files[0]);
      console.log(data, "upload-file");
    } catch (err) {
      console.log(err, "eoror");
    }
  };
  return (
    <div className="bg-white p-[47px]">
      <SubPageName name="Enter Contract Details" />

      <div className="w-[100%] flex items-end gap-4">
        <div className="w-1/2">
          <TextInput
            required
            value={"propertyName"}
            label={"Contractor Name"}
            onChange={(e) => console.log(e)}
          />
        </div>
        <div className="w-1/2">
          <TextInput
            className="h-[70px]"
            required
            id="outlined-required"
            label="Contractor ID"
            defaultValue="Email Address"
            onChange={(e) => {
              console.log(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="w-[100%] flex items-end gap-4">
        <div className="w-1/2">
          <TextInput
            required
            value={"Company"}
            label={"Company"}
            onChange={(e) => console.log(e)}
          />
        </div>
        <div className="w-1/2">
          <TextInput
            className="h-[70px]"
            required
            id="outlined-required"
            label="Phone Number"
            defaultValue="Phone Number"
            onChange={(e) => {
              console.log(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="w-[100%] flex items-end gap-4">
        <div className="w-1/2">
          <TextInput
            required
            value={"Source"}
            label={"Scource"}
            onChange={(e) => console.log(e)}
          />
        </div>
        <div className="w-1/2">
          <TextInput
            className="h-[70px]"
            required
            id="outlined-required"
            label="Email"
            defaultValue="Email Address"
            onChange={(e) => {
              console.log(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="w-[100%] flex items-end gap-4">
        <div className="w-1/2">
          <TextInput
            required
            value={"Contract Type"}
            label={"Contract Type"}
            onChange={(e) => console.log(e)}
          />
        </div>
        <div className="w-1/2">
          <TextInput
            className="h-[70px]"
            required
            id="outlined-required"
            label="Business/Dept"
            defaultValue="Business/Dept"
            onChange={(e) => {
              console.log(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="w-[100%] flex items-end gap-4">
        <div className="w-1/2">
          <TextInput
            required
            value={"Status"}
            label={"Status"}
            onChange={(e) => console.log(e)}
          />
        </div>
        <div className="w-1/2">
          <TextInput
            className="h-[70px]"
            required
            id="outlined-required"
            label="Contract Title"
            defaultValue="Contract Title"
            onChange={(e) => {
              console.log(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="w-[100%] flex items-end gap-4">
        <div className="w-1/2">
          <TextInput
            required
            value={"Contract Start Date"}
            label={"Contract Start Date"}
            onChange={(e) => console.log(e)}
          />
        </div>
        <div className="w-1/2">
          <TextInput
            className="h-[70px]"
            required
            id="outlined-required"
            label="Contract End Date"
            defaultValue="Contract End Date"
            onChange={(e) => {
              console.log(e.target.value);
            }}
          />
        </div>
      </div>
      <SubPageName name="Projects Info" />
      <div className="w-[100%] flex items-end gap-4">
        <div className="w-1/2">
          <TextInput
            required
            value={"propertyName"}
            label={"Contractor Name"}
            onChange={(e) => console.log(e)}
          />
        </div>
        <div className="w-1/2">
          <div className="flex justify-between">
            <TextInput
              className="h-[70px]"
              required
              id="outlined-required"
              label="Contractor ID"
              defaultValue="Email Address"
              onChange={(e) => {
                console.log(e.target.value);
              }}
            />
            <TextInput
              className="h-[70px]"
              required
              id="outlined-required"
              label="Contractor ID"
              defaultValue="Email Address"
              onChange={(e) => {
                console.log(e.target.value);
              }}
            />
          </div>
        </div>
      </div>
      <SubPageName name="Financials" />
      <div className="w-[100%] flex items-end gap-4">
        <div className="w-1/2">
          <TextInput
            required
            value={"Contract Amount"}
            label={"Contract Amount"}
            onChange={(e) => console.log(e)}
          />
        </div>
        <div className="w-3/4">
          <TextInput
            className="h-[70px]"
            required
            id="outlined-required"
            label="Project/Location"
            defaultValue="Project/Location"
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
            label="Payment Mode"
            defaultValue="Payment Mode"
            onChange={(e) => {
              console.log(e.target.value);
            }}
          />
        </div>
      </div>

      <div className="border-2 p-2 rounded">
        <SubPageName name="File Attachments" />
        <div className="w-[100%] flex items-end gap-4">
          <div className="w-1/2">
            <TextInput
              required
              value={"File Type"}
              label={"File Type"}
              onChange={(e) => console.log(e)}
            />
          </div>
          <div className="w-3/4">
            <TextInput
              className="h-[70px]"
              required
              id="outlined-required"
              label="File Category"
              defaultValue="Aggreement"
              onChange={(e) => {
                console.log(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="w-[100%] flex items-end gap-4">
          <div className="w-1/2">
            <TextInput
              required
              value={"File Type"}
              label={"File Type"}
              onChange={(e) => console.log(e)}
            />
          </div>
          <div className="w-1/2">
            <UploadButton
              text="Upload Property Photo"
              leftIcon={houseIcon}
              rightIcon={UploadIcon}
              handleOnChange={handleFileUploadChange}
            />
          </div>
        </div>
        <Button
          style={{
            border: " 1px solid green",
            background: "white",
            color: "green",
          }}
        >
          Update
        </Button>
      </div>

      <SubPageName name="Attached Files View" />
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

      <SubPageName name="Note/Comments" />
      <div className="w-[100%] flex items-end gap-4">
        <textarea
          className="border-2 p-4"
          id="w3review"
          name="w3review"
          rows="8"
          cols="200"
        >
         The way up is down, hmmm
        </textarea>
      </div>
    </div>
  );
}
