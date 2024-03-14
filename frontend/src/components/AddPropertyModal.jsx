import { Button, CircularProgress } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import TextInput from "./TextInput";
import AppModal from "./AppModal";
import UploadButton from "./UploadButton";
import UploadIcon from "../assests/upload.svg";
import houseIcon from "../assests/house-damage.svg";
import plusIcon from "../assests/plus-icon.svg";
import { AiFillCloseCircle, AiFillDelete } from "react-icons/ai";

import {
  createProperty,
  editProjectProperty,
} from "../services/apiservices/propertiesServices";
import { useParams } from "react-router-dom";
import SnackbarComponent from "./SnackbarComponent";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BlogToBase64 } from "../utils";

export default function AddPropertyModal(props) {
  const {
    modalIsOpen,
    setIsOpen,
    amenitiesTypes,
    isEdit,
    editProperty,
    fetchAction,
  } = props;

  const { id } = useParams();
  const [propertyName, setPropertyName] = React.useState(
    editProperty?.name || ""
  );
  const [amenities, setAmenities] = useState({ quantity: "", amenity: "" });
  const [allAmenities, setallAmenities] = useState([]);

  const [propertyDescription, setpropertyDescription] = useState(
    editProperty?.description || ""
  );
  const [propertyImage, setpropertyImage] = useState(
    editProperty?.cover_image || []
  );

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = React.useState("success");
  const [show, setShow] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [projectBlogImage, setProjectBlogImage] = React.useState();
  const [amount, setAmount] = useState("")

  const [error, setError] = React.useState({
    propertyName: false,
    propertyImage: false,
    propertyDescription: false,
    amount: false
  });

  useEffect(() => {
    if (isEdit) {
      setallAmenities(
        editProperty.amenity.map((amnty) => ({
          quantity: amnty.quantity,
          amenity: amnty.amenity_id,
        }))
      );
      setpropertyDescription(editProperty?.description);
      setPropertyName(editProperty?.name);
    }

    return () => {
      setallAmenities([]);
    };
  }, [editProperty]);

  useEffect(() => {}, [
    amenities.quantity,
    amenities.amenity,
    editProperty,
    propertyDescription,
    editProperty?.description,
  ]);

  const handleFileUploadChange = (e, type) => {
    try {
      const files = e.target.files || [];

      console.log(files, "files__");

      if (files.length == 0) {
        return;
      }
      setpropertyImage(files[0]);

      BlogToBase64(files[0], (err, res) => {
        console.log(res, "image"); // Base64 `data:image/...` String result.
        setProjectBlogImage(res);
      });

      if (type == "amenities_icon") {
        BlogToBase64(files[0], (err, res) => {
          console.log(res, "image"); // Base64 `data:image/...` String result.
          setAmenities((prev) => ({ ...prev, icon: res }));
        });
      } else {
        const data = new FormData();
        data.append("file", files[0]);
        console.log(data, "upload-file");
      }
    } catch (err) {
      console.log(err, "eoror");
    }
  };

  const options = [
    { label: "Gwarinpa", value: "Gwarinpa" },
    { label: "Gwagwalada", value: "Gwagwalada" },
    { label: "Kubwa", value: "Kubwa" },
    { label: "Nicpe", value: "Nicpe" },
  ];

  const updateAmenities = (amenity, value) => {
    setAmenities((prev) => ({ ...prev, [amenity]: value }));
  };

  const addAmenities = () => {
    if (Object.values(amenities).includes("")) {
      return;
    }

    const data = amenities;

    setallAmenities((prev) => [...prev, data]);
    setAmenities({ quantity: "", amenity: "" });
  };

  const removeAmenity = (id) => {
    setallAmenities(allAmenities.filter((amenity) => amenity.amenity != id));
  };

  const submit = async () => {
    if (propertyImage.length === 0) {
      setStatus("error");
      setMessage("Property Image Required.");
      setShow(true);

      return;
    }
    let status = false;
    setError({
      propertyName: false,
      propertyImage: false,
      propertyDescription: false,
      amount: false
    });

    if (propertyName.trim() === "") {
      setError((prevError) => ({ ...prevError, propertyName: true }));
      status = true;
    }
    if (amount.toString().trim() === "") {
      setError((prevError) => ({ ...prevError, amount: true }));
      status = true;
    }
    
    if (propertyImage.length === 0) {
      setError((prevError) => ({ ...prevError, propertyImage: true }));
      status = true;
    }

    if (propertyDescription.trim() === "") {
      setError((prevError) => ({ ...prevError, propertyDescription: true }));
      status = true;
    }

    if (status) {
      return;
    }

    try {
      setLoading(true);
      const data = new FormData();
      data.append("name", propertyName);
      data.append("project", id);
      data.append("image", propertyImage);
      data.append("description", propertyDescription);
      data.append("amenities", JSON.stringify(allAmenities));
      data.append("amount", amount);
      

      const response = await createProperty(data);
      setStatus("success");
      setLoading(false);
      setShow(true);
      setAmenities({});
      await fetchAction();
      setMessage("Property successfully created");
      setIsOpen(false);
    } catch (error) {
      setLoading(false);
      setStatus("error");
      setMessage(error.message);
      setShow(true);
      console.log(error, "response");
    }
  };

  const editAction = async () => {
    // setIsOpen(true)
    // setisEdit(true)
    try {
      const data = new FormData();
      data.append("name", propertyName);
      data.append("project", id);
      data.append("image", propertyImage);
      data.append("description", propertyDescription);
      data.append("amenities", JSON.stringify(allAmenities));
      data.append("amount", amount);

      setLoading(true);
      const response = await editProjectProperty(data, editProperty?.id);
      setLoading(false);
      await fetchAction();
      toast.success(`Successfully updated property`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: false,
      });
    } catch (error) {
      setLoading(false);
      console.log(error, "ERROR::DELETING_PRODUCT");
      toast.error(`${error?.response?.data?.message || error.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: false,
      });
    }
  };

  return (
    <div>
      <SnackbarComponent status={status} show={show} message={message} />
      <ToastContainer />
      <AppModal
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
        title={isEdit ? "Edit Property" : "Enter New Property"}
      >
        <div
          style={{ overflow: "scroll" }}
          className="h-[100%] overflow-auto flex flex-col justify-between"
        >
          <div>
            <div className="flex gap-4 items-center mb-6">
              <div>
                <UploadButton
                  leftIcon={houseIcon}
                  rightIcon={UploadIcon}
                  text="Upload Property Photo"
                  handleOnChange={handleFileUploadChange}
                />
              </div>
              <div className="w-[100px] h-[100px]">
                {projectBlogImage && (
                  <div className="relative w-30 bg-gray-200 p-3">
                    <button
                      className="absolute top-0 right-0 text-gray-600 hover:text-gray-800"
                      onClick={() => {
                        setProjectBlogImage();
                        setpropertyImage("");
                      }}
                    >
                      <AiFillCloseCircle className="text-[20px]" />
                    </button>
                    <p>
                      <img
                        className="w-[100%] h-[100%]"
                        src={projectBlogImage}
                        alt="project-image"
                      />
                    </p>
                  </div>
                )}
              </div>
            </div>
            <TextInput
              className="h-[70px] mt-6"
              required
              id="outlined-required"
              label="Property Name/Number"
              error={error["propertyName"]}
              defaultValue={propertyName || editProperty?.name}
              onChange={(e) => {
                setPropertyName(e.target.value);
              }}
            />
            <div>
              <TextInput
                className="h-[70px] mt-6"
                required
                id="outlined-required"
                label="Amount"
                defaultValue={amount || editProperty?.amount}
                type="number"
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
              />
            </div>
            <div>
              {" "}
              <TextInput
                className="h-[70px] mt-6"
                required
                id="outlined-required"
                label="Property Description"
                error={error["propertyDescription"]}
                defaultValue={propertyDescription || editProperty?.description}
                onChange={(e) => {
                  setpropertyDescription(e.target.value);
                }}
              />
            </div>
            <div className="text-center font-bold mt-[30px]">Amenities</div>
            <hr className="mb-6 mt-2" />
            <div className="w-[100%] flex items-center justify-center gap-4">
              <div className="w-[100%] flex items-enter justify-center">
                <div className="w-[100%] flex items-center justify-between gap-4">
                  <div className="w-1/2">
                    <TextInput
                      // className="h-[70px]"
                      required
                      id="outlined-required"
                      label="Amenity"
                      defaultValue={amenities.amenity}
                      value={amenities.amenity}
                      type="select"
                      // error={error["project"]}
                      options={amenitiesTypes?.map((amenity) => ({
                        label: amenity.name,
                        value: amenity.id,
                      }))}
                      onChange={(e) =>
                        updateAmenities("amenity", e.target.value)
                      }
                    />
                  </div>
                  <div className="w-1/4">
                    <TextInput
                      className="h-[70px]"
                      required
                      id="outlined-required"
                      type="number"
                      label="Quantity"
                      defaultValue={amenities.quantity}
                      value={amenities.quantity}
                      onChange={(e) =>
                        updateAmenities("quantity", e.target.value)
                      }
                    />
                  </div>
                  <div
                    style={{ border: "1px solid #ccc" }}
                    className="border-1 w-1/4 h-[55px] flex justify-center items-center cursor-pointer"
                    onClick={addAmenities}
                  >
                    <div className="flex justify-center items-center w-1/4 w-[36px] p-[4px]">
                      <img
                        src={plusIcon}
                        alt="plusIcon"
                        className="w-[50px] h-[50px]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-[60px]">
              <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    {/* <th scope="col" class="px-6 py-3">
                      Image
                    </th> */}
                    <th scope="col" class="px-6 py-3">
                      Name
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Quantity
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {allAmenities?.map((amenity, index) => (
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      {/* <th
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        <img
                          className="w-50px] h-[40px]"
                          src={amenity.icon}
                          alt="icon"
                        />
                      </th> */}
                      <td class="px-6 py-4">
                        {
                          amenitiesTypes.filter(
                            (am) => am.id == amenity.amenity
                          )[0]?.name
                        }
                      </td>
                      <td class="px-6 py-4"> {amenity.quantity}</td>
                      <td class="px-6 py-4">
                        <AiFillDelete
                          className="cursor-pointer"
                          onClick={() => removeAmenity(amenity.amenity)}
                        />{" "}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-between mt-24">
            {/* <Button style={{ backgroundColor: "#CCCCCC" }} variant="contained">
              Add Address
            </Button> */}
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                isEdit ? editAction() : submit();
              }}
            >
              {loading ? "saving..." : isEdit ? "Update" : "Save"}
            </Button>
          </div>
        </div>
      </AppModal>
    </div>
  );
}
