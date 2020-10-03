const ApiError = require("../error/api-error");

function fileValidation(req, res, next) {
  if (!req.files || Object.keys(req.files).length === 0) {
    next(
      ApiError.badRequest({
        mainPhoto: "No file were uploaded.",
      })
    );
  } else {
    next();
  }
}

module.exports = fileValidation;
