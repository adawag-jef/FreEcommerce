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
    // secondaryPhoto: {
    //   type: String,
    // },
    // tertiaryPhoto: {
    //   type: String,
    // },
    // category: {
    //   type: [mongoose.Types.ObjectId],
    //   ref: "Category",
    // },
    category: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
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

ProductSchema.pre("deleteOne", function (next) {
  const product_id = this.getQuery()["_id"];
  // perform other cascaded deletion
  next();
});

module.exports = mongoose.model("Product", ProductSchema);
