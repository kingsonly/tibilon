import axios from "axios";
import * as urls from "./urls";

let token = localStorage.getItem("token");

axios.defaults.headers["Authorization"] = `Bearer ${token}`;

export const getAllPropertyPayments = async (property) =>
  axios({
    method: "post",
    url: `${urls.getAllPaymentsUrl}/${property.id}`,
  });

  export const getViewPayment = async () =>
  axios({
    method: "post",
    url: `${urls.getViewPaymentUrl}`,
  });


  export const makePropertyPayment = async (data) =>
  axios({
    method: "post",
    url: `${urls.makePropertyPaymentyUrl}`,
    data,
  });