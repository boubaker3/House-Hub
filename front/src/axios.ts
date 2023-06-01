import axios from "axios";
const token = localStorage.getItem("token");

const api = axios.create({
  baseURL: "http://localhost:8000/api/",
});
 
api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
api.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';

export default api;
