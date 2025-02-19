import { Button } from "@mui/material";
import React, { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TableComponent from "./TableComponent";
import { imageBaseUrl } from "../services/apiservices/urls";

import { BsReceipt } from "react-icons/bs";
import axios from "axios";
export default function PropertyClientInfo({ payments, projectId, property }) {
  const navigate = useNavigate();
  

  return (
    <Fragment>
      {" "}
      <div>
        <div className="text-[#D7B569] font-bold text-[23px]">
          Agent Information
        </div>
        <div
          className="flex justify-between items-center mb-10"
          style={{
            boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
            padding: "23px",
          }}
        >
          {property?.agent == null ? ( 
            <>No Agent Available</>
          ) : (
            <>
              <div className="flex flex-col gap-4"> 
                <div className="flex gap-5 items-center">
                  <div className="font-bold text-[18px]">Name:</div>
                  <div className="font-light text-[17px]">
                    {property?.agent?.lastname} {property?.agent?.firstname}
                  </div>
                </div>
                <div className="flex gap-5 items-center">
                  <div className="font-bold text-[18px]">Email:</div>
                  <div className="font-light text-[17px]">
                    {property?.agent?.email}
                  </div>
                </div>
              </div>
              <div></div>
            </>
          )}
        </div>

        <div className="text-[#D7B569] font-bold text-[23px]">
          Client Information
        </div>
        <div
          className="flex justify-between items-center"
          style={{
            boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
            padding: "23px",
          }}
        >
          {property?.client == null ? (
            <>
              No Client Available
            </>
          ) : (
            <>
              <div className="flex flex-col gap-4">
                <div className="flex gap-5 items-center">
                  <div className="font-bold text-[18px]">Name:</div>
                  <div className="font-light text-[17px]">
                    {property?.client?.name}
                  </div>
                </div>
                <div className="flex gap-5 items-center">
                  <div className="font-bold text-[18px]">Address:</div>
                  <div className="font-light text-[17px]">
                    {property?.client?.address?.full_address}
                  </div>
                </div>
                <div className="flex gap-5 items-center">
                  <div className="font-bold text-[18px]">Email:</div>
                  <div className="font-light text-[17px]">
                    {property?.client?.email}
                  </div>
                </div>
                <div className="flex gap-5 items-center">
                  <div className="font-bold text-[18px]">Phone No:</div>
                  <div className="font-light text-[17px]">
                    {property?.client?.phone}
                  </div>
                </div>
              </div>
              <div>
                <div className="w-[155px] h-[197px] mb-5">
                  <img
                    className="w-[100%] h-[100%] object-contain"
                    src={`${property?.client?.image}`}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Fragment>
  );
}
