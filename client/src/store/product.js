import productApi from "../api/productApi";
import featuredApi from "../api/featuredApi";

export default {
  namespaced: true,

  state: () => ({
    products: [],
    featuredProducts: [],
  }),

  getters: {
    getProducts(state) {
      return state.products;
    },
    getFeaturedProducts(state) {
      return state.featuredProducts;
    },
  },
  mutations: {
    SET_PRODUCT_LIST(state, list) {
      state.products = list;
    },
    ADD_PRODUCT_TO_LIST(state, product) {
      state.products = [product, ...state.products];
    },
    UPDATE_PRODUCT(state, product) {
      state.products = state.products.map((item) => {
        if (item._id === product._id) {
          return product;
        }
        return item;
      });
    },
    DELETE_PRODUCT(state, id) {
      state.products = state.products.filter((item) => item._id !== id);
    },
    // featured
    SET_FEATURED_PRODUCTS(state, products) {
      state.featuredProducts = products;
    },
    ADD_FEATURED_PRODUCTS(state, featuredProduct) {
      state.featuredProducts = [featuredProduct, ...state.featuredProducts];
    },
    REMOVE_FEATURED_PRODUCTS(state, id) {
      state.featuredProducts = state.featuredProducts.filter(
        (item) => item._id !== id
      );
    },
  },
  actions: {
    async listProducts(ctx, payload) {
      try {
        const response = await productApi.listProducts();
        ctx.commit("SET_PRODUCT_LIST", response.data);
      } catch (error) {}
    },
    async createProduct(ctx, product) {
      try {
        let formData = new FormData();
        for (var key in product) {
          formData.append(key, product[key]);
        }
        const response = await productApi.postProduct(formData);
        ctx.commit("ADD_PRODUCT_TO_LIST", response.data);
        return true;
      } catch (error) {
        throw error.response.data.error;
      }
    },
    async updateProduct(ctx, { id, product }) {
      if (typeof product.category[0] === "object") {
        product.category = product.category.map((item) => item._id);
      }

      try {
        let formData = new FormData();
        for (var key in product) {
          formData.append(key, product[key]);
        }
        const response = await productApi.updateProduct({
          id,
          product: formData,
        });
        ctx.commit("UPDATE_PRODUCT", response.data);
        return true;
      } catch (error) {
        throw error.response.data.error;
      }
    },
    async deleteProduct(ctx, id) {
      try {
        ctx.commit("DELETE_PRODUCT", id);
        await productApi.deleteProduct(id);
        return true;
      } catch (error) {
        console.log(error);

        throw error.response.data.error;
      }
    },
    async listFeaturedProducts(ctx, payload) {
      try {
        const response = await featuredApi.listProducts();
        ctx.commit("SET_FEATURED_PRODUCTS", response.data);
      } catch (error) {
        throw error;
      }
    },
    async addFeaturedProduct(ctx, payload) {
      try {
        const response = await featuredApi.addProduct(payload);
        ctx.commit("ADD_FEATURED_PRODUCTS", response.data);
        return response.data;
      } catch (error) {
        console.log(error);
        throw error.response.data.error;
      }
    },
    async removeFeaturedProduct(ctx, payload) {
      try {
        const response = await featuredApi.removeProduct(payload);
        ctx.commit("REMOVE_FEATURED_PRODUCTS", payload);
        return response.data;
      } catch (error) {
        console.log(error);
        throw error.response.data.error;
      }
    },
  },
};
