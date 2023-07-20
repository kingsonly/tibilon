import React, { Fragment, useState } from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { imageBaseUrl } from "../services/apiservices/urls";
import DialogModal from "./DialogModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteProjectProperty } from "../services/apiservices/propertiesServices";

export default function DetailedPropertyCard(props) {
  const { project, openEditModal, setproperty, isEdit } = props;
  const [open, setOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [DialogTitle, setDialogTitle] = useState("");

 
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);


  const openDialogModal = (title, message) => {
    setDialogMessage(message);
    setDialogTitle(title);
    setOpen(true);
  };

  const deleteProperty = async () => {
    // deleteProperty

    try {
      const response = await deleteProjectProperty(project.id);
      toast.success(`${response?.data?.status || response.message}`, {
        position: "top-right",
        autoClose: 2000000000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: false,
      });
    } catch (error) {
      console.log(error, "ERROR::DELETING_PRODUCT");
      toast.error(`${error?.response?.data?.message || error.message}`, {
        position: "top-right",
        autoClose: 2000000000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: false,
      });
    }
  };

  return (
    <Fragment>
      <ToastContainer />

      <DialogModal
        open={open}
        setOpen={setOpen}
        message={dialogMessage}
        title={DialogTitle}
        action={deleteProperty}
        buttonText={"Delete"}
      />
      <Link to={`/projects/actions/project-properties/details/${project?.id}`}>
        <div className="w-[449px] bg-white border-2 mb-[37px]">
          {project?.payment?.length !== 0 && (
            <div className="output-container">
              <div className="watermark-ribbon">Sold</div>
            </div>
          )}


          <div className="w-[100%] h-[300px]">
            <img
              src={`${imageBaseUrl}${project?.cover_image}`}
              alt="project"
              className="w-[100%] h-[100%] object-cover"
              style={{ width: "100%" }}
            />

          {project?.amount && (
            <div className="output-container-amount">
              <div className="watermark-amount"> ₦{JSON.parse(project?.amount)?.toLocaleString()}</div>
            </div>
          )}
          </div>

          <div className="border-4">
            <div className="text-[#D7B569] underline">Amenities</div>
            <div className="flex justify-between p-4">
              {project?.amenity?.map((amnty) => (
                <div>
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-[25px] h-[25px]">
                      <img
                        className="w-[100%] h-[100%]"
                        src={`${imageBaseUrl}${amnty?.amenity.image}`}
                        alt="icon"
                      />
                    </div>{" "}
                    <div>{amnty?.amenity.name}</div>{" "}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col border-4 h-[103px] items-center justify-center">
            <div className="text-[#D7B569] underline mb-2">
              Property Description
            </div>
            <div>{project?.description}</div>
          </div>
          <div className="flex flex-flex items-center justify-center gap-4 border-4 h-[89px]">
            <div>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  openDialogModal(
                    "Delete Property",
                    "Are you sure you want to delete Property?"
                  );
                }}
                style={{
                  border: "1px solid red",
                  color: "red",
                  width: "163px",
                }}
              >
                Delete
              </Button>
            </div>
            <div>
              <Button
                style={{
                  border: "1px solid #40A74E",
                  color: "#40A74E",
                  width: "163px",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setproperty(project);
                  openEditModal(true);
                }}
              >
                Edit
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </Fragment>
  );
}
