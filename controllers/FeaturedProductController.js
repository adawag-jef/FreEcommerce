const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
// const Product = require("../models/Product");
// const Category = require("../models/Category");
const FeaturedProduct = mongoose.model("FeaturedProduct");
const Product = mongoose.model("Product");
const fileUpload = require("../utilities/fileUpload");

class FeaturedProductController {
  async listFeaturedProducts(req, res, next) {
    try {
      const products = await FeaturedProduct.find({})
        .sort({ createdAt: "desc" })
        .populate({ path: "product", model: Product })
        // .populate("createdBy", "username id role")
        // .populate("updatedBy", "username id role")
        .exec();
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }

  async addProductToFeatured(req, res, next) {
    try {
      const { product_id } = req.body;
      const product = await Product.findById(product_id);
      const featured = await FeaturedProduct.create({ product });
      const newFeatured = await FeaturedProduct.findById(featured._id)
        .populate("product")
        .exec();
      res.status(201).json(newFeatured);
    } catch (error) {
      next(error);
    }
  }

  async removeProductFromFeatured(req, res, next) {
    try {
      const product_id = req.params.id;
      await FeaturedProduct.deleteOne({ _id: product_id });
      res.status(201).json({ success: true, msg: "Successfully removed" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new FeaturedProductController();
