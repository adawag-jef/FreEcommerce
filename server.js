require("dotenv").config();
const express = require("express");
const passport = require("passport");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const apiErrorHandler = require("./error/api-error-handler");
const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
let db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to mongodb");
});
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/dist"));
}

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());

// routes
app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/category", require("./routes/categoryRoute"));

// error handler
app.use(apiErrorHandler);

if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/dist/index.html"));
  });
}
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
