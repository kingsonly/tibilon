import React from "react";
import AppModal from "./AppModal";
import AffiliateViewModalContent from "./AffiliateViewModalContent";

export default function AffiliateViewModalComponent(props) {
  const { modalIsOpen, setIsOpen } = props;

  return (
    <div>
      <AppModal
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
        // title={"AFFILIATE DETAILS MAIN"}
      >
        <AffiliateViewModalContent />
      </AppModal>
    </div>
  );
}
