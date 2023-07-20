import React from "react";
import TextInput from "../../../components/TextInput";
import { Button } from "@mui/material";

export default function DateUserTypes() {
  const options = [
    { label: "Gwarinpa", value: 2 },
    { label: "Gwagwalada", value: 5 },
    { label: "Kubwa", value: 3 },
    { label: "Nicpe", value: 4 },
  ];
  return (
    <div className="flex flex-col justify-center items-center">
      <div style={{ width: "70%" }} className="h-[70px] mt-6 max-w-[100%]">
        <TextInput
          className="h-[70px] mt-6"
          required
          id="outlined-required"
          label="Booking Type"
          defaultValue="Company Owned"
          onChange={(e) => {
            console.log(e.target.value);
          }}
          isSelect={true}
          options={options}
        />
      </div>

      <div style={{ width: "70%" }} className="h-[70px] mt-6 max-w-[100%]">
        {" "}
        <TextInput
          className="h-[70px] mt-6"
          required
          id="outlined-required"
          label="Select Date"
          defaultValue="Select Client"
          onChange={(e) => {
            console.log(e.target.value);
          }}
          isSelect={true}
          options={options}
        />
      </div>
      <div style={{ width: "70%" }} className="h-[70px] mt-6 max-w-[100%]">
        {" "}
        <TextInput
          className="h-[70px] mt-6"
          required
          id="outlined-required"
          label="User Type"
          defaultValue="Concrete"
          onChange={(e) => {
            console.log(e.target.value);
          }}
          isSelect={true}
          options={options}
        />
      </div>

      <Button style={{ background: "green", color: "white", marginTop:"4rem" }}>Next</Button>
    </div>
  );
}
