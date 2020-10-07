const mongoose = require("mongoose");
const Product = mongoose.model("Product");
const Category = mongoose.model("Category");
// const fileUnlink = require("../utilities/fileUnlink");

const TransactionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    zip: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    deliveryMode: {
      type: String,
      required: true,
      enum: ["lbc", "lalamove"],
    },
    address: {
      type: String,
      required: true,
    },
    deliveryDate: {
      type: Date,
      required: true,
    },
    products: [
      {
        type: mongoose.Types.ObjectId,
        ref: "PurchasedProduct",
      },
    ],
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "approved", "delivered"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", TransactionSchema);
