import React from "react";
import TextInput from "../../../components/TextInput";

export default function CompleteBookings() {
  return (
    <div>
      <TextInput
        required
        value={"propertyName"}
        label={"Phone Number"}
        onChange={(e) => {
          console.log(e.target.value);
        }}
      />
    </div>
  );
}
