const mongoose = require("mongoose");
const Category = require("../models/Category");
const Product = require("../models/Product");
const fileUnlink = require("../utilities/fileUnlink");

class CategoryController {
  async listCategories(req, res, error) {
    try {
      const categories = await Category.find({})
        .sort({ createdAt: "desc" })
        .populate("createdBy", "username id role")
        .populate("updatedBy", "username id role")
        .exec();
      res.status(200).json(categories);
    } catch (error) {
      next(error);
    }
  }

  async createCategory(req, res, next) {
    try {
      const { name, description } = req.body;
      const newCategory = await Category.create({
        name,
        description,
        createdBy: req.user,
        updatedBy: req.user,
      });

      const category = await Category.findById(newCategory._id)
        .populate("createdBy", "username id role")
        .populate("updatedBy", "username id role")
        .exec();

      res.status(201).json(category);
    } catch (error) {
      next(error);
    }
  }

  async editCategory(req, res, next) {
    try {
      const updatedBody = { ...req.body, updatedBy: req.user };
      const categoryId = req.params.id;

      const updatedCategory = await Category.findOneAndUpdate(
        { _id: categoryId },
        updatedBody
      );

      const category = await Category.findById(updatedCategory._id)
        .populate("createdBy", "username id role")
        .populate("updatedBy", "username id role")
        .exec();

      res.status(201).json(category);
    } catch (error) {
      next(error);
    }
  }

  async deleteCategory(req, res, next) {
    try {
      const category_id = mongoose.Types.ObjectId(req.params.id);

      Product.find({ category: { $in: [category_id] } }).then((products) => {
        console.log(products);
        Promise.all(
          products.map((product) => {
            if (product.category.length > 1) {
              return Product.findOneAndUpdate(
                { _id: product._id },
                { $pull: { category: category_id } },
                { new: true }
              );
            } else {
              // TODO: unlink image
              fileUnlink(product.mainPhoto);
              return Product.deleteOne({ _id: product._id });
            }
          })
        );
      });

      await Category.deleteOne({ _id: req.params.id });
      res.status(200).json({ success: true, msg: "Category deleted." });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CategoryController();
