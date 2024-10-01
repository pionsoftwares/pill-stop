const yup = require("yup");

const authSchemas = {
  loginStudent: yup.object().shape({
    body: yup.object().shape({
      studentCode: yup.string().required(),
      password: yup.string().required(),
    }),
  }),
};

module.exports = { authSchemas };
