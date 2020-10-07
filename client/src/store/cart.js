export default {
  namespaced: true,

  state: () => ({
    cart: [],
    total: 0,
  }),

  getters: {
    getCart(state) {
      return state.cart;
    },
    getTotal(state) {
      return state.total;
    },
  },
  mutations: {
    CLEAR_CART(state) {
      state.cart = [];
      state.total = 0;
    },
    ADD_TO_CART(state, item) {
      state.cart = [{ ...item }, ...state.cart];
    },
    REMOVE_FROM_CART(state, id) {
      state.cart = state.cart.filter((item) => item._id !== id);
    },
    INCREASE_ITEM_COUNT(state, product) {
      state.cart = state.cart.map((item) => {
        if (item._id === product._id) {
          item.count++;
        }
        return item;
      });
    },

    REDUCE_ITEM_COUNT(state, product) {
      state.cart = state.cart.map((item) => {
        if (item._id === product._id) {
          item.count--;
        }
        return item;
      });
    },
    COMPUTE_TOTAL(state) {
      state.total = state.cart.reduce((accumulator, currentValue) => {
        return (
          accumulator + parseFloat(currentValue.price) * currentValue.count
        );
      }, 0);
    },
  },
  actions: {
    addToCart(ctx, payload) {
      const cart = ctx.getters.getCart;
      if (cart.find((item) => item._id === payload._id)) {
        ctx.commit("INCREASE_ITEM_COUNT", payload);
        ctx.commit("COMPUTE_TOTAL");
        return;
      }
      payload.count = 1;
      ctx.commit("ADD_TO_CART", payload);
      ctx.commit("COMPUTE_TOTAL");
    },
    increaseItemCount(ctx, product) {
      ctx.commit("INCREASE_ITEM_COUNT", product);
      ctx.commit("COMPUTE_TOTAL");
    },
    reduceItemCount(ctx, product) {
      ctx.commit("REDUCE_ITEM_COUNT", product);
      ctx.commit("COMPUTE_TOTAL");

      const cart = ctx.getters.getCart;
      cart.forEach((item) => {
        if (item.count <= 0) {
          ctx.commit("REMOVE_FROM_CART", item._id);
          ctx.commit("COMPUTE_TOTAL");
        }
      });
    },
  },
};
