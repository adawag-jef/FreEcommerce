const express = require("express");
const router = express.Router();

const TransactionController = require("../controllers/TransactionController");
// const auth = require("../utilities/auth");
const transactionDto = require("../dto/transaction");
// const Category = require("../models/Category");
const validateDto = require("../middleware/validate-dto");
// const unique = require("../middleware/unique");

router
  .route("/")
  //   .get(auth.userAuthenticate, CategoryController.listCategories)
  .post(validateDto(transactionDto), TransactionController.createTransaction);

// router
//   .route("/:id")
//   .put(
//     auth.userAuthenticate,
//     auth.isAdmin,
//     validateDto(categoryDto),
//     unique(Category, "name"),
//     CategoryController.editCategory
//   )
//   .delete(
//     auth.userAuthenticate,
//     auth.isAdmin,
//     CategoryController.deleteCategory
//   );

module.exports = router;
