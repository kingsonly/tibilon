import React from "react";
import TextInput from "../../../../components/TextInput";
import UploadButton from "../../../../components/UploadButton";
import houseIcon from "../../../../assests/house-damage.svg";
import plusIcon from "../../../../assests/plus-icon.svg";
import { AiFillCloseCircle } from "react-icons/ai";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Form2({
  error,
  handleOnChange,
  amount,
  modeOfPayment,
  allProperties,
  property,
  setProofOfPaymentPreview,
  setproofOfPayment,
  proofOfPaymentPreview,
  proofOfPayment,
  submit,
  updateStage,
  loading,
}) {
  const modeOfPayments = [
    { label: "Transfer", value: "transfer" },
    { label: "Card", value: "card" },
    { label: "Bank", value: "bank" },
  ];

  const navigate = useNavigate();

  return (
    <div className="bg-[white] p-10">
      <div className="flex gap-4 items-center">
        {/* <div className="w-1/2">
          <TextInput
            className="h-[70px] mt-6"
            required
            type="select"
            id="outlined-required"
            label="Property"
            error={error["property"]}
            // defaultValue="Property Description"
            onChange={(e) => {
              handleOnChange(e, "property");
            }}
            options={allProperties?.map((propty) => ({
              value: propty?.id,
              label: propty?.name,
            }))}
            value={property}
          />
        </div> */}

        <div className="w-1/2">
          <TextInput
            className="h-[70px] mt-6"
            required
            id="outlined-required"
            label="Amount"
            error={error["amount"]}
            type="number"
            // defaultValue="Property Description"
            onChange={(e) => {
              handleOnChange(e, "amount");
            }}
            value={amount}
          />
        </div>
        <div className="w-1/2 items-center">
          {" "}
          <TextInput
            className="h-[70px] mt-6"
            required
            type="select"
            id="outlined-required"
            label="Mode of Payment"
            error={error["modeOfPayment"]}
            // defaultValue="Property Description"
            onChange={(e) => {
              handleOnChange(e, "modeOfPayment");
            }}
            options={modeOfPayments}
            value={modeOfPayment}
          />
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <div className="w-[100%]">
          <UploadButton
            leftIcon={houseIcon}
            rightIcon={plusIcon}
            text="Upload Proof of Payment"
            handleOnChange={(e) => {
              handleOnChange(e, "proofOfPayment");
            }}
          />
        </div>
      </div>
      <div className="flex gap-4">
        <div>
          {proofOfPaymentPreview && (
            <div className="relative w-[200px] bg-gray-200 p-3">
              <button
                className="absolute top-0 right-0 text-gray-600 hover:text-gray-800"
                onClick={() => {
                  setProofOfPaymentPreview();
                  setproofOfPayment("");
                }}
              >
                <AiFillCloseCircle className="text-[20px]" />
              </button>
              <p>
                <img
                  className="w-[100%] h-[100%]"
                  src={proofOfPaymentPreview}
                  alt="project-image"
                />
              </p>
            </div>
          )}
        </div>
      </div>


      <Button
        // className="h-[67px] text-[white] bg-[#40A74E] w-[320px]"
        style={{
          backgroundColor: "gray",
          color: "white",
          width: "150px",
          height: "50px",
          marginTop: "10px",
          marginRight: "20px"
        }}
        variant="contained"
        onClick={() => navigate(-1)}
      >
        Back
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
        onClick={() => submit()}
      >
        {loading ? "submitting..." : "Submit"}
      </Button>
    </div>
  );
}
