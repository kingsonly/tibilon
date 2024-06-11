import React from "react";
import TextInput from "../../../../components/TextInput";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Form1(props) {
  const {
    handleOnChange,
    error,
    client,
    agent,
    agentType,
    paymentFrequency,
    allClients,
    allAgents,
    updateStage,
    commisions
  } = props;


  const paymentFrequencies = [
    { label: "One-Off", value: 0 },
    { label: "Monthly", value: 1 },
    { label: "Quarterly", value: 2 },
  ];

  const agentTypes = [
    { label: "Employee", value: 0 },
    { label: "Affiliate", value: 1 },
  ];

  const navigate = useNavigate();
  return (
    <div className="bg-[white] p-10">
      <div className="">
        <TextInput
          className="h-[70px] mt-6"
          required
          type="select"
          id="outlined-required"
          label="Client"
          // error={error ?? ["client"]}
          // defaultValue="Property Description"
          onChange={(e) => {
            handleOnChange(e, "client");
          }}
          options={allClients?.map((client) => ({
            value: client?.id,
            label: client?.name,
          }))}
          value={client}
        />
      </div>
      <div className="flex gap-4 items-center">
        <div className="w-1/2">
          <TextInput
            className="h-[70px] mt-6"
            required
            type="select"
            id="outlined-required"
            label="Agent Type"
            // error={error ?? ["agentType"]}
            // defaultValue="Property Description"
            onChange={(e) => {
              handleOnChange(e, "agentType");
            }}
            options={agentTypes}
            value={agentType}
          />
        </div>

        <div className="w-1/2">
          {" "}
          <TextInput
            className="h-[70px] mt-6"
            required
            type="select"
            id="outlined-required"
            label="Agent"
            // error={error ?? ["agent"]}
            // defaultValue="Property Description"
            onChange={(e) => {
              handleOnChange(e, "agent");
            }}
            options={allAgents?.map((agent) => ({
              value: agent?.id,
              label: agent?.name,
            }))}
            value={agent}
          />
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <div className="w-1/2">
          {" "}
          <TextInput
            className="h-[70px] mt-6"
            required
            type="select"
            id="outlined-required"
            label="Payment Frequency"
            // error={error ?? ["paymentFrequency"]}
            // defaultValue="Property Description"
            onChange={(e) => {
              handleOnChange(e, "paymentFrequency");
            }}
            options={paymentFrequencies}
            value={paymentFrequency}
          />
        </div>

        <div className="w-1/2">
          {" "}
          <TextInput
            className="h-[70px] mt-6"
            required
   
            id="outlined-required"
            label="Commisions"
            type="number"
            // error={error ?? ["commisions"]}
            // defaultValue="Property Description"
            onChange={(e) => {
              handleOnChange(e, "commisions");
            }}
   
            value={commisions}
          />
        </div>
      </div>

      <Button
        // className="h-[67px] text-[white] bg-[#40A74E] w-[320px]"
        style={{
          backgroundColor: "red",
          color: "white",
          width: "150px",
          height: "50px",
          marginTop: "10px",
          marginRight: "20px"
        }}
        variant="contained"
        onClick={() => navigate(-1)}
      >
        Cancel
      </Button>

      <Button
        // className="h-[67px] text-[white] bg-[#40A74E] w-[320px]"
        style={{
          backgroundColor: "#40A74E",
          color: "white",
          width: "150px",
          height: "50px",
          marginTop: "10px",
        }}
        variant="contained"
        onClick={() => updateStage(1)}
      >
        Next
      </Button>
    </div>
  );
}
