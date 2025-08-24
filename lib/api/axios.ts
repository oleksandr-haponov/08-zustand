import axios from "axios";

const api = axios.create({
  baseURL: "/api", // будем обращаться к /api/notes
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});

export default api;
