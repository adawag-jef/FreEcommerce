const ApiError = require("../error/api-error");

function unique(model, field) {
  return async (req, res, next) => {
    const instance = await model.find({ [field]: req.body[field] });
    if (instance.length) {
      next(
        ApiError.badRequest({
          [field]: `${field} with a value of ${req.body[field]} already exist.`,
        })
      );
    } else {
      next();
    }
  };
}

module.exports = unique;
