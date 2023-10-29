import React, { useEffect } from "react";
import AppModal from "./AppModal";
import AddAffiliateModalDetails from "./AddAffiliateModalDetails";

export default function AffiliateEditModalComponent(props) {
  const { modalIsOpen, setIsOpen ,editAction} = props;
  const [data, setData] = React.useState([]);

  useEffect(() => {
  console.log(editAction, "kkkkkkkkkkk")
  },[])
  

  return (
    <div>
      <AppModal 
      modalIsOpen={modalIsOpen} 
      setIsOpen={setIsOpen}
      editAction={editAction}
      >
        
        <AddAffiliateModalDetails />
         
      </AppModal>
    
    </div>
  );
}
