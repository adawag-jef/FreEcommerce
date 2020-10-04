const mongoose = require("mongoose");
const Product = require("./Product");
const fileUnlink = require("../utilities/fileUnlink");

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    updatedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

CategorySchema.pre("deleteOne", function (next) {
  const category_id = this.getQuery()["_id"];

  Product.find({ category: { $in: [category_id] } }).then((products) => {
    Promise.all(
      products.map((product) => {
        if (product.category.length > 1) {
          return Product.findOneAndUpdate(
            { _id: product._id },
            { $pull: { category: category_id } },
            { new: true }
          );
        } else {
          return fileUnlink(product.mainPhoto, async (err) => {
            if (err) {
              next(err);
            }
            return await Product.deleteOne({ _id: product._id });
          });
        }
      })
    );
    next();
  });
});

module.exports = mongoose.model("Category", CategorySchema);
