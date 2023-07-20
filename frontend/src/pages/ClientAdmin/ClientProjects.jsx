import React, { useEffect } from "react";
import ProjectCard from "../../components/ProjectCard";
import { AiOutlineSearch } from "react-icons/ai";
import AddProjectModal from "../../components/AddProjectModal";
import axios from "axios";
import { CircularProgress } from "@mui/material";

export default function ClientProjects() {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [projectData, setProjectData] = React.useState([]);
  const [loading, setLoading] = React.useState(false)
  const [data, setData] = React.useState([]);
  useEffect(() => {
    bootstrap();
  }, []);

  /**
   * bootstrap is called tofetch all projects .
   */
  const bootstrap = async () => {
    setLoading(true)
    let token = localStorage.getItem("clienttoken");
    
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/clientadmin/allprojects`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false)

      setProjectData(response.data.data);
    } catch (error) {
      setLoading(false)
      // Handle the error
      
    }
  };

  const searchData = async (data) => {
    setLoading(true)
    var token = localStorage.getItem("clienttoken");
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/project/search`,
        { query: data },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false)

      setProjectData(response.data.data);
    } catch (error) {
      setLoading(false)
      // Handle the error
      console.error(error);
    }
  };
  const searchFunction = (e) => {
    //Api call to search and update table data
    // Set a timeout to wait for the user to finish typing
    setData(e.target.value); // set input value
    console.log(data);
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

  return (
    <div className="bg-white p-[47px] h-screen">
      <div>Project List</div>
      <div className="flex items-center justify-between mb-[19px]">
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
      </div>
      {loading == true && <CircularProgress />}
      <ProjectCard projectData={projectData} from="client" />
    </div>
  );
}
