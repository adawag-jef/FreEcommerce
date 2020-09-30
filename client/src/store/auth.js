import authApi from "../api/authApi";

export default {
  namespaced: true,

  state: () => ({
    token: localStorage.getItem("token"),
    user: {},
    isAuthenticated: localStorage.getItem("token") ? true : false,
  }),

  getters: {
    isAuthenticated(state) {
      return state.isAuthenticated;
    },
    getToken(state) {
      return state.token;
    },
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
      localStorage.setItem("token", token);
    },
    SET_CURRENT_USER(state, user) {
      state.user = user;
    },
    REMOVE_TOKEN(state) {
      state.token = "";
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
        console.log(error);
      }
    },

    async currentUser(ctx, payload) {
      try {
        const res = await authApi.currentUser();
        ctx.commit("SET_IS_AUTHENTICATED", true);
        ctx.commit("SET_CURRENT_USER", res.data.user);

        return res.data.user;
      } catch (error) {
        ctx.commit("REMOVE_TOKEN");
        ctx.commit("SET_IS_AUTHENTICATED", false);
        ctx.commit("SET_CURRENT_USER", {});
        return false;
      }
    },

    logout(ctx, payload) {
      ctx.commit("REMOVE_TOKEN");
      ctx.commit("SET_IS_AUTHENTICATED", false);
      ctx.commit("SET_CURRENT_USER", {});
    },
  },
};
