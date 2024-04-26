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
  const [amount, setAmount] = React.useState(props.data?.amount);
  const [modeOfPayment, setModeOfPayment] = React.useState(props.data?.mode_of_payment);

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
      case "amount":
        // code to be executed when the expression matches value1
        setAmount(e.target.value);
        break;
      case "modeOfPayment":
        // code to be executed when the expression matches value1
        setModeOfPayment(e.target.value);
        break;
      default:
        // code to be executed when the expression does not match any of the cases
        console.log(error)
    }
  };



  const submit = async () => {
    // validate input

    let status = false;
    setError({
      name: false,
    });

    const data = {
      "amount": amount,
      "mode_of_payment": modeOfPayment
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
    await create(data);
  
    // send to save and use feedback to show toast message.
  };

  const create = async (data) => {
    setLoading(true);
    var token = localStorage.getItem("token");
    
    
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/property/updatepayment/${props.data.id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStatus("success");
      setMessage("Payment was updated Successfully");
      setShow(true);


      setAmount('')
setModeOfPayment('')
      setLoading(false);

      location.reload()

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

  const paymentModes = [    { label: "Transfer", value: "transfer" },
  { label: "Card", value: "card" },
  { label: "Bank", value: "bank" },]

  return (
    <div>
      <SnackbarComponent status={status} show={show} message={message} />
      <div className="">
        <div className="grid grid-cols-2 gap-4  ">
          <div className="">
            <TextInput
              className="h-[70px] mt-6"
              required
              id="amount"
              label="Amount"
              error={error["amount"]}
              value={amount}
              onChange={(e) => {
                handleOnChange(e, "amount");
              }}
            />
          </div>

          <div>
          <TextInput
                      // className="h-[70px]"
                      required
                      id="outlined-required"
                      label="Mode of Payment"
                      defaultValue={modeOfPayment}
                      value={modeOfPayment}
                      type="select"
                      // error={error["project"]}
                      options={paymentModes?.map((mode) => ({
                        label: mode.label,
                        value: mode.value,
                      }))}
                      onChange={(e) =>
                        handleOnChange(e, "modeOfPayment")
                      }
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
