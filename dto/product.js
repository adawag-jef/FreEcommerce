const yup = require("yup");

module.exports = yup.object().shape({
  name: yup.string().trim().required("Product name is required."),
  description: yup.string().trim().required("A description is required."),
  price: yup.string().trim().required("A price is required."),
  category: yup.string().required("A category is required."),
  // mainPhoto: yup.object().shape({
  //   name: yup.string().required("Main Photo is required"),
  // }),
});
