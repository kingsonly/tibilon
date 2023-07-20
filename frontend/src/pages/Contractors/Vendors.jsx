import React from 'react'
import TableComponent from '../../components/TableComponent';
import { useNavigate } from 'react-router-dom';


export default function Vendors() {
    let navigate = useNavigate();
    const data = [
      {
        index: 1,
        name: "Toks joww",
        address: "1 Masarki Close Wuse 2",
        mobile: "080312345678",
        description: "4 Bedroom Terrace Duplex",
        location: "Guzape",
        price: "80,000,000",
        action: "view",
      },
      {
        index: 1,
        name: "Micahel Hiwwk",
        address: "12 Dalaba Street, Lugbe",
        mobile: "080312345678",
        description: "2 Bedroom Block of Flats",
        location: "Jahi",
        price: "75,000,000",
        action: "view",
      },
      {
        index: 1,
        name: "Mrs jay Audu",
        address: "1 Masarki Close Wuse 2",
        mobile: "080312345678",
        description: "4 Bedroom Terrace Duplex",
        location: "Guzape",
        price: "80,000,000",
        action: "view",
      },
      {
        index: 1,
        name: "Alh. Musa Bawa",
        address: "1 Masarki Close Wuse 2",
        mobile: "080312345678",
        description: "4 Bedroom Terrace Duplex",
        location: "Guzape",
        price: "80,000,000",
        action: "view",
      },
      {
        index: 1,
        name: "Alh. Musa Bawa",
        address: "1 Masarki Close Wuse 2",
        mobile: "080312345678",
        description: "4 Bedroom Terrace Duplex",
        location: "Guzape",
        price: "80,000,000",
        action: "view",
      },
    ];
  
    const columns = [
      "S/No",
      "Client Name",
      "Address",
      "Phone No",
      "Property Type",
      "Location",
      "Price(₦)",
      "Payments",
    ];
  
    const dataKeyAccessors = [
      "index",
      "name",
      "address",
      "mobile",
      "description",
      "location",
      "price",
      "action",
    ];
  
    const searchFunction = () => {
      //Api call to search and update table data
      alert("Fetching search....");
    };
  
    const paginationChange = (page) => {
      //Api call to paginate and update table data
      alert(`Paginating....page ${page}`);
    };
  
    const showCreationCreate = () => {
      // /contractors-create
      navigate("/contractors-create");
    };
  return (
    <div>
    <hr />
    <TableComponent
      actionText="Add New Contractor"
      columns={columns}
      data={data}
      action={showCreationCreate}
      searchFunction={searchFunction}
      paginationChange={paginationChange}
      dataKeyAccessors={dataKeyAccessors}
    />
  </div>
  )
}
