const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
// const Product = require("../models/Product");
// const Category = require("../models/Category");
const Category = mongoose.model("Category");
const Product = mongoose.model("Product");
const fileUpload = require("../utilities/fileUpload");

class ProductController {
  async listProducts(req, res, error) {
    try {
      const products = await Product.find({})
        .sort({ createdAt: "desc" })
        .populate({ path: "category", model: Category, select: "name" })
        .populate("createdBy", "username id role")
        .populate("updatedBy", "username id role")
        .exec();
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }

  async createProduct(req, res, next) {
    try {
      const { name, description, price } = req.body;
      let categoryArray = req.body.category.split(",");
      const filePath = await fileUpload(req.files, "mainPhoto");
      const savedProduct = await Product.create({
        name,
        description,
        price,
        mainPhoto: filePath,
        category: categoryArray,
        createdBy: req.user,
        updatedBy: req.user,
      });

      const newProduct = await Product.findById(savedProduct._id)
        .populate({ path: "category", model: Category, select: "name" })
        .populate("createdBy", "username id role")
        .populate("updatedBy", "username id role")
        .exec();
      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  }

  async editProduct(req, res, next) {
    try {
      const product_id = req.params.id;
      const productToBeDeleted = await Product.findById({ _id: product_id });
      if (req.files) {
        if (productToBeDeleted) {
          const fileStoragePath = path.join(
            __dirname,
            "..",
            "client/public",
            productToBeDeleted.mainPhoto
          );

          fs.unlink(fileStoragePath, async (err) => {
            if (err) {
              next(err);
            } else {
              const { name, description, price } = req.body;
              let categoryArray = req.body.category.split(",");
              const filePath = await fileUpload(req.files, "mainPhoto");

              const updatedProduct = await Product.findOneAndUpdate(
                { _id: product_id },
                {
                  name,
                  description,
                  price,
                  createdBy: productToBeDeleted.createdBy,
                  mainPhoto: filePath,
                  category: categoryArray,
                  updatedBy: req.user,
                }
              );

              const _product = await Product.findById(updatedProduct._id)
                .populate({ path: "category", model: Category, select: "name" })
                .populate("createdBy", "username id role")
                .populate("updatedBy", "username id role")
                .exec();

              res.status(200).json(_product);
            }
          });
        }
      } else {
        const updatedBody = { ...req.body, updatedBy: req.user };
        updatedBody.category = req.body.category.split(",");
        updatedBody.createdBy = productToBeDeleted.createdBy;
        const updatedProduct = await Product.findOneAndUpdate(
          { _id: product_id },
          updatedBody
        );
        const _product = await Product.findById(updatedProduct._id)
          .populate({ path: "category", model: Category, select: "name" })
          .populate("createdBy", "username id role")
          .populate("updatedBy", "username id role")
          .exec();
        res.status(200).json(_product);
      }
    } catch (error) {
      next(error);
    }
  }

  async deleteProduct(req, res, next) {
    try {
      const product_id = req.params.id;
      const productToBeDeleted = await Product.findById({ _id: product_id });
      if (productToBeDeleted) {
        const fileStoragePath = path.join(
          __dirname,
          "..",
          "client/public",
          productToBeDeleted.mainPhoto
        );
        console.log(fileStoragePath);
        fs.unlink(fileStoragePath, async (err) => {
          if (err) {
            next(err);
          } else {
            await Product.deleteOne({ _id: product_id });
            res.status(204).json({ success: true, msg: "Product deleted." });
          }
        });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ProductController();
