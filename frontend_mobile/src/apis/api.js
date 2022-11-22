import axios from "axios";

const api = axios.create({
  baseURL: "https://j7a102.p.ssafy.io/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
