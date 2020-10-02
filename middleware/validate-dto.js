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
      const errResponse = error.inner.map((err) => {
        return {
          field: err.path,
          error_message: err.message,
        };
      });
      next(ApiError.badRequest(errResponse));
    }
  };
}

module.exports = validateDto;
