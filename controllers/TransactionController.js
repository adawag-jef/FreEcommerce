const mongoose = require("mongoose");
const Product = require("../models/Product");
const PurchasedProduct = require("../models/PurchasedProduct");
const Transaction = mongoose.model("Transaction");
const path = require("path");
const fs = require("fs");

class TransactionController {
  //   async listCategories(req, res, error) {
  //     try {
  //       const categories = await Category.find({})
  //         .sort({ createdAt: "desc" })
  //         .populate("createdBy", "username id role")
  //         .populate("updatedBy", "username id role")
  //         .exec();
  //       res.status(200).json(categories);
  //     } catch (error) {
  //       next(error);
  //     }
  //   }

  async createTransaction(req, res, next) {
    try {
      const {
        name,
        email,
        country,
        street,
        city,
        zip,
        phone,
        deliveryMode,
        address,
        products,
      } = req.body;

      // compute grand total

      const resProducts = await Promise.all(
        products.map((prd) => {
          return Product.findById(prd.item);
        })
      );
      const total = resProducts.reduce((accumulator, currentValue) => {
        let count = products.find((p) => {
          return p.item === currentValue.id;
        }).count;
        return accumulator + parseFloat(currentValue.price) * count;
      }, 0);

      //  compute delivery date
      let today = new Date();
      let deliveryDate = new Date();
      deliveryDate.setDate(today.getDate() + 10);

      //   const purchasedProduct = products.map(async (prd) => {
      //     const prod = await PurchasedProduct.create({
      //       name: prd.name,
      //       description: prd.description,
      //       price: prd.price,
      //       mainPhoto: prd.mainPhoto,
      //       count: prd.count,
      //     });
      //     return prod;
      //   });

      const purchasedProduct = await Promise.all(
        resProducts.map(async (prd) => {
          const fileName = prd.mainPhoto.slice(9);
          const fileStoragePath = path.join(
            APP_ROOT,
            process.env.UPLOAD_DIR,
            fileName
          );

          const prod = await PurchasedProduct.create({
            name: prd.name,
            description: prd.description,
            price: prd.price,
            mainPhoto: `/transaction/${fileName}`,
            count: prd.count,
          });
          const transactionImage = `${process.env.PUBLIC_DIR}/transaction/${fileName}`;
          if (!fs.existsSync(`${process.env.PUBLIC_DIR}/transaction`)) {
            fs.mkdirSync(`${process.env.PUBLIC_DIR}/transaction`);
          }
          fs.copyFileSync(fileStoragePath, transactionImage);
          return prod;
        })
      );

      const newTransaction = await Transaction.create({
        name,
        email,
        country,
        street,
        city,
        zip,
        phone,
        deliveryMode,
        address,
        products: purchasedProduct,
        total,
        deliveryDate,
        status: "pending",
      });

      const transaction = await Transaction.findById(newTransaction._id)
        .populate("products")
        .exec();

      res.status(201).json(transaction);
    } catch (error) {
      next(error);
    }
  }

  //   async editCategory(req, res, next) {
  //     try {
  //       const updatedBody = { ...req.body, updatedBy: req.user };
  //       const categoryId = req.params.id;

  //       const updatedCategory = await Category.findOneAndUpdate(
  //         { _id: categoryId },
  //         updatedBody
  //       );

  //       const category = await Category.findById(updatedCategory._id)
  //         .populate("createdBy", "username id role")
  //         .populate("updatedBy", "username id role")
  //         .exec();

  //       res.status(201).json(category);
  //     } catch (error) {
  //       next(error);
  //     }
  //   }

  //   async deleteCategory(req, res, next) {
  //     try {
  //       await Category.deleteOne({ _id: req.params.id });
  //       res.status(200).json({ success: true, msg: "Category deleted." });
  //     } catch (error) {
  //       next(error);
  //     }
  //   }
}

module.exports = new TransactionController();
