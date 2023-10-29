import React, { useState } from "react";
import TextInput from "./TextInput";
import TableComponent from "./TableComponent";

export default function AffiliateViewModalContent() {
  const [data, setData] = React.useState([]);

  const dataKeyAccessors = ["Client Name", "Amount"];

  const columns = ["Client Name", "Amount"];

  const [employeeInfo, setEmployeeInfo] = useState([
    {
      EmployeeID: 10,
      PhoneNumber: 8109771480,
      EmailAddress: "bukky@gamil.com",
      Designation: "Admin",
      Department: "Sales & MArketing",
    },
  ]);

  console.log(data, "vvvvvvvvv");

  return (
    <div>
      {/* {employeeInfo.map((info) => (
        <div key={info.id}>
          <div>{info.EmployeeID}</div>
          <div>{info.PhoneNumber}</div>
          <div>{info.EmailAddress}</div>
          <div>{info.Designation}</div>
          <div>{info.Department}</div>
        </div>
      ))} */}

      <div>
        <div className="text-3xl font-semibold">
          Obinna Adaku: Sales Information
        </div>
        <hr className="mb-8 mt-3"></hr>
        <div className="flex space-x-4 ">
          <TextInput
            className="w-[18%] h-10 border border-grey-400 p-2 shadow-lg"
            type="date"
            label="Select Year"
            views={["year"]}
          />
          <TextInput
            className="w-[18%] h-10 border border-grey-400 p-2 shadow-lg"
            type="date"
            label="Select Month"
            views={["month"]}
            // openTo="Month"
          />
        </div>
      </div>
      <div className="mt-8">
        <TableComponent
          data={data}
          columns={columns}
          dataKeyAccessors={dataKeyAccessors}
        />
      </div>
    </div>
  );
}
