import { Button } from "@mui/material";
import React from "react";
import TextInput from "./TextInput";
import axios from "axios";
import SnackbarComponent from "./SnackbarComponent";
import UploadButton from "./UploadButton";
import projectUploadIcon from "../assests/projectUploadIcon.svg";
import UploadIcon from "../assests/upload.svg";
import { BlogToBase64 } from "../utils";
import { AiFillCloseCircle } from "react-icons/ai";

export default function EditPropertyPaymentModal(props) {
  const [name, setName] = React.useState(props.data?.name);
  const [status, setStatus] = React.useState("success");
  const [show, setShow] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [image, setImage] = React.useState(props.data?.image);
  const [error, setError] = React.useState({
    name: false,
  });

  const handleOnChange = (e, inputeName) => {
    switch (inputeName) {
      case "name":
        // code to be executed when the expression matches value1
        setName(e.target.value);
        break;

      default:
        // code to be executed when the expression does not match any of the cases
        setName(e.target.value);
    }
  };



  const submit = async () => {
    // validate input

    let status = false;
    setError({
      name: false,
    });

    const data = new FormData();
    data.append("name", name);

    if (status) {
      setLoading(false);
      setStatus("error");
      setMessage("all fields are required");
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 6000);
      return;
    }
    await create(data);

    // send to save and use feedback to show toast message.
  };

  const create = async (data) => {
    setLoading(true);
    var token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/unit/update/${props.data.id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStatus("success");
      setMessage("Unit was updates Successfully");
      setShow(true);
      setName("");
      setLoading(false);

      props.setIsOpen(false);
      setTimeout(() => {
        setShow(false);
      }, 6000);
    } catch (error) {
      setLoading(false);
      // Handle the error
      setStatus("error");
      setShow(true);
      setMessage(error?.response?.message || error?.message);

      console.error(error);
    }
  };

  return (
    <div>
      <SnackbarComponent status={status} show={show} message={message} />
      <div className="">
        <div className="grid grid-cols-2 gap-4  ">
          <div className="">
            <TextInput
              className="h-[70px] mt-6"
              required
              id="name"
              label="Name"
              error={error["name"]}
              value={name}
              onChange={(e) => {
                handleOnChange(e, "name");
              }}
            />
          </div>

        </div><br />

        <div className="flex justify-start">
  <Button
    variant="contained"
    color="success"
    onClick={() => submit(false)}
    style={{ width: '50%' }} // Add this prop to make the button full width
  >
    {!loading ? "Save" : "Loading..."}
  </Button>
</div>

      </div>
    </div>
  );
}
