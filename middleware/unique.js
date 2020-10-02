const ApiError = require("../error/api-error");

function unique(model, field) {
  return async (req, res, next) => {
    const instance = await model.findOne({ [field]: req.body[field] });
    if (req.method === "PUT") {
      if (instance.id !== req.params.id) {
        next(
          ApiError.badRequest({
            [field]: `${field} with a value of ${req.body[field]} already exist.`,
          })
        );
      } else {
        next();
      }
    } else {
      if (instance) {
        next(
          ApiError.badRequest({
            [field]: `${field} with a value of ${req.body[field]} already exist.`,
          })
        );
      } else {
        next();
      }
    }
  };
}

module.exports = unique;
