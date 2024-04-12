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

export default function EditProjectAmenityModal(props) {
  const [name, setName] = React.useState(props.data?.name);
  const [quantity, setQuantity] = React.useState(props.data?.quantity);
  const [status, setStatus] = React.useState("success");
  const [show, setShow] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState({
    name: false,
  });

  const handleOnChange = (e, inputeName) => {
    switch (inputeName) {
        case "quantity":
          // code to be executed when the expression matches value1
          setQuantity(e.target.value);
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
      quantity: false,
    });

    const data = {
      "amenity": props.data?.amenity_id,
      "quantity": quantity,
    }

    
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
    await update(data);

    // send to save and use feedback to show toast message.
  };

  const update = async (data) => {
    setLoading(true);
    var token = localStorage.getItem("token");

    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/property/updateamenity/${props.data.id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStatus("success");
      setMessage("Project Amenity was Updated Successfully");
      setShow(true);
      setName("");
      setLoading(false);

      await props.fetchData();
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


<h2 style={{fontSize: '25px'}}>Name: {name && name}</h2><br />
          </div><br />
          <div className="">
            <TextInput
              className="h-[70px] mt-6"
              required
              id="quantity"
              label="Quantity"
              error={error["quantity"]}
              value={quantity}
              onChange={(e) => {
                handleOnChange(e, "quantity");
              }}
            />
          </div><br />
  
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
