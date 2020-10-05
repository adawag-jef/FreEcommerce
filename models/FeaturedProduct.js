const mongoose = require("mongoose");

const FeaturedProductSchema = new mongoose.Schema(
  {
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FeaturedProduct", FeaturedProductSchema);
