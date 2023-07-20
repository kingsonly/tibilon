import { Button } from "@mui/material";
import React from "react";
import TextInput from "./TextInput";
import axios from "axios";
import SnackbarComponent from "./SnackbarComponent";

export default function AddMaterialsModal(props) {
  const [name, setName] = React.useState("");
  const [status, setStatus] = React.useState("success");
  const [show, setShow] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);
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

  const submit = () => {
    // validate input
    setLoading(true);
    let status = false;
    setError({
      name: false,

    });


    let data = {
      name: name,
      // email: email,
      // firstname: firstname,
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
        `${process.env.REACT_APP_API_URL}/material/create`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setStatus("success");
      setMessage("Material was Created Successfully");
      setShow(true);
      setName("");
      setLoading(false);

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
              id="name"
              label="Name"
              error={error["name"]}
              value={name}
              onChange={(e) => {
                handleOnChange(e, "name");
              }}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            variant="contained"
            color="success"
            onClick={() => submit(false)}
          >
            {!loading ? "Save" : "Loading......"}
          </Button>
        </div>
      </div>
    </div>
  );
}
