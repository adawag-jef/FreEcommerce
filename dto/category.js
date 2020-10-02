const yup = require("yup");

module.exports = yup.object().shape({
  name: yup.string().trim().required("Category name is required."),
  description: yup.string().trim().required("A description is required."),
});
