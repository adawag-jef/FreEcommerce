const ApiError = require("../error/api-error");

function validateDto(schema) {
  return async (req, res, next) => {
    try {
      const validatedBody = await schema.validate(req.body, {
        abortEarly: false,
      });
      req.body = validatedBody;
      next();
    } catch (error) {
      const errResponse = error.inner.reduce(function (result, item, index) {
        const key = item.path.split(".")[0];
        return { ...result, [key]: item.message };
      }, {});

      next(ApiError.badRequest(errResponse));
    }
  };
}

module.exports = validateDto;
