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

export default function ClientListView(props) {
  const { modalIsOpen, setIsOpen } = props;
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const [project, setProject] = useState();
  const [loading, setLoading] = useState();
  const [message, setMessage] = useState();
  const [show, setshow] = useState(false);
  const [status, setStatus] = useState("success");

  const [error, setError] = React.useState({
    name: false,
    email: false,
    address: false,
    project: false,
    phone: false,
  });

  const handleOnChange = (e, inputeName) => {

    switch (inputeName) {
      case "email":
        // code to be executed when the expression matches value2
        setEmail(e.target.value);
        break;
      case "name":
        // code to be executed when the expression matches value2
        setName(e.target.value);
        break;
      case "phone":
        // code to be executed when the expression matches value2
        setPhone(e.target.value);
        break;
      case "address":
        // code to be executed when the expression matches value2
        setAddress(e.target.value);
        break;
      case "project":
        // code to be executed when the expression matches value2
        setProject(e.target.value);
        break;
      default:
        setName(e.target.value);
    }
  };



  const types = [
    { label: "Project Owner", value: 1 },
    { label: "Property Owner", value: 2 },
  ];

  const addClient = async () => {
    let status = false;
    // setError({
    //   name: false,
    //   email: false,
    //   address: false,
    //   project: false,
    //   phone: false,
    // })
    // if (name.trim() === "") {
    //     setError((prevError) => ({ ...prevError, lastname: true }));
    //     status = true;
    // }

    // if (email.trim() === "") {
    //     setError((prevError) => ({ ...prevError, email: true }));
    //     status = true;
    // }

    // if (phone.trim() === "") {
    //     setError((prevError) => ({ ...prevError, firstname: true }));
    //     status = true;
    // }

    setLoading(true);

    let data = new FormData();
    data.append("name", name);
    data.append("email", email);
    data.append("phone", phone);
    data.append("type", project);
    data.append("address_id", address);

    var token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/client/create`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await props.fetchData();
      setStatus("success");
      setshow(true);
      setLoading(false);
      setIsOpen(false);
      setMessage("Client was Created Successfully");
      // setStatus("error")
    } catch (error) {
      // Handle the error
      setStatus("error");

      setshow(true);
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <div>
      <SnackbarComponent status={status} show={show} message={message} />
      <AppModal
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
        title={"Client Information"}
      >
        <div className="flex gap-[300px] h-[450px] shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)]" >
        <div className="text-lg leading-[50px]">
        <div className="ml-2 text-[25px]" style={{color: "orange"}}>Client Information</div>
          <div className="ml-2"><span className="font-bold">Name:</span>Engr Joseph Labar</div>
            
          <div className="ml-2"><span className="font-bold">Address:</span> 2 Julius Berger Estate</div>
          <div className="ml-2"><span className="font-bold">Email Address:</span> jlabar@gmail.com</div>
            
              <div className="ml-2"><span className="font-bold">Phone Number:</span> 080876644247</div>
        

         <div className="ml-2"><span className="font-bold">Occupation:</span> Engineer</div>

         <div className="ml-2"><span className="font-bold">Client Type:</span> Individual</div>

         <div className="ml-2"><span className="font-bold">Date of Birth:</span> 12/07/89</div>
         </div>

         <div className="">
         <img src={clientpassport} alt="client passport" width="125px" />
         </div>
          {/* <div className="flex justify-end">
            <Button
              variant="contained"
              color="success"
              onClick={() => addClient()}
            >
              {loading ? "saving..." : "View  Transaction History"}
            </Button>
            </div> */}
          </div>
          <div className="h-[300px] shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)]">
    <div className="ml-2 text-[25px]" style={{color: "orange"}}>Proof of Identification</div>
    <img className="ml-2 mt-4" src={idcard} alt="client passport" width="350px" />
    </div>
      </AppModal>
    </div>
  );
}
