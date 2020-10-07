import authApi from "../api/authApi";
import router from "../router";

export default {
  namespaced: true,

  state: () => ({
    user: {},
    isAuthenticated: false,
  }),

  getters: {
    isAuthenticated(state) {
      return state.isAuthenticated;
    },
    getCurrentUser(state) {
      return state.user;
    },
  },
  mutations: {
    SET_TOKEN(state, token) {
      localStorage.setItem("token", token);
    },
    SET_CURRENT_USER(state, user) {
      state.user = user;
    },
    REMOVE_TOKEN(state) {
      localStorage.removeItem("token");
    },
    SET_IS_AUTHENTICATED(state, value) {
      state.isAuthenticated = value;
    },
  },
  actions: {
    async login(ctx, user) {
      try {
        const res = await authApi.login(user);
        ctx.commit("SET_TOKEN", res.data.token);
        ctx.commit("SET_IS_AUTHENTICATED", true);
        ctx.commit("SET_CURRENT_USER", res.data.user);
        return res.data.success;
      } catch (error) {
        throw new Error(error.response.data.msg);
      }
    },

    async currentUser(ctx, payload) {
      try {
        const res = await authApi.currentUser();
        ctx.commit("SET_IS_AUTHENTICATED", true);
        ctx.commit("SET_CURRENT_USER", res.data.user);

        return res.data.user;
      } catch (error) {
        debugger;
        ctx.commit("REMOVE_TOKEN");
        ctx.commit("SET_IS_AUTHENTICATED", false);
        ctx.commit("SET_CURRENT_USER", null);
        return false;
      }
    },

    logout(ctx, payload) {
      ctx.commit("REMOVE_TOKEN");
      ctx.commit("SET_IS_AUTHENTICATED", false);
      ctx.commit("SET_CURRENT_USER", null);
      sessionStorage.clear();
      if (router.currentRoute.fullPath !== "/login") {
        router.push("/");
      }
    },
  },
};
