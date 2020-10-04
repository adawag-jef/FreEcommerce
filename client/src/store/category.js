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
    UPDATE_CATEGORY(state, category) {
      state.categories = state.categories.map((item) => {
        if (item._id === category._id) {
          return category;
        }
        return item;
      });
    },
    DELETE_CATEGORY(state, id) {
      state.categories = state.categories.filter((item) => item._id !== id);
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
        throw error.response.data.error;
      }
    },
    async updateCategory(ctx, { id, category }) {
      try {
        const response = await categoryApi.updateCategory({ id, category });
        ctx.commit("UPDATE_CATEGORY", response.data);
        return true;
      } catch (error) {
        throw error.response.data.error;
      }
    },
    async deleteCategory(ctx, id) {
      try {
        await categoryApi.deleteCategory(id);
        ctx.commit("DELETE_CATEGORY", id);
        return true;
      } catch (error) {
        throw error.response.data.error;
      }
    },
  },
};
