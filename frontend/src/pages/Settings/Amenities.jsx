import React, { useEffect, useState } from "react";
import TableComponent from "../../components/TableComponent";
import axios from "axios";
import AppModal from "../../components/AppModal";
import AddEmployeeModalDetails from "../../components/AddEmployeeModalDetails";
import AddAmenitiesModal from "../../components/AddAmenitiesModal";
import BreadCrumb from "../../components/BreadCrumb";

export default function Amenities() {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [data, setData] = React.useState([]);

  useEffect(() => {
    fetchData();
  }, []);

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
      await response.data.data.map((data, index) => {
        response.data.data[index]["SN"] = i;
        response.data.data[index][
          "image"
        ] = `https://api.tibilon.skillzserver.com/public/${response.data.data[index]["image"]}`;
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
        `${process.env.REACT_APP_API_URL}/amenity/search`,
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
        response.data.data[index][
          "image"
        ] = `https://api.tibilon.skillzserver.com/public/${response.data.data[index]["image"]}`;
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

  const dataKeyAccessors = ["SN", "name", "image"];

  const columns = ["SN", "Name", "Image"];

  const breadCrumbs = [
    {
      name: "Settings",
      link: "/settings",
    },
    {
      name: "Amenities",
      link: "#",
    },
  ];

  return (
    <div className="p-[47px] bg-white h-screen">
      <BreadCrumb breadCrumbs={breadCrumbs} />
      <AppModal
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
        title={"New Amenity"}
      >
        <AddAmenitiesModal fetchData={fetchData} setIsOpen={setIsOpen} />
      </AppModal>
      <div className="font-bold text-[30px] text-left">Amenities Details</div>
      <hr className="mb-8 mt-3" />
      <TableComponent
        actionText="Add Amenities"
        columns={columns}
        data={data}
        action={openModal}
        searchFunction={searchFunction}
        paginationChange={paginationChange}
        dataKeyAccessors={dataKeyAccessors}

      />
    </div>
  );
}
