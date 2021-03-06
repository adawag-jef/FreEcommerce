import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import auth from "./auth";
import category from "./category";
import product from "./product";
import cart from "./cart";
import transaction from "./transaction";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    }),
  ],
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    category,
    product,
    cart,
    transaction,
  },
});
