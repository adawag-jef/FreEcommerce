import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../components/DefaultLayout"),
    meta: {
      requireAuth: false,
      isAdmin: false,
    },
    children: [
      {
        path: "about",
        name: "AboutPage",
        component: () => import("../views/About"),
      },
      {
        path: "",
        name: "HomePage",
        component: () => import("../views/Home"),
      },
    ],
  },
  {
    path: "/admin",
    name: "Admin",
    component: () => import("../components/DashboardLayout"),
    meta: {
      requireAuth: true,
      isAdmin: true,
    },
    children: [
      {
        path: "users/:id",
        name: "SingelUser",
        component: () => import("../views/SingleUser"),
      },
      {
        path: "users",
        name: "UserManagement",
        component: () => import("../views/UserManagement"),
      },
      {
        path: "products",
        name: "ProductManagement",
        component: () => import("../views/ProductManagement"),
      },
      {
        path: "categories",
        name: "CategoryManagement",
        component: () => import("../views/CategoryManagement"),
      },
      {
        path: "transactions",
        name: "Transactions",
        component: () => import("../views/Transactions"),
      },
      {
        path: "",
        name: "Dashboard",
        component: () => import("../views/Dashboard"),
      },
    ],
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

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requireAuth)) {
    const token = localStorage.getItem("token");
    if (to.matched.some((record) => record.meta.isAdmin) && token) {
      if (store.getters["auth/getCurrentUser"].role !== "admin") {
        next("/");
      } else {
        next();
      }
    } else {
      next("/login");
    }
  } else {
    if (to.fullPath === "/login") {
      if (
        store.getters["auth/isAuthenticated"] &&
        store.getters["auth/getCurrentUser"].role === "admin"
      ) {
        next("/admin");
      }
      if (
        store.getters["auth/isAuthenticated"] &&
        store.getters["auth/getCurrentUser"].role === "user"
      ) {
        next("/");
      } else {
        next();
      }
    }
    next();
  }
});

export default router;
