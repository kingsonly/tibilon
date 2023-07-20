import { Button } from "@mui/material";
import React, { useEffect } from "react";
import TextInput from "./TextInput";
import axios from "axios";
import SnackbarComponent from "./SnackbarComponent";
import { addNewAmenityToProject } from "../services/apiservices/propertiesServices";

export default function AddProjectAmenityModal({ propertyId, fetchAction }) {
  const [selectedAmenity, setSelectedAmenity] = React.useState();

  const [quantity, setQuantity] = React.useState("");
  const [status, setStatus] = React.useState("success");
  const [show, setShow] = React.useState(false);
  const [amenityIcon, setamenityIcon] = React.useState();
  const [message, setMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [amenities, setAmenities] = React.useState([]);
  const [error, setError] = React.useState({
    name: false,
  });

  const handleOnChange = (e, inputeName) => {
    switch (inputeName) {
      case "quantity":
        // code to be executed when the expression matches value1
        setQuantity(e.target.value);
        break;

      case "selectedAmenity":
        // code to be executed when the expression matches value1
        setSelectedAmenity(e.target.value);
        break;
      default:
        // code to be executed when the expression does not match any of the cases
        setSelectedAmenity(e.target.value);
    }
  };

  const submit = async () => {
    // validate input

    let status = false;
    setError({
      name: false,
    });

    const data = new FormData();
    data.append("amenity", selectedAmenity);
    data.append("quantity", quantity);
    data.append("property", propertyId);

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

    try {
      const response = await addNewAmenityToProject(data, { id: propertyId });

      await fetchAction()
      setStatus("success");
      setMessage("Amenities was Created Successfully");
      setShow(true);
      setSelectedAmenity("");
      setQuantity("")
      setLoading(false);

  
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

  const fetchData = async () => {
    var token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/amenity`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      let i = 1;
      await response?.data?.data?.map((data, index) => {
        response.data.data[index]["SN"] = i;
        response.data.data[index][
          "image"
        ] = `https://api.tibilon.skillzserver.com/public/${response.data.data[index]["image"]}`;
        i++;
      });

      setAmenities(response.data.data);
    } catch (error) {
      // Handle the error
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <SnackbarComponent status={status} show={show} message={message} />
      <div className="">
        <div className="grid grid-cols-2 gap-4 items-center justify-center ">
          <div className="">
            <TextInput
              // className="h-[70px]"
              required
              id="outlined-required"
              label="selectedAmenity"
              defaultValue={selectedAmenity}
              value={selectedAmenity}
              type="select"
              // error={error["selectedAmenity"]}
              options={amenities?.map((amenity) => ({
                label: amenity.name,
                value: amenity.id,
              }))}
              onChange={(e) => handleOnChange(e, "selectedAmenity")}
            />
          </div>

          <div>
            <TextInput
              className="h-[70px] mt-6"
              required
              id="quantity"
              type="number"
              label="quantity"
              error={error["quantity"]}
              value={quantity}
              onChange={(e) => {
                handleOnChange(e, "quantity");
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
