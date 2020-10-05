export default [
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
    path: "categories",
    name: "CategoryManagement",
    component: () => import("../views/CategoryManagement"),
  },
  {
    path: "products",
    name: "ProductManagement",
    component: () => import("../views/ProductManagement"),
  },
  {
    path: "site",
    name: "SiteManagement",
    component: () => import("../views/SiteManagement"),
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
];
