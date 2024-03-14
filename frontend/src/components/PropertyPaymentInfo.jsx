import { Button } from "@mui/material";
import React, { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TableComponent from "./TableComponent";
import { imageBaseUrl } from "../services/apiservices/urls";

import { BsReceipt } from "react-icons/bs";
import axios from "axios";
export default function PropertyPaymentInfo({ payments, projectId, property }) {
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
    console.log(id);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/user/paymentreceipt/${id}`
      );
      const url = window.URL.createObjectURL(new Blob([response.data.pdf_url]));
      const link = document.createElement("a");
      link.target = "_blank";
      link.href =
        "https://api.tibilon.skillzserver.com/" + response.data.pdf_url;
      link.setAttribute("download", "receipt.pdf");
      document.body.appendChild(link);
      link.click();
      console.log(response.data);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
    // var token = localStorage.getItem("token");
    // try {

    //   const response = await axios.get(
    //     `${process.env.REACT_APP_API_URL}/user/paymentreceipt/${id}`
    //   );

    // } catch (error) {
    //   console.error(error);
    // }
  };

  return (
    <Fragment>
      {" "}
      <div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
  <Button
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


      </div>
      <div className="mt-[30px]">
        {" "}
        <div className="text-[#D7B569] font-bold text-[23px]">
          Payment Information
        </div>
        {property?.payment.length == 0 ? (
          <>No Payment Information</>
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
            hasCustomIcon={<BsReceipt className="cursor-pointer" />}
            hasCustomAction={getReciept}
          />
        )}
      </div>
    </Fragment>
  );
}
