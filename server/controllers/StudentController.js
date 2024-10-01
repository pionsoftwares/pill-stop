const sequelize = require("../config/db");
const Student = require("../models/StudentModel");
const MedicalRecord = require("../models/MedicalRecordModel");

const StudentController = {
  createStudent: async (req, res, next) => {
    const transaction = await sequelize.transaction();

    try {
      const {
        firstName,
        middleName,
        lastName,
        studentCode,
        password,
        association,
        birthday,
        medicalHistory,
        allergies,
      } = req.body;

      // Check if the student code already exists
      const studentCodeExists = await Student.findOne({
        where: { studentCode },
      });

      // If the student code already exists, throw an error
      if (studentCodeExists) {
        const error = new Error("Student code already exists");
        error.statusCode = 400;
        throw error;
      }

      // Create a new Student
      const student = await Student.create(
        {
          firstName,
          middleName,
          lastName,
          studentCode,
          password,
          association,
          birthday,
        },
        { transaction }
      );

      // Create a new MedicalRecord
      await MedicalRecord.create(
        {
          medicalHistory,
          allergies,
          studentId: student.id,
        },
        { transaction }
      );

      // Commit the transaction
      await transaction.commit();

      // Send the response
      res
        .status(201)
        .json({ message: "Student created successfully", student });
    } catch (error) {
      await transaction.rollback();
      next(error);
    }
  },
};

module.exports = StudentController;
