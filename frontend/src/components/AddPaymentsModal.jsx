import React from "react";
import AppModal from "./AppModal";
import UploadIcon from "../assests/upload.svg";
import houseIcon from "../assests/house-damage.svg";
import UploadButton from "./UploadButton";
import TextInput from "./TextInput";
import { Button } from "@mui/material";

export default function AddPaymentsModal({ setIsOpen, modalIsOpen }) {

  const options = [
    { label: "Gwarinpa", value: 2 },
    { label: "Gwagwalada", value: 5 },
    { label: "Kubwa", value: 3 },
    { label: "Nicpe", value: 4 },
  ];


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

  const handleInputChange = (e) => {
    console.log(e);
  };

  return (
    <div>
      <AppModal
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
        title={"Enter New Payment"}
      >
        <div className="flex flex-col">
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
          <div className="w-[100%] flex items-end gap-4">
            <div className="w-1/2">
              <TextInput
                required
                value={"propertyName"}
                label={"Phone Number"}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-1/2">
              <TextInput
                className="h-[70px]"
                required
                id="outlined-required"
                label="Email Address Required"
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
          <UploadButton
            leftIcon={houseIcon}
            rightIcon={UploadIcon}
            text="Upload Property Photo"
            handleOnChange={handleFileUploadChange}
          />
          <div className="flex justify-end">
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
    </div>
  );
}
