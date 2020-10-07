require("dotenv").config();
const express = require("express");
const passport = require("passport");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const path = require("path");
const cors = require("cors");
const apiErrorHandler = require("./error/api-error-handler");
const app = express();

require("./models/User");
require("./models/Category");
require("./models/Product");
require("./models/FeaturedProduct");
require("./models/PurchasedProduct");
require("./models/Transaction");

const PORT = process.env.PORT || 5000;

global.APP_ROOT = path.resolve(__dirname);

app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
let db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to mongodb");
});
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/dist"));
}
app.use("/uploads", express.static("client/uploads"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  fileUpload({
    createParentPath: true,
    safeFileNames: true,
    preserveExtension: true,
  })
);
app.use(passport.initialize());

// routes
app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/category", require("./routes/categoryRoute"));
app.use("/api/product", require("./routes/productRoute"));
app.use("/api/featured", require("./routes/featuredProductRoute"));
app.use("/api/transaction", require("./routes/transactionRoute"));

app.use(apiErrorHandler);
if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/dist/index.html"));
  });
  // error handler
}
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
