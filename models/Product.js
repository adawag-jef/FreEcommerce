const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    mainPhoto: {
      type: String,
      required: true,
    },
    secondaryPhoto: {
      type: String,
    },
    tertiaryPhoto: {
      type: String,
    },
    category: {
      type: [mongoose.Types.ObjectId],
      ref: "category",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
