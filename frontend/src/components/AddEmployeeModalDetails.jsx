import { Button } from "@mui/material";
import React from "react";
import TextInput from "./TextInput";
import axios from "axios";
import SnackbarComponent from "./SnackbarComponent";

export default function AddEmployeeModalDetails(props) {
  const { data, readOnly } = props;
  const [firstname, setFirstname] = React.useState(
    data?.name.split(" ")[0] ?? ""
  );
  const [email, setEmail] = React.useState(data?.email ?? "");
  const [lastname, setLastname] = React.useState(
    data?.name.split(" ")[1] ?? ""
  );
  const [status, setStatus] = React.useState("success");
  const [show, setShow] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState({
    firstname: false,
    email: false,
    lastname: false
  });

  console.log(data, "gggggg");

  const handleOnChange = (e, inputeName) => {
    switch (inputeName) {
      case "firstname":
        // code to be executed when the expression matches value1
        setFirstname(e.target.value);
        break;
      case "email":
        // code to be executed when the expression matches value2
        setEmail(e.target.value);
        break;
      default:
        // code to be executed when the expression does not match any of the cases
        setLastname(e.target.value);
    }
  };

  const submit = () => {
    // validate input
    setLoading(true);
    let status = false;
    setError({
      lastname: false,
      email: false,
      firstname: false
    });

    if (lastname.trim() === "") {
      setError((prevError) => ({ ...prevError, lastname: true }));
      status = true;
    }

    if (email.trim() === "") {
      setError((prevError) => ({ ...prevError, email: true }));
      status = true;
    }

    if (firstname.trim() === "") {
      setError((prevError) => ({ ...prevError, firstname: true }));
      status = true;
    }

    let data = {
      lastname: lastname,
      email: email,
      firstname: firstname
    };

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
    create(data);

    // send to save and use feedback to show toast message.
  };
  
  const create = async (data) => {
    var token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/adduser`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setStatus("success");
      setMessage("Employee was Created Successfully");
      setShow(true);
      setEmail("");
      setLoading(false);
      setFirstname("");
      setLastname("");
      setTimeout(() => {
        setShow(false);
      }, 6000);
    } catch (error) {
      // Handle the error
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
              id="firstname"
              label="Firstname"
              error={error["firstname"]}
              value={firstname}
              disabled={readOnly}
              onChange={(e) => {
                handleOnChange(e, "firstname");
              }}
            />
          </div>
          <div className="">
            <TextInput
              className="h-[70px] mt-6"
              required
              id="lastname"
              error={error["lastname"]}
              value={lastname}
              disabled={readOnly}
              label="Lastname"
              onChange={(e) => {
                handleOnChange(e, "lastname");
              }}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4  mb-6">
          <div className="">
            <TextInput
              required
              value={email}
              disabled={readOnly}
              label={"Email"}
              error={error["email"]}
              onChange={(e) => {
                handleOnChange(e, "email");
              }}
            />
          </div>
        </div>

        <div className="flex justify-end">
          {!readOnly && (
            <Button
              variant="contained"
              color="success"
              onClick={() => submit(false)}
            >
              {!loading ? "Save" : "Loading......"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
