const path = require("path");
const Product = require("../models/Product");
const Category = require("../models/Category");

class ProductController {
  async listProducts(req, res, error) {
    try {
      const products = await Product.find({})
        .sort({ createdAt: "desc" })
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
      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send("No files were uploaded.");
      }

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
      const filePath = `uploads/${fileName}`;

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

  //   async deleteCategory(req, res, next) {
  //     try {
  //       await Category.deleteOne({ _id: req.params.id });
  //       res.status(200).json({ success: true, msg: "Category deleted." });
  //     } catch (error) {
  //       next(error);
  //     }
  //   }
}

module.exports = new ProductController();
