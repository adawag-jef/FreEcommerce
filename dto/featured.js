const yup = require("yup");

module.exports = yup.object().shape({
  product_id: yup.string().trim().required("Product is required."),
});
