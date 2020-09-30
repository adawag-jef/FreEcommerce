import { ApiClient } from "./ApiClient";

let client = new ApiClient("http://localhost:5000");

export default {
  login: (user) => {
    return client.post("/api/auth/login", user);
  },
  register: (user) => {
    return client.post("/api/auth/register", user);
  },
  logout: () => {
    return client.get("/api/user/logout");
  },
  currentUser: () => {
    return client.get("/api/auth/user");
  },
};
