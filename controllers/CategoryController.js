const Category = require("../models/Category");

class CategoryController {
  async listCategories(req, res) {
    try {
      const categories = await Category.find({})
        .sort({ createdAt: "desc" })
        .populate("createdBy", "username id role")
        .exec();
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ success: false });
    }
  }

  async createCategory(req, res) {
    try {
      const { name, description } = req.body;
      const newCategory = await Category.create({
        name,
        description,
        createdBy: req.user,
      });

      const category = await Category.findById(newCategory._id)
        .populate("createdBy", "username id role")
        .exec();

      res.status(201).json(category);
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = new CategoryController();
