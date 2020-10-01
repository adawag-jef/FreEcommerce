const express = require("express");
const router = express.Router();

const CategoryController = require("../controllers/CategoryController");
const auth = require("../utilities/auth");

// router.get(
//   "/",
//   auth.userAuthenticate,
//   auth.isAdmin,
//   CategoryController.listCategories
// );

router
  .route("/")
  .get(auth.userAuthenticate, auth.isAdmin, CategoryController.listCategories)
  .post(auth.userAuthenticate, auth.isAdmin, CategoryController.createCategory);

module.exports = router;
