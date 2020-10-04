const path = require("path");
module.exports = async function (files, fileKey) {
  let mFile = files[fileKey];
  let fileName =
    mFile.name.split(".")[0] +
    "_" +
    Date.now() +
    "." +
    mFile.name.split(".")[1];

  // Use the mv() method to place the file somewhere on your server
  const fileStoragePath = path.join(APP_ROOT, process.env.UPLOAD_DIR, fileName);
  await mFile.mv(fileStoragePath);

  const filePath = `/uploads/${fileName}`;
  return filePath;
};
