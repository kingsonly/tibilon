import { Button } from "@mui/material";
import React, { useState } from "react";
import TextInput from "./TextInput";
import AppModal from "./AppModal";
import UploadButton from "./UploadButton";
import clientpassport from "../assests/client-passport.png";
import idcard from "../assests/idcard.jpeg";
import avatarIcon from "../assests/avatarUploadIcon.svg";
import axios from "axios";
import SnackbarComponent from "./SnackbarComponent";
import {
  AiFillDelete,
  AiFillEdit,
  AiFillEye,
  AiOutlineSearch,
} from "react-icons/ai";
import { StyledTableRow } from "./TableComponent"; // Import the StyledTableRow if needed

export default function ClientListView({ clientData, closeModal }) {
  return (
    <AppModal 
    setIsOpen={closeModal}
    modalIsOpen={true} // Use the modal state from the parent component
    title="View Client">
      <div className="flex justify-between col">
      <div className="py-6">
  <h2>View Client</h2>
  <div className="py-6 border-b">
    <strong>Client Name:</strong> {clientData.name}
  </div>
  <div className="py-6 border-b">
    <strong>Email:</strong> {clientData.email}
  </div>
  <div className="py-6 border-b">
    <strong>Phone No:</strong> {clientData.phone}
  </div>
  <div className="py-6 border-b">
    <strong>Client Type:</strong> {clientData.type}
  </div>
  <div className="py-6">
    <strong>Address:</strong> {clientData.address}
  </div>
</div>
      <div className="w-1/3">
       <img src={clientpassport} alt="client passport" width="" />
        <div className="text-[25px]" style={{color: "orange"}}>Proof of Identification</div>
        <img className="pt-4" src={idcard} alt="client passport" width="" />
      </div>
      </div>
    </AppModal>
  );
}