import React, { useEffect, useState } from "react";
import TableComponent from "../../components/TableComponent";
import axios from "axios";
import AppModal from "../../components/AppModal";
import AddEmployeeModalDetails from "../../components/AddEmployeeModalDetails";
import AddMaterials from "../../components/AddMaterialsModal";
import BreadCrumb from "../../components/BreadCrumb";
import { ToastContainer, toast } from "react-toastify";
import EditMaterialsModal from "../../components/EditMaterialsModal";
import { token } from "../../config";

export default function Materials() {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [data, setData] = React.useState([]); 
  const [modalViewIsOpen, setIsViewOpen] = React.useState(false);
  const [modalIsEditOpen, setIsEditOpen] = React.useState(false);
  const [viewData, setViewData] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    var token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/material`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      let i = 1;
      await response.data.data.map((data, index) => {
        response.data.data[index]["SN"] = i;
        i++;
      });

      setData(response.data.data);
    } catch (error) {
      // Handle the error
      console.error(error);
    }
  };

  const searchData = async (data) => {
    var token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/material/search`,
        { query: data },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      let i = 1;
      await response.data.data.map((data, index) => {
        response.data.data[index]["SN"] = i;
        i++;
      });

      setData(response.data.data);
    } catch (error) {
      // Handle the error
      console.error(error);
    }
  };

  function openModal() {
    setIsOpen(true);
  }

  const searchFunction = (data) => {
    // Set a timeout to wait for the user to finish typing
    const delay = 5000; // Adjust this value as needed
    const timeoutId = setTimeout(() => {
      // Trigger the API call only if the searchTerm is not empty
      if (data.trim() !== "") {
        searchData(data);
      }
    }, delay);
  };

  const paginationChange = (page) => {
    //Api call to paginate and update table data
    alert(`Paginating....page ${page}`);
  };

  const dataKeyAccessors = [
    "SN",
    "name",
    "CTA"
    // "email",
    // "totalproperties",
    // "amount",
    // "amountRecieved",
    // "amountRemaining",
  ];

  const columns = [
    "SN",
    "Name",
    "Action"
    // "Email",
    // "Property Sold",
    // "Total Amount",
    // "Amount Recieved",
    // "Amount Pending",
  ];

  const breadCrumbs =[
    {
      name: "Settings",
      link: "/settings",
  
    },
    {
      name: "Materials",
      link: "#",
    }
  ]

  function viewAction(row) {
    setIsViewOpen(true);

    setViewData(row)
  }

  function editAction(row) {
    setIsEditOpen(true);

    setViewData(row)
  }

  const deleteAction = async (material) => {
    try {

      const res = await axios.delete(
        `${process.env.REACT_APP_API_URL}/material/destroy/${material.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(`${res?.data?.status || res.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: false,
      });
      fetchData();
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

  return (
    <div className="p-[47px] bg-white">
            <BreadCrumb breadCrumbs={breadCrumbs}/>
            <ToastContainer />
      <AppModal
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
        title={"Add Material"}
      >
        <AddMaterials fetchData={fetchData} setIsOpen={setIsOpen} />
      </AppModal>

      <AppModal
        modalIsOpen={modalIsEditOpen}
        setIsOpen={setIsEditOpen}
        title={"Edit Material"}
      >
        <EditMaterialsModal fetchData={fetchData} setIsOpen={setIsEditOpen} data={viewData}/>
      </AppModal>

      <AppModal
        modalIsOpen={modalViewIsOpen}
        setIsOpen={setIsViewOpen}
        title={"View Material Details"}
      >
        <div className="flex flex-col">
            
      <h2 style={{fontSize: '25px'}}>Name: {viewData && viewData.name}</h2><br />
        </div>
      </AppModal>


      <div className="font-bold text-[30px] text-left">Material Details</div>
      <hr className="mb-8 mt-3" />
      <TableComponent
        actionText="Add Material"
        columns={columns}
        data={data}
        action={openModal}
        searchFunction={searchFunction}
        paginationChange={paginationChange}
        dataKeyAccessors={dataKeyAccessors}
        type="material"
        deleteAction={deleteAction}
        viewAction={viewAction}
        editAction={editAction}
      />
    </div>
  );
}
