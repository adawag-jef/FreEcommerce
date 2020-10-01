export default [
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
];
