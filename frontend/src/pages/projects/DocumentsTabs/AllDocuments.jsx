import React, { useEffect, useState } from "react";
import FileTypeComponent from "../../../components/FileTypeComponent";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { AiOutlineSearch } from "react-icons/ai";
import AddDocumentModal from "../../../components/AddDocumentModal";
import { useParams } from "react-router-dom";
const documents = [
  {
    name: "Mabushi Project",
    date: "23/12/2022",
    type: "docs",
  },
  {
    name: "Mabushi Project",
    date: "23/12/2022",
    type: "pdf",
  },
  {
    name: "Mabushi Project",
    date: "23/12/2022",
    type: "docs",
  },
  {
    name: "Mabushi Project",
    date: "23/12/2022",
    type: "pdf",
  },
  {
    name: "Mabushi Project",
    date: "23/12/2020",
    type: "pdf",
  },
  {
    name: "Mabushi Project",
    date: "23/12/2022",
    type: "docs",
  },
  {
    name: "Mabushi Project",
    date: "23/12/2042",
    type: "pdf",
  },
  {
    name: "Mabushi Project",
    date: "23/12/2029",
    type: "docs",
  },
  {
    name: "Mabushi Project",
    date: "23/12/2034",
    type: "pdf",
  },
];
import InfiniteScroll from "react-infinite-scroll-component";

export default function AllDocuments() {
  const [document, setDocument] = useState([]);
  const [loader, setLoader] = useState(true);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [hasMore, setHasMore] = React.useState(false);
  const [link, setLink] = React.useState(
    `${process.env.REACT_APP_API_URL}/document`
  );
  const [perpage, setPerpage] = React.useState(10);
  const { id } = useParams();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    var token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${link}`,
        { project: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!hasMore) {
        setLoader(true);
      }
      setDocument((prevData) => [...prevData, ...response.data.data]);
      if (response.data.links.next == null) {
        console.log(response.data.links.next, "abc");
        setHasMore(false);
      } else {
        setHasMore(true);
      }
      setLink(response.data.links.next);
      setLoader(false);
    } catch (error) {
      // Handle the error
      setLoader(false);
      console.error(error);
    }
  };

  const fetchDataDel = async () => {
    var token = localStorage.getItem("token");
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/document`, { project: id }, {

        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if(!hasMore){
        setLoader(true)
      }
      setDocument(prevData => [...prevData, ...response.data.data]);
      if(response.data.links.next == null){
        console.log(response.data.links.next,"abc")
        setHasMore(false)
      }else{
        setHasMore(true)
      }
      setLink(response.data.links.next);
      setLoader(false)

    } catch (error) {
      // Handle the error
      setLoader(false)
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
        setDocument(data);
      }
    }, delay);
  };
  const action = async (e) => {
    var token = localStorage.getItem("token");
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/document/delete/${e}`, {

        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLoader(false)
      setLink(`${process.env.REACT_APP_API_URL}/document`)
      setDocument([])
      fetchDataDel()

    } catch (error) {
      // Handle the error
      setLoader(false)
      console.error(error);
    }
  };
  return (
    <div>
      <AddDocumentModal
        setIsOpen={setIsOpen}
        modalIsOpen={modalIsOpen}
        action={fetchData}
        project={id}
      />
      <InfiniteScroll
        dataLength={document.length}
        next={fetchData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        initialScrollY={1}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all.</b>
          </p>
        }
      >
        <div className="bg-white flex gap-4 flex-wrap mt-6">
          <div className="flex justify-center w-[100%]">
            {loader ? <CircularProgress /> : null}
          </div>

          <div className="flex items-center justify-between mb-[19px] w-[100%]">
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
              onClick={() => setIsOpen(true)}
              role="action-button"
            >
              Add New Document
            </div>
          </div>

          {document.length < 1 ? (
            <div className="flex justify-center w-[100%]">
              There is no document at the moment.
            </div>
          ) : null}

          {document?.map((document) => (
            <FileTypeComponent document={document} action={action} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}
