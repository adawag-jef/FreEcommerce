import { ApiClient } from "./ApiClient";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.BASE_URL
    : "http://localhost:5000";
let client = new ApiClient(BASE_URL);

export default {
  listCategories: () => {
    return client.get("/api/category");
  },
  postCategory: (category) => {
    return client.post("/api/category", category);
  },
};
