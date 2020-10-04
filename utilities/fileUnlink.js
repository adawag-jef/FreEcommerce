const fs = require("fs");
const path = require("path");
module.exports = function (filePath, cb) {
  try {
    const fileStoragePath = path.join(
      __dirname,
      "..",
      "client/public",
      filePath
    );
    fs.unlink(fileStoragePath, cb);
  } catch (error) {
    throw error;
  }
};
