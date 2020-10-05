const express = require("express");
const router = express.Router();

const FeaturedProductController = require("../controllers/FeaturedProductController");
const auth = require("../utilities/auth");
const categoryDto = require("../dto/category");
const Category = require("../models/Category");
const validateDto = require("../middleware/validate-dto");
const unique = require("../middleware/unique");

router
  .route("/")
  .get(FeaturedProductController.listFeaturedProducts)
  .post(
    auth.userAuthenticate,
    auth.isAdmin,
    FeaturedProductController.addProductToFeatured
  );

router
  .route("/:id")
  .put(
    auth.userAuthenticate,
    auth.isAdmin,
    FeaturedProductController.removeProductFromFeatured
  );
//   .delete(
//     auth.userAuthenticate,
//     auth.isAdmin,
//     CategoryController.deleteCategory
//   );

module.exports = router;
