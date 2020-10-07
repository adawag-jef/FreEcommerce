import transactionApi from "../api/transactionApi";

export default {
  namespaced: true,

  state: () => ({
    transactionForm: {},
    errors: {},
  }),

  getters: {
    getTransactionForm(state) {
      return state.transactionForm;
    },
    getErrors(state) {
      return state.errors;
    },
  },
  mutations: {
    // SET_TRANSACTION_FORM(state, form) {
    //     state.transactionForm = form
    // }
  },
  actions: {
    async sendTransaction(ctx, form) {
      const cart = ctx.rootGetters["cart/getCart"];
      const products = cart.map((prd) => ({ item: prd._id, count: prd.count }));

      try {
        const res = await transactionApi.sendTransaction({ ...form, products });
        return res;
      } catch (error) {
        throw error.response.data.error;
      }
    },
  },
};
