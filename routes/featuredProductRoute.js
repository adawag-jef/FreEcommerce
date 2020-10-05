const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const FeaturedProduct = mongoose.model("FeaturedProduct");

const FeaturedProductController = require("../controllers/FeaturedProductController");
const auth = require("../utilities/auth");
const featuredDto = require("../dto/featured");
const validateDto = require("../middleware/validate-dto");
const unique = require("../middleware/unique");

router
  .route("/")
  .get(FeaturedProductController.listFeaturedProducts)
  .post(
    auth.userAuthenticate,
    auth.isAdmin,
    validateDto(featuredDto),
    unique(
      FeaturedProduct,
      "product_id",
      "This product already exist in featured list."
    ),
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
