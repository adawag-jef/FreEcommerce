import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import Login from "../views/Login.vue";
import adminRoute from "./adminRoute";
import defaultRoute from "./defaultRoute";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../layouts/DefaultLayout"),
    meta: {
      requireAuth: false,
      isAdmin: false,
    },
    children: defaultRoute,
  },
  {
    path: "/admin",
    name: "Admin",
    component: () => import("../layouts/DashboardLayout"),
    meta: {
      requireAuth: true,
      isAdmin: true,
    },
    children: adminRoute,
  },

  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      requireAuth: false,
      isAdmin: false,
    },
  },
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue"),

  //   meta: {
  //     requireAuth: false,
  //     isAdmin: false,
  //   },
  // },
  {
    path: "*",
    name: "NotFound",
    component: () => import("../views/PageNotFound"),
    meta: {
      requireAuth: false,
      isAdmin: false,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// router.beforeEach((to, from, next) => {
//   if (to.matched.some((record) => record.meta.requireAuth)) {
//     const token = localStorage.getItem("token");
//     if (to.matched.some((record) => record.meta.isAdmin) && token) {
//       if (store.getters["auth/getCurrentUser"].role !== "admin") {
//         next("/");
//       } else {
//         next();
//       }
//     } else {
//       next("/");
//     }
//   } else {
//     // debugger;
//     if (to.fullPath === "/login") {
//       if (
//         store.getters["auth/isAuthenticated"] &&
//         store.getters["auth/getCurrentUser"].role === "admin"
//       ) {
//         next("/admin");
//       }
//       if (
//         store.getters["auth/isAuthenticated"] &&
//         store.getters["auth/getCurrentUser"].role === "user"
//       ) {
//         next("/");
//       } else {
//         if (!store.getters["auth/isAuthenticated"]) {
//           next("/");
//         }
//         next();
//       }
//     }
//     next();
//   }
// });
router.beforeEach((to, from, next) => {
  // debugger;
  const token = localStorage.getItem("token");
  if (to.matched.some((record) => record.meta.requireAuth)) {
    if (to.matched.some((record) => record.meta.isAdmin) && token) {
      if (store.getters["auth/getCurrentUser"].role !== "admin") {
        next("/");
      } else {
        next();
      }
    } else {
      next("/");
    }
  } else {
    if (to.fullPath === "/login" && token) {
      if (store.getters["auth/getCurrentUser"].role === "admin") {
        next("/admin");
      } else if (store.getters["auth/getCurrentUser"].role === "user") {
        next("/");
      } else {
        next();
      }
    }
    next();
  }
});

export default router;
