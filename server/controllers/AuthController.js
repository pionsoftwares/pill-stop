const Student = require("../models/StudentModel");

const AuthController = {
  loginStudent: async (req, res, next) => {
    try {
      const { studentCode, password } = req.body;

      // Check if the student exists in the database
      const student = await Student.findOne({
        where: {
          studentCode,
          password,
        },
      });

      // If the student does not exist or is wrong passwor, throw an error
      if (!student) {
        const error = new Error("Invalid student code or password");
        error.statusCode = 404;
        throw error;
      }

      // If the student exists, return the student data
      res.json({
        message: "Student logged in successfully",
        student,
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = AuthController;
