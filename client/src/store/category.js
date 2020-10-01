import categoryApi from "../api/categoryApi";

export default {
  namespaced: true,

  state: () => ({
    categories: [],
  }),

  getters: {
    getCategories(state) {
      return state.categories;
    },
  },
  mutations: {
    SET_CATEGORIES_LIST(state, list) {
      state.categories = list;
    },
  },
  actions: {
    async listCategories(ctx, payload) {
      try {
        const response = await categoryApi.listCategories();
        ctx.commit("SET_CATEGORIES_LIST", response.data);
      } catch (error) {}
    },
  },
};
