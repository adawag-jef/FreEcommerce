import { ApiClient } from "./ApiClient";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.BASE_URL
    : "http://localhost:5000";
let client = new ApiClient(BASE_URL);

export default {
  listProducts: () => {
    return client.get("/api/product");
  },
  postProduct: (product) => {
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    return client.post("/api/product", product, config);
  },
  //   updateCategory: ({ id, category }) => {
  //     return client.put(`/api/category/${id}`, category);
  //   },
  deleteProduct: (id) => {
    return client.delete(`/api/product/${id}`);
  },
};
