import React from "react";

export default function ProjectPropertyCard({
  title,
  value,
  valueColor,
  type,
}) {
  return (
    <div
      style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
      className="w-[300px] bg-white h-[158px] flex flex-col justify-center"
    >
      <div
        className="text-[#D7B569] border-b-2 border-b-[#D7B569] pb-4 text-[20px]"
        style={{ borderBottom: "" }}
      >
        {title}
      </div>
      <div
        style={{ color: `${valueColor}` }}
        className="text-[40px] flex items-center justify-center"
      >
        {type == "amount" && "₦"}
        {value?.toLocaleString()}
      </div>
    </div>
  );
}
