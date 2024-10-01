const db = require("../config/db");
const Student = require("../models/StudentModel");
const MedicalRecord = require("../models/MedicalRecordModel");
const Sequelize = require("sequelize");

const StudentController = {
  createStudent: async (req, res, next) => {
    const transaction = await db.transaction();

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

  updateStudent: async (req, res, next) => {
    const transaction = await db.transaction();

    try {
      const { id } = req.params;
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

      // Check if the student exists
      const student = await Student.findByPk(id);

      // If the student does not exist, throw an error
      if (!student) {
        const error = new Error("Student not found");
        error.statusCode = 404;
        throw error;
      }

      // Check if the student code already exists that is not the student being updated
      const studentCodeExists = await Student.findOne({
        where: { studentCode, id: { [Sequelize.Op.ne]: id } },
      });

      // If the student code already exists, throw an error
      if (studentCodeExists) {
        const error = new Error("Student code already exists");
        error.statusCode = 400;
        throw error;
      }

      // Update the Student
      await student.update(
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

      // Update the MedicalRecord
      const medicalRecord = await MedicalRecord.findOne({
        where: { studentId: id },
      });

      await medicalRecord.update(
        {
          medicalHistory,
          allergies,
        },
        { transaction }
      );

      // Commit the transaction
      await transaction.commit();

      // Send the response
      res
        .status(200)
        .json({ message: "Student updated successfully", student });
    } catch (error) {
      await transaction.rollback();
      next(error);
    }
  },
};

module.exports = StudentController;
