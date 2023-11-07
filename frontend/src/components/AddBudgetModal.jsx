import { Button } from "@mui/material";
import React, { useState } from "react";
import AppModal from "./AppModal";
import SnackbarComponent from "./SnackbarComponent";
import TextInput from "./TextInput";

export default function AddBudgetModal(props) {
  const { modalIsOpen, setIsOpen, data, readOnly } = props;
  const [loading, setLoading] = React.useState(false);


  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div>
      <SnackbarComponent
      //  status={status} show={show} message={message}
      />
      {/* <AppModal
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
        // title={"Add New Client"}
      > */}
        <div>
          <div className="flex justify-center items-center ">
            <div className="text-2xl font-semibold">Create New Budget</div>
          </div>
          <hr className="mt-3 border-2 w-[100%] border-b-grey-500"></hr>
          <div className="mt-12 flex justify-center items-center flex-col ">
            <div>
              <input
                type="text"
                className="border border-gray-300 rounded-md p-2 
                  w-96 h-20 text-lg text-black outline-none p-6"
                id="inputfield"
                placeholder="Budget Title"
                disabled={readOnly}
              />
            </div>
            <div className=" mt-10">
              <input
                type="text"
                className="border border-gray-300 rounded-md p-2 w-96 h-20 text-lg text-black outline-none p-6	"
                id="inputfield"
                placeholder="Number Of Units"
                disabled={readOnly}
                
              />
            </div>
            <div className=" mt-10">
              <textarea
                className="border border-gray-300 rounded-md p-2 w-96 h-40 text-lg text-black	outline-none p-6"
                id="inputfield"
                placeholder="Enter description..."
                disabled={readOnly}
              />
            </div>
            <div className=" mt-6">
            {!readOnly && (
              <Button
                sx={{
                  textTransform: "none",
                  fontSize: "18px",
                  width: "180px",
                  height: "50px"
                }}
                variant="contained"
                color="success"
                onClick={() => submit(false)}
              >
               
                {!loading ? "Create" : "Loading......"}
              </Button>
               )}
            </div>
          </div>
        </div>
      {/* </AppModal> */}
    </div>
  );
}
