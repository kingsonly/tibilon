import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
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

import pdfIcon from "../assests/pdf-icon-file.svg";
import docsIcon from "../assests/docs-icon.svg";

export default function AddDocumentModal(props) {
  const { modalIsOpen, setIsOpen, action, project, allowedTypes } = props;
  const [title, setTitle] = useState("");
  const [file, setFile] = useState([]);
  const [documentType, setDocumentType] = useState(allowedTypes != 'any' ? allowedTypes : "");
  const [allowedType, setAllowedType] = useState(allowedTypes);




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

        setMessage('');
        setShow(false);
        setStatus("success")

        switch (e.target.value) {
          case "media":
            setAllowedType("media");
            break;
          case "Word Document":
            setAllowedType("word");
            break;
          case "Drawing":
            setAllowedType("drawing");
            break;
          case "Others":
            setAllowedType("any");
            break;
          default:
            break;
        }
        break;
    }


  };

  const handleFileUploadChange = (e) => {
    const selectedFile = e.target.files[0];

    // Check if a file is selected
    if (!selectedFile) {
      return;
    }

    // Validate file type based on allowedType
    switch (allowedType) {
      case "media":
        // Accept media files (png, jpg, gif, video, etc.)
        if (!selectedFile.type.includes("image") && !selectedFile.type.includes("video")) {
          setStatus("error");
          setMessage("Invalid file type. Please upload a media file.");
          setShow(true);
          setLoading(false);
          return;
        }
        break;
      case "word":
        // Accept Word documents and text files
        if (!selectedFile.type.includes("application/msword") &&
        !selectedFile.type.includes("application/vnd.openxmlformats-officedocument.wordprocessingml.document") && !selectedFile.type.includes("text")) {
          setStatus("error");
          setMessage("Invalid file type. Please upload a Word document or a text file.");
          setShow(true);
          setLoading(false);
          return;
        }
        break;
      case "drawing":
        // Accept only PDF files
        if (!selectedFile.type.includes("pdf")) {
          setStatus("error");
          setMessage("Invalid file type. Please upload a PDF file.");
          setShow(true);
          setLoading(false);
          return;
        }
        break;
      case "any":
        // Accept any other type of file
        break;
      default:
        // Default case if allowedType is not recognized

        setMessage('');
        setShow(false);
        setLoading(false);
        return;
    }

    // Set the selected file and convert it to base64
    setFile(selectedFile);
    BlogToBase64(selectedFile, (err, res) => {
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

    if (file.length === 0) {
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
      setMessage("All fields are required");
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 6000);
      return;
    }

    // on success we would
    // setIsOpen(false)
    // triger a refresh
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

      setTimeout(()=> {
        location.reload()
      }, 2000)
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
    { label: "Drawing", value: "Drawing" },
    { label: "Video / Images ", value: "media" },
    { label: "Word Document", value: "Word Document" },
    { label: "Others", value: "Others" },
  ];

  return (
    <div>
      <SnackbarComponent status={status} show={show} message={message} />
      <AppModal
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
        title={allowedTypes === 'word' ? 'Add New WOrd Document' : allowedTypes === 'media' ? 'Add New Gallery' : allowedTypes === 'drawing' ? 'Add New Drawing' : 'Add New Document'}

      >
        <div className=" ">
          <div className="flex gap-4 mb-[5px]">
            <div className="w-1/2">
              <UploadButton
                leftIcon={projectUploadIcon}
                rightIcon={UploadIcon}
                text="Select Document"
                handleOnChange={handleFileUploadChange}
                allowedTypes={allowedTypes}
              />
            </div>
            <div className="w-[60px] h-[60px]">
              {projectBlogImage && (
                <div className="relative w-30 bg-gray-200 p-3">
                  <button
                    className="absolute top-0 right-0 text-gray-600 hover:text-gray-800"
                    onClick={() => {
                      setProjectBlogImage();
                      // setImage("");
                    }}
                  >
                    <AiFillCloseCircle className="text-[20px]" />
                  </button>
                  <p>
                    <img
                      className="w-[100%] h-[100%]"
                      src={allowedTypes == "drawing" ? pdfIcon : allowedTypes == "word" ?
                      docsIcon : projectBlogImage}
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
            {allowedTypes === 'any' ? 
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
            </div> : <></>}

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

