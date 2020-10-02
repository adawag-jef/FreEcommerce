const yup = require("yup");

module.exports = yup.object().shape({
  username: yup.string().trim().required(),
  password: yup.string().trim().min(6, "Minimum of 6 characters").required(),
  email: yup.string().email().required(),
  role: yup.string().trim().default("user"),
});
