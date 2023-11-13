import { StyledTableCell } from "./TableComponent"; // Import the StyledTableCell if needed
import { Button } from "@mui/material";
import React, { useState } from "react";
import TextInput from "./TextInput";
import AppModal from "./AppModal";
import UploadButton from "./UploadButton";
import UploadIcon from "../assests/upload.svg";
import avatarIcon from "../assests/avatarUploadIcon.svg";
import axios from "axios";
import SnackbarComponent from "./SnackbarComponent";

export default function EditClientModal({ clientData, closeModal, fetchData }) {
  const [editedData, setEditedData] = useState({ ...clientData });

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const saveChanges = async () => {
    try {
      // Perform the API call to update clientData using editedData
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/client`,
        editedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Check if the API call was successful
      if (response.status === 200) {
        // Update the client data in the parent component
        fetchData();

        // Close the modal
        closeModal();
      } else {
        // Handle errors or display a message
        // You can set an error state or display a message using SnackbarComponent
        console.error(`API request failed with status code ${response.status}`);
        // Example:
        // setErrorState(true); // Set an error state in your component
        // displayErrorMessage("Error: Update failed"); // Display an error message
      }
    } catch (error) {
      // Handle API call errors
      console.error(error);

      // Handle errors or display a message
      // You can set an error state or display a message using SnackbarComponent
      // Example:
      // setErrorState(true); // Set an error state in your component
      // displayErrorMessage("Error: Update failed"); // Display an error message
    }
  };

  return (
    <AppModal 
    setIsOpen={closeModal}
    modalIsOpen={true} // Use the modal state from the parent component
    title="Edit Client">
      <div>
        <h2>Edit Client</h2>
          <label>
            <strong>Client Name:</strong>
            <TextInput
              type="text"
              name="name"
              value={editedData.name}
              onChange={handleFieldChange}
            />
          </label>
          <label>
            <strong>Email:</strong>
            <TextInput
              type="email"
              name="email"
              value={editedData.email}
              onChange={handleFieldChange}
            />
          </label>
          <label>
            <strong>Phone No:</strong>
            <TextInput
              type="text"
              name="phone"
              value={editedData.phone}
              onChange={handleFieldChange}
            />
          </label>
          <label>
            <strong>Client Type:</strong>
            <TextInput
              type="text"
              name="type"
              value={editedData.type}
              onChange={handleFieldChange}
            />
          </label>
          <label>
            <strong>Address:</strong>
            <TextInput
              type="text"
              name="address"
              value={editedData.address}
              onChange={handleFieldChange}
            />
          </label>
        {/* Add more fields if necessary */}
        <Button onClick={saveChanges}>Update</Button>
      </div>
    </AppModal>
  );
}