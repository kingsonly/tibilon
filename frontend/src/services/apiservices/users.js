import axios from "axios";
import * as urls from "./urls";

let token = localStorage.getItem("token");

axios.defaults.headers["Authorization"] = `Bearer ${token}`;

export const getAllClients = async () =>
  axios({
    method: "post",
    url: `${urls.getClientsUrl}`,
  });


  export const getAllEmployees = async () =>
  axios({
    method: "post",
    url: `${urls.getEmployeesUrl}`,
  });

  export const getAllAffiliates = async () =>
  axios({
    method: "get",
    url: `${urls.getAffiliatesUrl}`,
  });
