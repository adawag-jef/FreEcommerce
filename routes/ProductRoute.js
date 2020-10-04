const express = require("express");
const router = express.Router();

const ProductController = require("../controllers/ProductController");
const auth = require("../utilities/auth");
const productDto = require("../dto/product");
const Product = require("../models/Product");
const validateDto = require("../middleware/validate-dto");
const unique = require("../middleware/unique");
const fileValidation = require("../middleware/file-validation");

router
  .route("/")
  .get(auth.userAuthenticate, auth.isAdmin, ProductController.listProducts)
  .post(
    auth.userAuthenticate,
    auth.isAdmin,
    validateDto(productDto),
    fileValidation,
    ProductController.createProduct
  );

router
  .route("/:id")
  .put(
    auth.userAuthenticate,
    auth.isAdmin,
    validateDto(productDto),
    // fileValidation,
    ProductController.editProduct
  )
  .delete(auth.userAuthenticate, auth.isAdmin, ProductController.deleteProduct);

module.exports = router;
