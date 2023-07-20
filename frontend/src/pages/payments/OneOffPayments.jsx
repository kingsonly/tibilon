import React from "react";
import TableComponent from "../../components/TableComponent";
import AddPaymentsModal from "../../components/AddPaymentsModal";


export default function OneOffPayments() {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  const data = [
    {
      index: 1,
      name: "Alabi Joshua",
      address: "1 Masarki Close Wuse 2",
      mobile: "080312345678",
      description: "4 Bedroom Terrace Duplex",
      location: "Guzape",
      price: "80,000,000",
      action: "view",
    },
    {
      index: 1,
      name: "James Ipin",
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

  const dataKeyAccessors = ["index","name", "address", "mobile", "description", "location","price", "action" ];

  const searchFunction = () => {
    //Api call to search and update table data
    alert("Fetching search....");
  };

  const paginationChange = (page) => {
    //Api call to paginate and update table data
    alert(`Paginating....page ${page}`);
  };
  return (
    <div>
       <AddPaymentsModal setIsOpen={setIsOpen} modalIsOpen={modalIsOpen} />
      <TableComponent
        actionText="Add New Payment"
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
