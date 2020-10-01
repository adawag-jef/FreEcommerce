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
    ADD_CATEGORY_TO_LIST(state, category) {
      state.categories = [category, ...state.categories];
    },
  },
  actions: {
    async listCategories(ctx, payload) {
      try {
        const response = await categoryApi.listCategories();
        ctx.commit("SET_CATEGORIES_LIST", response.data);
      } catch (error) {}
    },

    async createCategory(ctx, category) {
      try {
        const response = await categoryApi.postCategory(category);
        ctx.commit("ADD_CATEGORY_TO_LIST", response.data);
        return true;
      } catch (error) {
        return false;
      }
    },
  },
};
