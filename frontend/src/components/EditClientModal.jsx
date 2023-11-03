// import { Button } from "@mui/material";
// import React, { useState } from "react";
// import TextInput from "./TextInput";
// import AppModal from "./AppModal";
// import UploadButton from "./UploadButton";
// import UploadIcon from "../assests/upload.svg";
// import avatarIcon from "../assests/avatarUploadIcon.svg";
// import axios from "axios";
// import SnackbarComponent from "./SnackbarComponent";

// export default function EditClientModal(props) {
//   const { modalIsOpen, setIsOpen, editClientData } = props;
//   const [name, setName] = useState(editClientData ? editClientData.name : "");
//   const [email, setEmail] = useState(editClientData ? editClientData.email : "");
//   const [phone, setPhone] = useState(editClientData ? editClientData.phone : "");
//   const [address, setAddress] = useState(
//     editClientData ? editClientData.address : ""
//   );
//   const [project, setProject] = useState(
//     editClientData ? editClientData.project : ""
//   );
//   const [loading, setLoading] = useState();
//   const [message, setMessage] = useState();
//   const [show, setshow] = useState(false);
//   const [status, setStatus] = useState("success");

//   const [error, setError] = React.useState({
//     name: false,
//     email: false,
//     address: false,
//     project: false,
//     phone: false,
//   });

//   const handleOnChange = (e, inputeName) => {

//     switch (inputeName) {
//       case "email":
//         // code to be executed when the expression matches value2
//         setEmail(e.target.value);
//         break;
//       case "name":
//         // code to be executed when the expression matches value2
//         setName(e.target.value);
//         break;
//       case "phone":
//         // code to be executed when the expression matches value2
//         setPhone(e.target.value);
//         break;
//       case "address":
//         // code to be executed when the expression matches value2
//         setAddress(e.target.value);
//         break;
//       case "project":
//         // code to be executed when the expression matches value2
//         setProject(e.target.value);
//         break;
//       default:
//         setName(e.target.value);
//     }
//   };



//   const types = [
//     { label: "Project Owner", value: 1 },
//     { label: "Property Owner", value: 2 },
//   ];

  // const editClient = async () => {
  //   let status = false;
  //   // setError({
  //   //   name: false,
  //   //   email: false,
  //   //   address: false,
  //   //   project: false,
  //   //   phone: false,
  //   // })
  //   // if (name.trim() === "") {
  //   //     setError((prevError) => ({ ...prevError, lastname: true }));
  //   //     status = true;
  //   // }

  //   // if (email.trim() === "") {
  //   //     setError((prevError) => ({ ...prevError, email: true }));
  //   //     status = true;
  //   // }

  //   // if (phone.trim() === "") {
  //   //     setError((prevError) => ({ ...prevError, firstname: true }));
  //   //     status = true;
  //   // }

  //   setLoading(true);

  //   let data = new FormData();
  //   data.append("name", name);
  //   data.append("email", email);
  //   data.append("phone", phone);
  //   data.append("type", project);
  //   data.append("address_id", address);

  //   var token = localStorage.getItem("token");
  //   try {
  //     const response = await axios.post(
  //       `${process.env.REACT_APP_API_URL}/client/update`,
  //       data,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     await props.fetchData();
  //     setStatus("success");
  //     setshow(true);
  //     setLoading(false);
  //     setIsOpen(false);
  //     setMessage("Client was Updated Successfully");
  //     // setStatus("error")
  //   } catch (error) {
  //     // Handle the error
  //     setStatus("error");

  //     setshow(true);
  //     setLoading(false);
  //     console.error(error);
  //   }
  // };

//   return (
//     <div>
//       <SnackbarComponent status={status} show={show} message={message} />
//       <AppModal
//         modalIsOpen={modalIsOpen}
//         setIsOpen={setIsOpen}
//         title={"Edit Client Details"}
//       >
//         <div className="flex flex-col">
//           <TextInput
//             className="h-[70px] mt-6"
//             required
//             id="outlined-required"
//             label="Client Name"
//             value={name}
//             onChange={(e) => {
//               handleOnChange(e, "name");
//             }}
//           />
//           <TextInput
//             className="h-[70px] mt-6"
//             required
//             id="outlined-required"
//             label="Client Address"
//             value={address}
//             onChange={(e) => {
//               handleOnChange(e, "address");
//             }}
//           />
//           <div className="w-[100%] flex items-end gap-4">
//             <div className="w-1/2">
//               <TextInput
//                 className="h-[70px]"
//                 required
//                 id="outlined-required"
//                 label="Phone Number"
//                 value={phone}
//                 onChange={(e) => {
//                   handleOnChange(e, "phone");
//                 }}
//               />
//             </div>
//             <div className="w-1/2">
//               <TextInput
//                 className="h-[70px]"
//                 required
//                 id="outlined-required"
//                 label="Email Address"
//                 value={email}
//                 onChange={(e) => {
//                   handleOnChange(e, "email");
//                 }}
//               />
//             </div>
//           </div>
//           <div className="w-[100%] flex items-end gap-4">
//             <div className="w-1/2">
//               <TextInput
//                 className="h-[70px]"
//                 required
//                 id="outlined-required"
//                 label="Project"
//                 value={project}
//                 type="select"
//                 options={types}
//                 onChange={(e) => {
//                   handleOnChange(e, "project");
//                 }}
//               />
//             </div>
//           </div>
//           <div className="flex justify-end">
//             <Button variant="contained" color="success" onClick={() => editClient()}>
//               {loading ? "Updating..." : "Update"}
//             </Button>
//           </div>
//         </div>
//       </AppModal>
//     </div>
//   );
// }


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
        `${process.env.REACT_APP_API_URL}/client/edit`,
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