import React from "react";

export default function ProjectActionCards({ name, image }) {
  return (
    <div
      className="w-[180px] h-[150px] bg-[#FFFFFF] flex flex-col items-center justify-center gap-[25px] mb-12"
      style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
    >
      <div>
        <img src={image} alt="icon" />
      </div>
      <div className="font-bold text-[15px]">{name}</div>
    </div>
  );
}
