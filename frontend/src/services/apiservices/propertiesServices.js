import axios from "axios";
import * as urls from "./urls";

let token = localStorage.getItem("token");

console.log(token,'tokentokentoken');

axios.defaults.headers["Authorization"] = `Bearer ${token}`;

export const createProperty = async (data) =>
  axios({
    method: "post",
    url: `${urls.createPropertyUrl}/create`,
    // params: { id },
    data,
  });

export const getPropertiesDetails = async (id) =>
  axios({
    method: "get",
    url: `${urls.getPropertyDetailsUrl}/${id}`,
  });

  export const getProjectPropertiesLists = async (data,link) =>
  axios({
    method: "post",
    url: `${link}`,
    data,
  });


export const deleteProjectProperty = async (id) =>
  axios({
    method: "delete",
    url: `${urls.deletePropertyDetailsUrl}/${id}`,
  });

export const editProjectProperty = async (data, id) =>
  axios({
    method: "post",
    url: `${urls.editPropertyDetailsUrl}/${id}`,
    data,
  });

export const addNewAmenityToProject = async (data, property) =>
  axios({
    method: "post",
    url: `${urls.addAmenityToPropertyUrl}`,
    data,
  });

export const deleteAmenityFromProperty = async (data) =>
  axios({
    method: "delete",
    url: `${urls.deleteAmenityFromPropertyUrl}/${data.id}`,
  });
