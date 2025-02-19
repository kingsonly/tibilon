import React, { useEffect, useState } from "react";
import ProjectPropertyCard from "../../components/ProjectPropertyCard";
import DetailedPropertyCard from "../../components/DetailedPropertyCard";
import { AiOutlineSearch } from "react-icons/ai";
import { projectData } from "../../data";
import BreadCrumb from "../../components/BreadCrumb";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import AddPropertyModal from "../../components/AddPropertyModal";
import {
  getProjectPropertiesLists,
  getPropertiesDetails,
} from "../../services/apiservices/propertiesServices";
import { CircularProgress } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";

export default function ProjectProperties() {
  const [properties, setProperties] = useState([]);
  const { id } = useParams();
  const { state } = useLocation();
  var token = localStorage.getItem("token");
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [amenities, setAmenities] = useState();
  const [projectStat, setProjectStat] = useState();
  const [property, setproperty] = useState();
  const [isEdit, setisEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = React.useState(false);
  const [link, setLink] = React.useState(
    `${process.env.REACT_APP_API_URL}/property`
  );
  const [perpage, setPerpage] = React.useState(10);

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
        ] = `${response.data.data[index]["image"]}`;
        i++;
      });

      setAmenities(response.data.data);
    } catch (error) {
      // Handle the error
      console.error(error);
    }
  };

  const getProjectDashboard = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/property/stats/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProjectStat(response.data.data);
    } catch (error) {
      // Handle the error
      console.error(error, "error fetching stats");
    }
  };

  const searchFunction = async (e) => {
    if (e.target.value.length >= 3) {
      let query = e.target.value;
      let data = {
        query: query,
      };
      axios
        .post(`${process.env.REACT_APP_API_URL}/property/search`, data)
        .then((response) => {
          setProperties(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (e.target.value.length == 0){
      getProperties()
    }
  };

  // const getProperties = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await getProjectPropertiesLists(
  //       { id, per_page: perpage },
  //       link
  //     );
  //     setLoading(false);
  //     setProperties((prevData) => [...prevData, ...response.data.data]);
  //     if (response.data.links.next == null) {
  //       console.log(response.data.links.next, "abc");
  //       setHasMore(false);
  //     } else {
  //       setHasMore(true);
  //     }
  //     setLink(response.data.links.next);
  //   } catch (error) {
  //     setLoading(false);
  //     console.error(error);
  //   }
  // };

  const getProperties = async () => {
    try {
      setLoading(true);
      const response = await getProjectPropertiesLists(
        { id, per_page: perpage },
        link
      );
      setLoading(false);
      if (response.data.links.next === null) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
      setLink(response.data.links.next);
  
  
      // Create a new array with the updated properties
      const updatedProperties = [...properties, ...response.data.data];
  
      // Set the state with the new array
      setProperties(updatedProperties);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };


  useEffect(() => {
    getProjectDashboard();
    fetchData();
    getProperties();
    // getPropertyLists();
  }, [token]);

  const openEditModal = () => {
    setIsOpen(true);
    setisEdit(true);
  };

  const breadCrumbs = [
    {
      name: "Project Actions",
      link: `/projects/actions/${state?.id}/${state?.name}`,
    },
    {
      name: "Project Property",
      link: "#",
    },
  ];

  console.log(properties, "propertiesproperties");
  return (
    <div className="bg-white h-screen p-8">
      <BreadCrumb breadCrumbs={breadCrumbs} />
      <AddPropertyModal
        setIsOpen={setIsOpen}
        modalIsOpen={modalIsOpen}
        amenitiesTypes={amenities}
        editProperty={property}
        isEdit={isEdit}
        fetchAction={getProperties}
      />
      <div className="bg-[#FBFBFB] h-[100%] p-8">
        <div className="font-bold text-[20px] mb-8">Project DashBoard</div>

        <hr className="m-y-8" />
        <div className="flex justify-between">
          <div className="">
            <ProjectPropertyCard
              title={"Total Payment"}
              value={projectStat?.totalPayment}
              valueColor={"#8A8A8A"}
              type="amount"
            />
          </div>
          <div className="">
            <ProjectPropertyCard
              title={"Total Amount Paid"}
              value={projectStat?.totalAmountPaid}
              valueColor={"#8A8A8A"}
              type="amount"
            />
          </div>
          <div className="">
            <ProjectPropertyCard
              title={"Payment Balance"}
              value={projectStat?.paymentBalance}
              valueColor={"#8A8A8A"}
              type="amount"
            />
          </div>
        </div>
        <div className="flex justify-between mt-8">
          <div className="">
            <ProjectPropertyCard
              title={"Total Property"}
              value={projectStat?.totalProperty}
              valueColor={"#8A8A8A"}
            />
          </div>
          <div className="">
            <ProjectPropertyCard
              title={"Total Property Available"}
              value={projectStat?.totalPropertyAvailable}
              valueColor={"#40A74E"}
            />
          </div>
          <div className="">
            <ProjectPropertyCard
              title={"Total Property Sold"}
              value={projectStat?.totalPropertySold}
              valueColor={"#DD2025"}
            />
          </div>
        </div>
        <div className="mt-8">
          <div className="font-bold text-[20px]">Property List</div>

          <hr className="m-y-4" />

          <div className="flex justify-between mt-10">
            <div className="border-2 rounded w-[292px] h-[45px] flex items-center">
              <div className="flex items-center justify-center border-r-2 h-[100%] w-[47px]">
                <AiOutlineSearch role="search-icon" />
              </div>
              <input
                className="w-[100%] ml-[20px] border-none focus:outline-0 placeholder-red-300::placeholder"
                placeholder="Quick Search"
                onChange={searchFunction}
                role="search-input"
              />
            </div>

            <div
              className="border-2 rounded w-[200px] h-[48px] bg-[#40A74E] text-white flex items-center text-[15px] font-bold justify-center cursor-pointer"
              onClick={() => {
                setisEdit(false);
                setproperty({});
                setIsOpen(true);
              }}
              role="action-button"
            >
              Add New Property
            </div>
          </div>
        </div>
        <InfiniteScroll
          dataLength={properties.length}
          next={getProperties}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          initialScrollY={1}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <div className="flex flex-wrap mt-20 justify-between align-between">
            {loading && (
              <div className="flex items-center justify-center w-[100%] mb-[20px]">
                <CircularProgress />
              </div>
            )}

            {properties?.map((project) => (
              <div className="w-1/2">
                <DetailedPropertyCard
                  project={project}
                  openEditModal={openEditModal}
                  setproperty={setproperty}
                  fetchAction={getProperties}
                />
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
}
