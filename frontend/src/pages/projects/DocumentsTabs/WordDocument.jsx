import React, { useEffect, useState } from "react";
import WordDocumentFileComponent from "../../../components/WordDocumentFileComponent";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { AiOutlineSearch } from "react-icons/ai";
import AddDocumentModal from "../../../components/AddDocumentModal";
import { useParams } from "react-router-dom";

export default function WordDocument() {
  const [document, setDocument] = useState([]);
  const [loader, setLoader] = useState(true);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const { id } = useParams();
  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    var token = localStorage.getItem("token");
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/document`, 
      {project:id,fileType:"word"}, {

        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setLoader(false)
      setDocument(response.data.data)


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
  return (
    <div>
      <AddDocumentModal setIsOpen={setIsOpen} modalIsOpen={modalIsOpen} action={fetchData} project={id} allowedTypes={'word'}  />

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
            Add Word Document
          </div>
        </div>

        {
          document.length < 1 ?
            <div className="flex justify-center w-[100%]">
              There is no document at the moment.
            </div> : null

        }


        {document?.map((document) => (
          <WordDocumentFileComponent document={document} />
        ))}
      </div>
    </div>
  );
}


