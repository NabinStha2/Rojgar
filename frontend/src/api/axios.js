import axios from "axios";

const rojgarAxios = axios.create({
  baseURL: "http://localhost:4000/",
  headers: {
    Authorization: JSON.parse(localStorage.getItem("userInfo"))
      ? "Bearer " + JSON.parse(localStorage.getItem("userInfo")).accessToken
      : null,
  },
});

export default rojgarAxios;
