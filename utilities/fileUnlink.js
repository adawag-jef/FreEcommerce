const fs = require("fs");
const path = require("path");
module.exports = function (filePath) {
  try {
    const fileStoragePath = path.join(
      __dirname,
      "..",
      "client/public",
      filePath
    );
    fs.unlink(fileStoragePath, (err) => {
      if (err) {
        // console.log(err);
        throw err;
      }
    });
  } catch (error) {
    throw error;
  }
};
