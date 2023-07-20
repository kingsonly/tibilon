import React, { useRef } from "react";

export default function UploadButton({
  leftIcon,
  rightIcon,
  handleOnChange,
  text,
}) {
  const fileRef = useRef(null);
  return (
    <div className=" h-[58px] m-[8px] flex justify-between items-center  w-[100%]">
      <div
        onClick={() => {
          fileRef.current.click();
        }}
        className="border-2 flex rounded-md h-[100%] w-[100%]"
      >
        <div className="border-r-2 p-2 flex items-center ">
          <img src={leftIcon} alt="house" />
        </div>
        <div className="w-[100%] text-center flex items-center font-medium text-[15px] p-2 gap-4 cursor-pointer">
          <div
            className="w-[80%]"
          >
            <input
              type="file"
              onChange={handleOnChange}
              style={{ display: "none" }}
              ref={fileRef}
            />
            {text}
          </div>
          <div clasName="text-center ">
            <img src={rightIcon} alt="upload" />
          </div>
        </div>
      </div>
    </div>
  );
}
