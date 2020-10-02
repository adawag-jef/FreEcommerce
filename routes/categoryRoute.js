const express = require("express");
const router = express.Router();

const CategoryController = require("../controllers/CategoryController");
const auth = require("../utilities/auth");
const categoryDto = require("../dto/category");
const Category = require("../models/Category");
const validateDto = require("../middleware/validate-dto");
const unique = require("../middleware/unique");

router
  .route("/")
  .get(auth.userAuthenticate, auth.isAdmin, CategoryController.listCategories)
  .post(
    auth.userAuthenticate,
    auth.isAdmin,
    validateDto(categoryDto),
    unique(Category, "name"),
    CategoryController.createCategory
  );

router
  .route("/:id")
  .put(
    auth.userAuthenticate,
    auth.isAdmin,
    validateDto(categoryDto),
    unique(Category, "name"),
    CategoryController.editCategory
  );

module.exports = router;
