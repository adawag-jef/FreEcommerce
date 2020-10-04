const path = require("path");
const fs = require("fs");
const Product = require("../models/Product");
const Category = require("../models/Category");

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

      // The name of the input field (i.e. "mainPhoto") is used to retrieve the uploaded file
      let mainPhoto = req.files.mainPhoto;
      let fileName =
        mainPhoto.name.split(".")[0] +
        "_" +
        Date.now() +
        "." +
        mainPhoto.name.split(".")[1];

      // Use the mv() method to place the file somewhere on your server
      const fileStoragePath = path.join(
        __dirname,
        "..",
        process.env.UPLOAD_DIR,
        fileName
      );
      const filePath = `/uploads/${fileName}`;

      await mainPhoto.mv(fileStoragePath);
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
            await Product.findOneAndDelete({ _id: product_id });
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
