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
        <div className="flex justify-between h-[355px] shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)]" >
        <div className="text-lg leading-[43px] pl-4 pb-4">
        <div className="text-[25px]" style={{color: "orange"}}>Client Information</div>
          <p><span className="font-bold">Name:</span>Engr Joseph Labar</p>
            
          <p><span className="font-bold">Address:</span> 2 Julius Berger Estate</p>
          <p><span className="font-bold">Email Address:</span> jlabar@gmail.com</p>
            
              <p><span className="font-bold">Phone No:</span> 080876644247</p>
        

         <p><span className="font-bold">Occupation:</span> Engineer</p>

         <p><span className="font-bold">Client Type:</span> Individual</p>

         <p><span className="font-bold">Date of Birth:</span> 12/07/89</p>
         </div>

         <div className="pr-4">
         <img src={clientpassport} alt="client passport" width="125px" />
         <div className="text-[25px]" style={{color: "orange"}}>Proof of Identification</div>
          <img className="pt-4" src={idcard} alt="client passport" width="200px" />
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
            <div className="text-[25px] pl-4 pt-4" style={{color: "orange"}}>Clients Property Details</div>
            <table className= "w-[800px]">

        <tr className="font-bold border-b-2 h-[50px] bg-slate-50">    

            <td>SN</td>

            <td>Names</td>

            <td>Type of Property</td>

            <td>Phone Number</td>

            <td>View</td>

        </tr>

        <tr className="border-b-2 h-[50px]">    

            <td>1</td>

            <td>Engr Joseph Labar</td>

            <td>jlabar@gmail.com</td>

            <td>08097543322 </td>

            <td><AiFillEye /></td>

        </tr>
        <tr>    

        <td>2</td>

<td>Engr Joseph Labar</td>

<td>jlabar@gmail.com</td>

<td>08097543322 </td>

<td><AiFillEye /></td>

</tr>
        </table>
            </div>
            <input type="date" value="set Reminder" placeholder="set Reminder" className="border-4 ml-[650px]" />
            <table className= "w-[800px]">

        <tr className="font-bold border-b-2 h-[50px] bg-slate-50">    

            <td>SN</td>

            <td>Amount Paid</td>

            <td>Date of Payment</td>

            <td>Type of Payment</td>

            <td>Proof</td>

        </tr>

        <tr className="border-b-2 h-[50px]">    

            <td>1</td>

            <td>5,000,000.00</td>

            <td>23/07/23</td>

            <td>Bank Transfer</td>

            <td><AiFillEye /></td>

        </tr>
        <tr>    

<td>2</td>

<td>15,000,000.00</td>

<td>23/07/23</td>

<td>Bank Transfer</td>

<td><AiFillEye /></td>

</tr>
        </table>
      </AppModal>
    </div>
  );
}
