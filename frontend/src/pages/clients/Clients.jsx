import React, { useEffect,useRef } from "react";
import TableComponent from "../../components/TableComponent";
import AddProjectModal from "../../components/AddProjectModal";
import AddClientModal from "../../components/AddClientModal";
import axios from "axios";


export default function Clients() {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [viewModalIsOpen, setViewModalIsOpen] = React.useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = React.useState(false);
  const [perpage, setPerpage] = React.useState(10);
  const [hasMore, setHasMore] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [link, setLink] = React.useState(`${process.env.REACT_APP_API_URL}/client`);
  
  
  const fetchData = async () => {
    
    var token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${link}`,
        {perpage:perpage},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      let i = data.length+1;
       
      await response.data.data.map((data, index) => {
        response.data.data[index]["SN"] = i;
        response.data.data[index]["address"] = response.data.data[index]["address"].full_address;
        // response.data.data[index][
        //   "image"
        // ] = `${imageBaseUrl}/${response.data.data[index]["image"]}`;
        i++;
      });


      console.log(response,'responseresponse');
      
      
      setData(prevData => [...prevData, ...response.data.data]);
      if(response.data.links.next == null){
        console.log(response.data.links.next,"abc")
        setHasMore(false)
      }else{
        setHasMore(true)
      }
      setLink(response.data.links.next);
      
    } catch (error) {
      // Handle the error
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  },[]);
  const searchData = async (data) => {
    var token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/client/search`,
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
        // response.data.data[index][
        //   "image"
        // ] = `${imageBaseUrl}/${response.data.data[index]["image"]}`;
        i++;
      });

      setData(response.data.data);
    } catch (error) {
      // Handle the error
      console.error(error);
    }
  };

  
  const columns = ["S/No", "Client Name", "email", "Phone No", "Client Type", "Address"];

  const dataKeyAccessors = [
    "SN",
    "name",
    "email",
    "phone",
    "type",
    "address", 
    "CTA",
  ];

  console.log(data,'datadatadata');

  const searchFunction = () => {
    //Api call to search and update table data
    alert("Fetching search....");
  };

  const paginationChange = (page) => {
    //Api call to paginate and update table data
    //alert(`Paginating....page ${page}`);
    setPerpage(page);
    setLink(`${process.env.REACT_APP_API_URL}/client`)
    fetchData()
  };

  const showPaymentModal = () => {
    // setopenPaymentModal(true);
    setIsOpen(true);
  };

  const displayClientList = () => {
    // setopenPaymentModal(true);
    setViewModalIsOpen(true);
  };
  const editClientModal = () => {
    // setopenPaymentModal(true);
    setEditModalIsOpen(true);
  };
  const deleteAction = (id) => {
    setData(data.filter((datas) => datas != id));
    console.log(id)
  };


  return (
    <div className="bg-[white] p-[47px]">
      <hr className="my-6" />
      <AddClientModal setIsOpen={setIsOpen} modalIsOpen={modalIsOpen} fetchData={fetchData}  />
      <TableComponent
        actionText="Add New Client"
        columns={columns}
        data={data}
        hasMore={hasMore}
        action={showPaymentModal}
        searchFunction={searchFunction}
        paginationChange={paginationChange}
        dataKeyAccessors={dataKeyAccessors}
        fetchMoreDataProps={fetchData}
        
      />
    </div>
  );
}
