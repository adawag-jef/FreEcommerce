import { ApiClient } from "./ApiClient";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.BASE_URL
    : "http://localhost:5000";
let client = new ApiClient(BASE_URL);

export default {
  //   listProducts: () => {
  //     return client.get("/api/product");
  //   },
  sendTransaction: (transaction) => {
    return client.post("/api/transaction", transaction);
  },
  //   updateProduct: ({ id, product }) => {
  //     const config = { headers: { "Content-Type": "multipart/form-data" } };
  //     return client.put(`/api/product/${id}`, product, config);
  //   },
  //   deleteProduct: (id) => {
  //     return client.delete(`/api/product/${id}`);
  //   },
};
