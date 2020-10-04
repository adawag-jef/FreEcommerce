import productApi from "../api/productApi";

export default {
  namespaced: true,

  state: () => ({
    products: [],
  }),

  getters: {
    getProducts(state) {
      return state.products;
    },
  },
  mutations: {
    SET_PRODUCT_LIST(state, list) {
      state.products = list;
    },
    ADD_PRODUCT_TO_LIST(state, product) {
      state.products = [product, ...state.products];
    },
    // UPDATE_CATEGORY(state, category) {
    //   state.categories = state.categories.map((item) => {
    //     if (item._id === category._id) {
    //       return category;
    //     }
    //     return item;
    //   });
    // },
    DELETE_PRODUCT(state, id) {
      state.products = state.products.filter((item) => item._id !== id);
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
    // async updateCategory(ctx, { id, category }) {
    //   try {
    //     const response = await categoryApi.updateCategory({ id, category });
    //     ctx.commit("UPDATE_CATEGORY", response.data);
    //     return true;
    //   } catch (error) {
    //     throw error.response.data.error;
    //   }
    // },
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
  },
};
