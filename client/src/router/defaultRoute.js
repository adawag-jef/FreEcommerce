export default [
  {
    path: "about",
    name: "AboutPage",
    component: () => import("../views/About"),
  },
  {
    path: "checkout",
    name: "CheckoutPage",
    component: () => import("../views/Checkout"),
  },
  {
    path: "",
    name: "HomePage",
    component: () => import("../views/Home"),
  },
];
