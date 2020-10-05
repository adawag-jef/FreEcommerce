const ApiError = require("../error/api-error");

function unique(model, field, validation_message) {
  return async (req, res, next) => {
    const instance = await model.findOne({ [field]: req.body[field] });
    if (req.method === "PUT") {
      if (instance && instance.id !== req.params.id) {
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
        let message = "";
        if (validation_message) {
          message = validation_message;
        } else {
          message = `${field} with a value of ${req.body[field]} already exist.`;
        }
        next(
          ApiError.badRequest({
            [field]: message,
          })
        );
      } else {
        next();
      }
    }
  };
}

module.exports = unique;
