import axios from "axios";

const api = axios.create({
  baseURL: "/api", // будем обращаться к /api/notes
});

export default api;