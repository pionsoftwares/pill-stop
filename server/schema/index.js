const yup = require("yup");

const authSchemas = {
  loginStudent: yup.object().shape({
    body: yup.object().shape({
      studentCode: yup
        .string()
        .required("Student code is required")
        .typeError("Student code should be a string"),
      password: yup
        .string()
        .required("Password is required")
        .typeError("Password should be a string"),
    }),
  }),
};

const studentSchemas = {
  mutateStudent: yup.object().shape({
    body: yup.object().shape({
      firstName: yup
        .string()
        .required("First name is required")
        .typeError("First name should be a string"),
      middleName: yup.string().typeError("Middle name should be a string"),
      lastName: yup
        .string()
        .required("Last name is required")
        .typeError("Last name should be a string"),
      studentCode: yup
        .string()
        .required("Student code is required")
        .typeError("Student code should be a string"),
      password: yup
        .string()
        .required("Password is required")
        .typeError("Password should be a string"),
      association: yup
        .string()
        .required("Association is required")
        .typeError("Association should be a string"),
      birthday: yup
        .date()
        .required("Birthday is required")
        .typeError("Birthday should be a valid date"),
      medicalHistory: yup
        .string()
        .typeError("Medical history should be a string"),
      allergies: yup.string().typeError("Allergies should be a string"),
    }),
  }),
};

module.exports = { authSchemas, studentSchemas };
