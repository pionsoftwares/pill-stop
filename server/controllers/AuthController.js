const Student = require("../models/StudentModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const AuthController = {
  loginStudent: async (req, res, next) => {
    try {
      const { studentCode, password } = req.body;

      // Check if the student exists in the database
      const student = await Student.findOne({
        where: {
          studentCode,
        },
      });

      // If the student does not exist or is wrong passwor, throw an error
      if (!student) {
        const error = new Error("Student not found");
        error.statusCode = 404;
        throw error;
      }

      // Compare the password from the request with the hashed password in the database
      const isPasswordValid = await bcrypt.compare(password, student.password);

      if (!isPasswordValid) {
        const error = new Error("Invalid student code or password");
        error.statusCode = 401;
        throw error;
      }

      // Create a JWT token for the student
      const token = jwt.sign(
        {
          student: {
            id: student.id,
            studentCode: student.studentCode,
          },
        },
        process.env.JWT_SECRET
      );

      // If the student exists, return the student data
      res.json({
        message: "Student logged in successfully",
        student,
        token,
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = AuthController;
