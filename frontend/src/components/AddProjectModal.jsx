import { Button } from "@mui/material";
import React, { useEffect } from "react";
import TextInput from "./TextInput";
import AppModal from "./AppModal";
import UploadButton from "./UploadButton";
import UploadIcon from "../assests/upload.svg";
import projectUploadIcon from "../assests/projectUploadIcon.svg";
import axios from "axios";
import moment from "moment";
import { BlogToBase64 } from "../utils";
import { AiFillCloseCircle } from "react-icons/ai";
import SnackbarComponent from "./SnackbarComponent";

export default function AddProjectModal(props) {
  const { modalIsOpen, setIsOpen, action } = props;
  const [name, setName] = React.useState("");
  const [image, setImage] = React.useState([]);
  const [address, setAddress] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [numberOfProperties, setNumberOfProperties] = React.useState("");
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndtDate] = React.useState("");
  const [managerOption, setManagerOption] = React.useState([]);
  const [manager, setManager] = React.useState("");
  const [client, setClient] = React.useState("");
  const [clientOption, setClientOption] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [projectBlogImage, setProjectBlogImage] = React.useState();
  const [show, setShow] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [status, setStatus] = React.useState("success");

  const [error, setError] = React.useState({
    name: false,
    manager: false,
    address: false,
    description: false,
    client: false,
    numberOfProperties: false,
    startDate: false,
    endDate: false,
  });

  useEffect(() => {
    getProjectClient();
    getProjectManager();
  }, []);
  const handleOnChange = (e, name) => {
    switch (name) {
      case "name":
        setName(e.target.value);
        break;
      case "image":
        setImage(e.target.files);
        break;
      case "address":
        setAddress(e.target.value);
        break;
      case "description":
        setDescription(e.target.value);
        break;
      case "numberOfProperties":
        setNumberOfProperties(e.target.value);
        break;
      case "startDate":
        setStartDate(moment(e).format("YYYY-MM-DD"));
        break;
      case "endDate":
        setEndtDate(moment(e).format("YYYY-MM-DD"));
        break;
      case "manager":
        setManager(e.target.value);
        break;
      default:
        //client goes here
        setClient(e.target.value);
        break;
    }
  };

  const handleFileUploadChange = (e) => {
    const files = e.target.files || [];
    setImage(files[0]);

    BlogToBase64(files[0], (err, res) => {
      console.log(res, "image"); // Base64 `data:image/...` String result.
      setProjectBlogImage(res);
    });
  };

  const getProjectManager = async () => {
    var token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/user`,
        { perpage: 50 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      let data = [];
      response.data.data.map((value) => {
        data.push({ label: value.name, value: value.id });
      });
      setManagerOption(data);
    } catch (error) {
      // Handle the error
      console.error(error);
    }
  };

  const getProjectClient = async () => {
    var token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/client`,
        { perpage: 50 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      let data = [];
      response.data.data.map((value) => {
        data.push({ label: value.name, value: value.id });
      });
      setClientOption(data);
    } catch (error) {
      // Handle the error
      console.error(error);
    }
  };

  const save = async () => {

    let status = false;
    setError({
      name: false,
      manager: false,
      address: false,
      description: false,
      client: false,
      numberOfProperties: false,
      startDate: false,
      endDate: false,
    });

    if (image.length == 0) {
      setError((prevError) => ({ ...prevError, image: true }));
      status = true;
    }

    if (name.trim() === "") {
      setError((prevError) => ({ ...prevError, name: true }));
      status = true;
    }

    if (manager.toString().trim() === "") {
      setError((prevError) => ({ ...prevError, manager: true }));
      status = true;
    }

    if (address.trim() === "") {
      setError((prevError) => ({ ...prevError, address: true }));
      status = true;
    }

    if (description.trim() === "") {
      setError((prevError) => ({ ...prevError, description: true }));
      status = true;
    }
    if (manager.length < 1) {
      setError((prevError) => ({ ...prevError, manager: true }));
      status = true;
    }

    if (client.toString().trim() === "") {
      setError((prevError) => ({ ...prevError, client: true }));
      status = true;
    }
    if (numberOfProperties.toString().trim() === "") {
      setError((prevError) => ({ ...prevError, numberOfProperties: true }));
      status = true;
    }
    if (startDate.trim() === "") {
      setError((prevError) => ({ ...prevError, startDate: true }));
      status = true;
    }
    if (endDate.trim() === "") {
      setError((prevError) => ({ ...prevError, endDate: true }));
      status = true;
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

    // on success we would
    //setIsOpen(false)
    //triger a refresh
    let data = new FormData();
    data.append("name", name);
    data.append("description", description);
    data.append("manager", manager);
    data.append("image", image);
    data.append("address", address);
    data.append("number_of_properties", numberOfProperties);
    data.append("client", client);
    data.append("start_date", startDate);
    data.append("end_date", endDate);

    var token = localStorage.getItem("token");

    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/project/create`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await action();
      setIsOpen(false);
      setStatus("success");
      setMessage("Successful");
      setShow(true);
      setLoading(false);
    } catch (error) {
      // Handle the error
      console.error(error);
      setLoading(false);

      setStatus("error");
      setMessage(`${error?.response?.data?.message || error.message}`);
      setShow(true);
    }
  };
  return (
    <div>
      <SnackbarComponent status={status} show={show} message={message} />
      <AppModal
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
        title={"Add New Project"}
      >
        <div className=" ">
          <div className="flex gap-4 mb-[5px]">
            <div className="w-1/2">
              <UploadButton
                leftIcon={projectUploadIcon}
                rightIcon={UploadIcon}
                text="Upload Project Photo"
                handleOnChange={handleFileUploadChange}
              />
            </div>
            <div className="w-[60px] h-[60px]">
              {projectBlogImage && (
                <div className="relative w-30 bg-gray-200 p-3">
                  <button
                    className="absolute top-0 right-0 text-gray-600 hover:text-gray-800"
                    onClick={() => {
                      setProjectBlogImage();
                      setImage("");
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

          <div className="flex gap-4 items-center">
            <div className="w-1/2">
              <TextInput
                className="h-[70px] mt-6"
                required
                id="outlined-required"
                value={name}
                label="Project Name"
                error={error["name"]}
                // defaultValue="Property Description"
                onChange={(e) => {
                  handleOnChange(e, "name");
                }}
              />
            </div>

            <div className="w-1/2">
              {" "}
              <TextInput
                className="h-[70px] mt-6"
                required
                type="select"
                id="outlined-required"
                label="Project Manager"
                error={error["manager"]}
                // defaultValue="Property Description"
                onChange={(e) => {
                  handleOnChange(e, "manager");
                }}
                options={managerOption}
                value={manager}
              />
            </div>
          </div>

          <div className="w-[100%] flex items-end gap-4 items-center">
            <div className="w-1/2">
              <TextInput
                required
                value={address}
                label={"Project Location"}
                error={error["address"]}
                onChange={(e) => {
                  handleOnChange(e, "address");
                }}
              />
            </div>
            <div className="w-1/2">
              <TextInput
                className="h-[70px]"
                required
                value={description}
                id="outlined-required"
                label="Property Description"
                defaultValue="Property Description"
                error={error["description"]}
                onChange={(e) => {
                  handleOnChange(e, "description");
                }}
              />
            </div>
            <div className="w-1/2">
              <TextInput
                type="select"
                className="h-[70px]"
                required
                id="outlined-required"
                label="Project Owner"
                options={clientOption}
                error={error["client"]}
                // defaultValue="Unit Price Required"
                onChange={(e) => {
                  handleOnChange(e, "client");
                }}
              />
            </div>
          </div>

          <div className="w-[100%] flex items-end gap-4 items-center">
            <div className="w-1/2">
              <TextInput
                className="h-[70px] "
                required
                id="outlined-required"
                label="Number of Property"
                value={numberOfProperties}
                type="number"
                error={error["numberOfProperties"]}
                // defaultValue="Property Addresses"
                onChange={(e) => {
                  handleOnChange(e, "numberOfProperties");
                }}
              />
            </div>
            <div className="w-1/2">
              <TextInput
                type="date"
                className="h-[70px]"
                required
                id="outlined-required"
                label="Project Start Date"
                // defaultValue="Property Status"
                error={error["startDate"]}
                onChange={(e) => {
                  handleOnChange(e, "startDate");
                }}
              />
            </div>
            <div className="w-1/2">
              <TextInput
                type="date"
                className="h-[70px]"
                required
                id="outlined-required"
                label="Project Finish Date"
                // defaultValue="Property Status"
                error={error["endDate"]}
                onChange={(e) => {
                  handleOnChange(e, "endDate");
                }}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button variant="contained" color="success" onClick={() => save()}>
              {loading ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      </AppModal>
    </div>
  );
}
