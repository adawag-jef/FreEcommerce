const express = require("express");
const router = express.Router();

const ProductController = require("../controllers/ProductController");
const auth = require("../utilities/auth");
const productDto = require("../dto/product");
const Product = require("../models/Product");
const validateDto = require("../middleware/validate-dto");
const unique = require("../middleware/unique");

router
  .route("/")
  .post(
    auth.userAuthenticate,
    auth.isAdmin,
    validateDto(productDto),
    ProductController.createProduct
  );

module.exports = router;
