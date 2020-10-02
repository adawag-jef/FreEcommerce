import Vue from "vue";
import Toasted from "vue-toasted";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/styles/index.css";

Vue.use(Toasted, { position: "bottom-right", duration: 2000 });

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
