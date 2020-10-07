const mongoose = require("mongoose");

const PurchasedProductSchema = new mongoose.Schema(
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
      type: Number,
      required: true,
    },
    mainPhoto: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

// ProductSchema.pre("deleteOne", function (next) {
//   const product_id = this.getQuery()["_id"];
//   // perform other cascaded deletion
//   next();
// });

module.exports = mongoose.model("PurchasedProduct", PurchasedProductSchema);
