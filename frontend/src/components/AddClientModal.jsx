import { Button } from "@mui/material";
import React, { useState } from "react";
import TextInput from "./TextInput";
import AppModal from "./AppModal";
import UploadButton from "./UploadButton";
import UploadIcon from "../assests/upload.svg";
import avatarIcon from "../assests/avatarUploadIcon.svg";
import axios from "axios";
import SnackbarComponent from "./SnackbarComponent";

export default function AddClientModal(props) {
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
        title={"Add New Client"}
      >
        <div className="flex flex-col">

          <TextInput
            className="h-[70px] mt-6"
            required
            id="outlined-required"
            label="Client Name"
            error={error["name"]}
            defaultValue={name}
            onChange={(e) => {
              handleOnChange(e, "name");
            }}
          />
          <TextInput
            className="h-[70px] mt-6"
            required
            id="outlined-required"
            label="Client Address"
            error={error["address"]}
            defaultValue={address}
            onChange={(e) => {
              handleOnChange(e, "address");
            }}
          />
          <div className="w-[100%] flex items-end gap-4">
            <div className="w-1/2">
              <TextInput
                className="h-[70px]"
                required
                id="outlined-required"
                label="Phone Number"
                error={error["phone"]}
                defaultValue={phone}
                onChange={(e) => {
                  handleOnChange(e, "phone");
                }}
              />
            </div>
            <div className="w-1/2">
              <TextInput
                className="h-[70px]"
                required
                id="outlined-required"
                label="Email Address"
                error={error["email"]}
                defaultValue={email}
                onChange={(e) => {
                  handleOnChange(e, "email");
                }}
              />
            </div>
          </div>

          <div className="w-[100%] flex items-end gap-4">
            <div className="w-1/2">
              <TextInput
                className="h-[70px]"
                required
                id="outlined-required"
                label="Project"
                defaultValue={project}
                type="select"
                error={error["project"]}
                options={types}
                onChange={(e) => {
                  handleOnChange(e, "project");
                }}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              variant="contained"
              color="success"
              onClick={() => addClient()}
            >
              {loading ? "saving..." : "Save"}
            </Button>
          </div>
        </div>
      </AppModal>
    </div>
  );
}
