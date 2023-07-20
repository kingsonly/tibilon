import { Button } from "@mui/material";
import React, { useEffect , useState} from "react";
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

export default function AddDocumentModal(props) {
  const { modalIsOpen, setIsOpen, action,project } = props;
  const [title, setTitle] = useState("");
  const [file, setFile] = useState([]);
  const [documentType, setDocumentType] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [projectBlogImage, setProjectBlogImage] = React.useState();
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("success");

  const [error, setError] = useState({
    title: false,
    file: false,
    fileType: false,
  });

  
  const handleOnChange = (e, name) => {
    switch (name) {
      case "title":
        setTitle(e.target.value);
        break;
     
      default:
        //client goes here
        setDocumentType(e.target.value);
        break;
    }
  };

  const handleFileUploadChange = (e) => {
    const files = e.target.files || [];
    setFile(files[0]);

    BlogToBase64(files[0], (err, res) => {
      console.log(res, "image"); // Base64 `data:image/...` String result.
      setProjectBlogImage(res);
    });
  };
  
  const save = async () => {

    let status = false;
    setError({
        title: false,
        file: false,
        fileType: false,
    });

    if (file.length == 0) {
      setError((prevError) => ({ ...prevError, file: true }));
      status = true;
    }

    if (title.trim() === "") {
      setError((prevError) => ({ ...prevError, title: true }));
      status = true;
    }

    if (documentType.toString().trim() === "") {
      setError((prevError) => ({ ...prevError, fileType: true }));
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
    data.append("file", file);
    data.append("title", title);
    data.append("fileType", documentType);
    data.append("project", project);

    var token = localStorage.getItem("token");

    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/document/create`,
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
  const option = [
    {label:"Drawing", value:"Drawing"},
    {label:"Video / Images ", value:"media"},
    {label:"Word Document", value:"Word Document"},
    {label:"Others", value:"Others"},
  ]
  return (
    <div>
      <SnackbarComponent status={status} show={show} message={message} />
      <AppModal
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
        title={"Add New Document"}
      >
        <div className=" ">
          <div className="flex gap-4 mb-[5px]">
            <div className="w-1/2">
              <UploadButton
                leftIcon={projectUploadIcon}
                rightIcon={UploadIcon}
                text="Select Document"
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
                value={title}
                label="Document Title"
                error={error["title"]}
                // defaultValue="Property Description"
                onChange={(e) => {
                  handleOnChange(e, "title");
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
                label="Document Type"
                error={error["fileType"]}
                // defaultValue="Property Description"
                onChange={(e) => {
                  handleOnChange(e, "documentType");
                }}
                options={option}
                value={documentType}
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
