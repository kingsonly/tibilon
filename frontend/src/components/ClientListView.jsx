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
        <div className="flex justify-between h-[350px] shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)]" >
        <div className="text-lg leading-[45px]">
        <div className="ml-4 text-[25px]" style={{color: "orange"}}>Client Information</div>
          <div className="ml-4"><span className="font-bold">Name:</span>Engr Joseph Labar</div>
            
          <div className="ml-4"><span className="font-bold">Address:</span> 2 Julius Berger Estate</div>
          <div className="ml-4"><span className="font-bold">Email Address:</span> jlabar@gmail.com</div>
            
              <div className="ml-4"><span className="font-bold">Phone No:</span> 080876644247</div>
        

         <div className="ml-4"><span className="font-bold">Occupation:</span> Engineer</div>

         <div className="ml-4"><span className="font-bold">Client Type:</span> Individual</div>

         <div className="ml-4"><span className="font-bold">Date of Birth:</span> 12/07/89</div>
         </div>

         <div className="mr-4">
         <img src={clientpassport} alt="client passport" width="125px" />
         <div className="text-[25px]" style={{color: "orange"}}>Proof of Identification</div>
          <img className="mt-4" src={idcard} alt="client passport" width="200px" />
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
            <div className="text-[25px] ml-4" style={{color: "orange"}}>Property Details</div>
            <table className="w-[800px] ml-4">

    <tr className="font-bold border-b-2 h-[50px]">    

        <td>Property Type</td>

        <td>Property Name/Number</td>

        <td>Location</td>

        <td>Units</td>

        <td>Paid(%)</td>

    </tr>

    <tr className="h-[50px]">    

        <td>5 Bedroom Stand alone with BQ</td>

        <td>Mabushi Project phase 1/A05</td>

        <td>Mabushi</td>

        <td>1</td>

        <td>40%</td>

    </tr>
    </table>
    <div className="text-[25px] border-b-2 ml-4" style={{color: "orange"}}>Payment Information</div>
    <table className="ml-4 w-[1050px]">
    <tr className="border-b-2 h-[50px]">    

<td>Payment Amount: <b>55,000,000.00</b></td>

<td className="ml-8">Total Paid: <b>20,000,000.00</b></td>
</tr>
<tr className="h-[50px]">
<td>Balance: <span className="text-red-600 font-bold">35,000,000.00</span></td>
<td className="ml-8">Next Payment Due Date: 23/07/23 </td>
</tr>
    </table>
            </div>
            <input type="date" value="set Reminder" placeholder="set Reminder" className="border-4 ml-[650px]" />
            <table className="w-[800px]">

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
