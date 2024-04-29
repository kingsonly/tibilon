import { Button } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TableComponent from "./TableComponent";
import { imageBaseUrl } from "../services/apiservices/urls";

import { BsReceipt } from "react-icons/bs";
import axios from "axios";
import AppModal from "./AppModal";
import { ToastContainer, toast } from "react-toastify";
import { token } from "../config";
import EditPropertyPaymentModal from "./EditPropertyPaymentModal";

export default function PropertyPaymentInfo({ payments, projectId, property }) {
  const navigate = useNavigate();
  const [firstTimePayment, setfirstTimePayment] = React.useState(true);
  const [modalViewIsOpen, setIsViewOpen] = React.useState(false);
  const [modalIsEditOpen, setIsEditOpen] = React.useState(false);
  const [viewData, setViewData] = useState();

  function fetchPropertyPayment(){
    property?.payment?.map((pymt, index) => {
      pymt["index"] = index + 1;
      pymt["CTA"] = "CTA";
      //
    });

    if (property?.payment?.length > 0 && property?.payment !== undefined) {
      setfirstTimePayment(false);
    }

  }

  useEffect(() => {

    

  fetchPropertyPayment()
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
    "Amount",
    "Mode of payment",
    "Payment Type",
    "Payment Date",
    "Action",
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
      link.href = response.data.pdf_url;
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

  function viewAction(row) {
    setIsViewOpen(true);

    setViewData(row)
  }

  function editAction(row) {
    setIsEditOpen(true);

    setViewData(row)
  }

  const deleteAction = async (unit) => {
    try { 

      const res = await axios.delete(
        `${process.env.REACT_APP_API_URL}/property/deletepayment/${unit.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(`${res?.data?.status || res.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: false,
      });

      fetchPropertyPayment()

      location.reload()
     
      console.log(res);
    } catch (error) {
      toast.error(`${error?.response?.data?.message || error.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: false,
      });
    }
  };

  return (
    <Fragment>
 <ToastContainer />
<AppModal
        modalIsOpen={modalIsEditOpen}
        setIsOpen={setIsEditOpen}
        title={"Edit Property Payment"}
      >
        <EditPropertyPaymentModal setIsOpen={setIsEditOpen} data={viewData}/>
      </AppModal>

      <AppModal
        modalIsOpen={modalViewIsOpen}
        setIsOpen={setIsViewOpen}
        title={"View Property Payment Details"}
      >
        <div className="flex flex-col">
            
      <h2 style={{fontSize: '25px'}}>Payment Information</h2><br />
      <p>Amount: {viewData && viewData.amount}</p>
      <p>Payment Type: {viewData && viewData.payment_type}</p>
      <p>Status: {viewData && viewData.status}</p>
      <p>Mode of Payment: {viewData && viewData.mode_of_payment}</p>
      <p>Created At: {viewData && new Date(viewData.created_at).toLocaleString()}</p>


        </div>
      </AppModal>
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
            type="propertypayment"
            deleteAction={deleteAction}
            viewAction={viewAction}
            editAction={editAction}
          />
        )}
      </div>
    </Fragment>
  );
}
