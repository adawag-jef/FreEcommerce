const yup = require("yup");

module.exports = yup.object().shape({
  name: yup.string().trim().required(),
  email: yup.string().email().trim().required(),
  country: yup.string().trim().required(),
  street: yup.string().trim().required(),
  city: yup.string().trim().required(),
  zip: yup.string().trim().required(),
  phone: yup.string().trim().required(),
  deliveryMode: yup.string().trim().required(),
  address: yup.string().trim().required(),
});
