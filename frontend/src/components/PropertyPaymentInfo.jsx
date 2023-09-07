import { Button } from "@mui/material";
import React, { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TableComponent from "./TableComponent";
import { imageBaseUrl } from "../services/apiservices/urls";


import {
  AiFillDelete,
  AiFillEdit,
  AiFillEye,
  AiOutlineSearch,
} from "react-icons/ai";
import axios from "axios";
export default function PropertyPaymentInfo({ payments, projectId, property, }) {

  const navigate = useNavigate();
  const [firstTimePayment, setfirstTimePayment] = React.useState(true);

  useEffect(() => {
    property?.payment?.map((pymt, index) => {
      pymt["index"] = index + 1;
      pymt["CTA"] = "CTA";
      //
    });

    if (property?.payment?.length > 0 && property?.payment !== undefined) {
      setfirstTimePayment(false);
    }
  }, []);

  const dataKeyAccessors = [
    "index",
    "amount",
    "mode_of_payment",
    "payment_type",
    "created_at",
    "CTA",
  ];
  const columns = [
    "S/N",
    "amount",
    "mode_of_payment",
    "Payment Type",
    "Payment Data",
    "action",
  ];

  const getReciept = async (id) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/paymentreceipt/${id}`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'receipt.pdf');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
    // var token = localStorage.getItem("token");
    // try {
      
    //   const response = await axios.get(
    //     `${process.env.REACT_APP_API_URL}/user/paymentreceipt/${id}`
    //   );
      
    // } catch (error) {
    //   console.error(error);
    // }

  }

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
              <Button
                // className="h-[67px] text-[white] bg-[#40A74E] w-[320px]"
                style={{
                  backgroundColor: "#40A74E",
                  color: "white",
                  width: "155px",
                  height: "44px",
                }}
                variant="contained"
                onClick={() => {
                  navigate(
                    `/projects/${projectId}/actions/project-properties/details/payments/${firstTimePayment}/${property?.id}`
                  );
                }}
              >
                Add Payments
              </Button>
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
                    src={`${imageBaseUrl}${property?.client?.image}`}
                  />
                </div>
                <Button
                  // className="h-[67px] text-[white] bg-[#40A74E] w-[320px]"
                  style={{
                    backgroundColor: "#40A74E",
                    color: "white",
                    width: "155px",
                    height: "44px",
                  }}
                  variant="contained"
                  onClick={() => {
                    navigate(
                      `/projects/${projectId}/actions/project-properties/details/payments/${firstTimePayment}/${property?.id}`
                    );
                  }}
                >
                  Add Payments
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="mt-[30px]">
        {" "}
        <div className="text-[#D7B569] font-bold text-[23px]">
          Payment Information
        </div>
        {property?.payment.length == 0 ? (
          <>No Client Available</>
        ) : (
          <TableComponent
            actionText={null}
            columns={columns}
            data={property?.payment}
            // action={openModal}
            // searchFunction={searchFunction}
            // paginationChange={paginationChange}
            dataKeyAccessors={dataKeyAccessors}
            hasCustom={true}
            hasCustomIcon={<AiFillDelete />}
            hasCustomAction={getReciept}
          />
        )}
      </div>
    </Fragment>
  );
}
