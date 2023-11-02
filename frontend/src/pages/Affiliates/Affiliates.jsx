import React, { useEffect, useState } from "react";
import TableComponent from "../../components/TableComponent";
import axios from "axios";
import AppModal from "../../components/AppModal";
import AddAffiliateModalDetails from "../../components/AddAffiliateModalDetails";

export default function Affiliates() {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [perpage, setPerpage] = React.useState(10);
  const [hasMore, setHasMore] = React.useState(false);
  const [openEditModal, setOpenEditModal] = React.useState(false);
  const [openViewInfo, SetOpenViewInfo] = React.useState(false);
  const [affliateDetails, SetAffliateDetails] = React.useState({});
  const [readOnly, setReadOnly] = React.useState(false);

  const [link, setLink] = React.useState(
    `${process.env.REACT_APP_API_URL}/affiliate`
  );

  const handleEditClick = () => {
    setOpenEditModal(true);
  };

  const handleViewClick = (data, isView) => {
    if (isView) {
      setReadOnly(true)
    } 
    SetAffliateDetails(data)
    SetOpenViewInfo(true);



  };

 

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    var token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${link}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log(response, "responseresponseresponse");

      let i = data.length + 1;
      await response.data.data.map((data, index) => {
        response.data.data[index]["SN"] = i;
        i++;
      });

      setData((prevData) => [...prevData, ...response.data.data]);
      if (response.data.links.next == null) {
        console.log(response.data.links.next, "abc");
        setHasMore(false);
      } else {
        setHasMore(true);
      }
      setLink(response.data.links.next);
    } catch (error) {
      // Handle the error
      console.error(error);
    }
  };

  const searchData = async (data) => {
    var token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/affiliate/search`,
        { query: data },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
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

  function setEdit() {
    setOpenEditModal(false);
  }

  function setView() {
    SetOpenViewInfo(false);
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
    "phoneNumber",
    "email",
    "totalproperties",
    "amount",
    "amountRecieved",
    "amountRemaining",
    "CTA",
    "action"
  ];

  const columns = [
    "SN",
    "Name",
    "Phone Number",
    "Email",
    "Property Sold",
    "Total Amount",
    "Amount Recieved",
    "Amount Pending",
    "Action"
  ];

  return (
    <div className="p-[47px] bg-white">
      {/* <AppModal
        setIsOpen={setEdit}
        title={"New Affiliate"}
        modalIsOpen={openEditModal}
      >
        <AddAffiliateModalDetails
         data={affliateDetails} 
         />
      </AppModal> */}


      <AppModal
        setIsOpen={setView}
        title={"View Info"}
        modalIsOpen={openViewInfo}
      >
        <AddAffiliateModalDetails
        data={affliateDetails} 
        readOnly={readOnly}
        
        
        
         />
      </AppModal>

      <div className="font-bold text-[30px] text-left"> Affiliate Details</div>
      <hr className="mb-8 mt-3" />

      <TableComponent
        actionText="Add Affiliate"
        columns={columns}
        data={data}
        action={openModal}
        searchFunction={searchFunction}
        paginationChange={paginationChange}
        dataKeyAccessors={dataKeyAccessors}
        hasMore={hasMore}
        fetchMoreDataProps={fetchData}
        editAction={handleViewClick}
        viewAction={handleViewClick}
      />
    </div>
  );
}
