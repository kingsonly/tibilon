import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Button, CircularProgress } from "@mui/material";
import TableComponent from "../../components/TableComponent";
import {
  deleteAmenityFromProperty,
  deleteProjectProperty,
  getPropertiesDetails,
} from "../../services/apiservices/propertiesServices";
import { imageBaseUrl } from "../../services/apiservices/urls";
import BreadCrumb from "../../components/BreadCrumb";
import DialogModal from "../../components/DialogModal";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppModal from "../../components/AppModal";
import AddProjectAmenityModal from "../../components/AddProjectAmenityModal";
import PropertyPaymentInfo from "../../components/PropertyPaymentInfo";
import { getAllPropertyPayments } from "../../services/apiservices/paymentsServices";
import PropertyClientInfo from "../../components/PropertyClientInfo";

import EditProjectAmenityModal from "../../components/EditProjectAmenityModal";

export default function ProjectPropertiesDetails() {
  const { id } = useParams();
  const { state } = useLocation();

  const [property, setProperty] = useState();
  const [loading, setLoading] = useState(false);
  const [amenities, setAmenities] = useState([]);
  const [open, setOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [DialogTitle, setDialogTitle] = useState("");
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [openClientModal, setOpenClientModal] = useState(false);
  const [hasMore, setHasMore] = React.useState(false);
  const [link, setLink] = React.useState(
    `${process.env.REACT_APP_API_URL}/property`
  );
  const [perpage, setPerpage] = React.useState(10);

  const [modalViewIsOpen, setIsViewOpen] = React.useState(false); 
  const [modalIsEditOpen, setIsEditOpen] = React.useState(false);
  const [viewData, setViewData] = useState();

  function openModal() {
    setIsOpen(true);
  }

  const openPayment = () => {
    setOpenPaymentModal(true);
  };

  const openClient = () => {
    setOpenClientModal(true);
  };
  const getPropertyDetails = async () => {
    setLoading(true);
    try {
      const response = await getPropertiesDetails(id);
      setLoading(false);
      setProperty(response?.data?.data);
      setAmenities(
        response?.data?.data?.amenity?.map((amt, index) => ({
          index: index + 1,
          name: amt?.amenity?.name,
          quantity: amt?.quantity,
          id: amt?.id,
          amenity_id: amt?.amenity_id,
        }))
      );
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  // const getAllPayments = async ()=>{

  //   try {
  //     const res = await getAllPropertyPayments(id)

  //     console.log(res,'resresresres');
  //   } catch (error) {

  //   }
  // }

  useEffect(() => {
    getPropertyDetails();
    // getAllPayments()
  }, []);

  useEffect(() => {
    // setProperty(projectData.filter((property) => property.id == id)[0]);
  }, [id, property]);

  const searchFunction = () => {
    //Api call to search and update table data
    alert("Fetching search....");
  };

  const paginationChange = (page) => {
    //Api call to paginate and update table data
    alert(`Paginating....page ${page}`);
  };

  const dataKeyAccessors = ["index", "name", "quantity", "CTA"];

  const columns = ["S/N", "Name", "Quantity", "Actions"];

  const breadCrumbs = [
    {
      name: "Projects Properties",
      link: `/projects/actions/project-properties/${state?.id}`,
    },
    {
      name: "Project Details",
      link: "#",
    },
  ];

  const openDialogModal = (title, message) => {
    setDialogMessage(message);
    setDialogTitle(title);
    setOpen(true);
  };

  const deleteAction = async (amenity) => {
    try {
      const res = await deleteAmenityFromProperty({ id: amenity.id });
      toast.success(`${res?.data?.status || res.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: false,
      });
      getPropertyDetails();
      console.log(res);
    } catch (error) {
      toast.error(`${error?.response?.data?.message || error.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: false,
      });
    }
  };

  const deleteProperty = async () => {
    // deleteProperty

    try {
      const response = await deleteProjectProperty(id);
      toast.success(`${response?.data?.status || response.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: false,
      });
    } catch (error) {
      console.log(error, "ERROR_DELETING");
      // pushAlert("Check your email for OTP to proceed.");
      toast.error(`${error?.response?.data?.message || error.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: false,
      });
    }
  };

  function viewAction(row) {
    setIsViewOpen(true);

    setViewData(row)
  }

  function editAction(row) {
    setIsEditOpen(true);

    setViewData(row)
  }

  return (
    <div className="bg-white h-screen p-8">
      <BreadCrumb breadCrumbs={breadCrumbs} />
      <ToastContainer />
      <DialogModal
        open={open}
        setOpen={setOpen}
        message={dialogMessage}
        title={DialogTitle}
        action={deleteProperty}
        buttonText={"Delete"}
      />

      <AppModal
        modalIsOpen={openPaymentModal}
        setIsOpen={setOpenPaymentModal}
        title={"Payment Information"}
      >
        <PropertyPaymentInfo
          projectId={property?.project?.id}
          // payments={""}
          property={property}
          // fetchData= {fetchData} setIsOpen={setIsOpen}
        />
      </AppModal>

      <AppModal
        modalIsOpen={openClientModal}
        setIsOpen={setOpenClientModal}
        title={"Client Information"}
      >
        <PropertyClientInfo
          projectId={property?.project?.id}
          // payments={""}
          property={property}
          // fetchData= {fetchData} setIsOpen={setIsOpen}
        />
      </AppModal>

      <AppModal
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
        title={"Add Amenity"}
      >
        <AddProjectAmenityModal
          fetchAction={getPropertyDetails}
          setIsOpen={setIsOpen}
          propertyId={property?.id}
        />
      </AppModal>


      
      <AppModal
        modalIsOpen={modalIsEditOpen}
        setIsOpen={setIsEditOpen}
        title={"Edit Amenity"}
      >
        <EditProjectAmenityModal fetchData={getPropertyDetails} setIsOpen={setIsEditOpen} data={viewData}/>
      </AppModal>

      <AppModal
        modalIsOpen={modalViewIsOpen}
        setIsOpen={setIsViewOpen}
        title={"View Amenities Details"}
      >
        <div className="flex flex-col">
            
      <h2 style={{fontSize: '25px'}}>Name: {viewData && viewData.name}</h2><br />
      <div>Quantity: {viewData && viewData.quantity}</div>
        </div>
      </AppModal>

      {loading && (
        <div className="flex items-center justify-center w-[100%] mb-[20px]">
          <CircularProgress />
        </div>
      )}
      <div className="flex justify-between">
        <div className="text-[24px] font-medium">View Property</div>
        <div className="text-[#40A74E] text-[16px] font-bold"></div>
      </div>
      <hr className="my-8" />

      <div>
        {/* <img
          className="w-[100%] object-contain"
          src={property?.image}
          alt="property"
        /> */}
        <img
          // src={project?.cover_image}
          src={`${imageBaseUrl}${property?.cover_image}`}
          alt="project"
          className="w-[100%] h-[300px]"
          style={{ width: "100%" }}
        />
      </div>
      <div className="flex justify-around h-[8rem] border-1 items-center">
        <div>
          <div className="font-medium text-[20px]">Property Name/Number</div>
          <div>{property?.name}</div>
        </div>
        <div>
          <div className="font-medium text-[20px]">Property Description</div>
          <div>{property?.description}</div>
        </div>
      </div>
      <hr className="my-9" />
      <div> 
        <TableComponent
          actionText="Add Amenity"
          columns={columns} 
          data={amenities}
          action={openModal}
          searchFunction={searchFunction}
          paginationChange={paginationChange}
          dataKeyAccessors={dataKeyAccessors}
          deleteAction={deleteAction}
          loading={loading}
          hasMore={hasMore}
          fetchMoreDataProps={getPropertyDetails}
          type="propertyamenity"
          viewAction={viewAction}
          editAction={editAction}
        />
      </div>
      <br /><br />
 
      <div className="mb-[45px]">
        <hr />
        <div className="my-[14px] font-medium text-[20px] ">
          Client/Sales Details
        </div>
        <hr />
      </div>
      <div className="flex justify-between pb-[5rem]">
        <Button
          // className="h-[67px] text-[white] bg-[#40A74E] w-[320px]"
          style={{
            backgroundColor: "#40A74E",
            color: "white",
            width: "320px",
            height: "67px",
          }}
          variant="contained"
          onClick={() => {
            openClient();
          }}
        >
          Clients Sales Details
        </Button>
        <Button
          //  className="h-[67px] color-[white] bg-[#D8B36C] w-[320px]"
          style={{
            backgroundColor: "#D8B36C",
            color: "white",
            width: "320px",
            height: "67px",
          }}
          variant="contained"
          onClick={() => {
            openPayment();
          }}
        >
          Payments
        </Button>
        <Button
          //  className="h-[67px] color-[white] bg-[#CCCCCC] w-[320px]"
          style={{
            backgroundColor: "#CCCCCC",
            color: "white",
            width: "320px",
            height: "67px",
          }}
          variant="contained"
        >
          Maintenance
        </Button>
      </div>
    </div>
  );
}
