import React from "react";
import TabComponent from "../../components/TabComponent";
import AllContractors from "./AllContractors";
import Vendors from "./Vendors";
import SubPageName from "../../components/SubPageName";

const components = [
  {
    id: 1,
    component: AllContractors,
    header: "Contractors",
  },
  {
    id: 2,
    component: Vendors,
    header: "Vendors",
  },
];

export default function Contractors() {
  return (
    <div className="bg-white p-[47px]">
      <SubPageName name="Contractors Details"/>
      <hr />
      <div className="m-0" >
        <TabComponent components={components} />
      </div>
    </div>
  );
}
