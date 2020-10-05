const mongoose = require("mongoose");

const FeaturedProductSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FeaturedProduct", FeaturedProductSchema);
