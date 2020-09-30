import { ApiClient } from "./ApiClient";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.BASE_URL
    : "http://localhost:5000";
let client = new ApiClient(BASE_URL);

export default {
  login: (user) => {
    return client.post("/api/auth/login", user);
  },
  register: (user) => {
    return client.post("/api/auth/register", user);
  },
  // logout: () => {
  //   return client.get("/api/user/logout");
  // },
  currentUser: () => {
    return client.get("/api/auth/user");
  },
};
