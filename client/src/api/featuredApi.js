import { ApiClient } from "./ApiClient";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.BASE_URL
    : "http://localhost:5000";
let client = new ApiClient(BASE_URL);

export default {
  listProducts: () => {
    return client.get("/api/featured");
  },
  addProduct: (product_id) => {
    return client.post("/api/featured", { product_id });
  },
  removeProduct: (product_id) => {
    return client.put(`/api/featured/${product_id}`);
  },
  //   updateProduct: ({ id, product }) => {
  //     const config = { headers: { "Content-Type": "multipart/form-data" } };
  //     return client.put(`/api/product/${id}`, product, config);
  //   },
  //   deleteProduct: (id) => {
  //     return client.delete(`/api/product/${id}`);
  //   },
};
