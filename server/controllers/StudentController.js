const db = require("../config/db");
const Sequelize = require("sequelize");
const Student = require("../models/StudentModel");
const MedicalRecord = require("../models/MedicalRecordModel");
const EmergencyContact = require("../models/EmergencyContactModel");

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
        emergencyContactName,
        emergencyContactNumber,
        relationship,
      } = req.body;

      // If the user is not an admin, throw an error
      if (!req.admin) {
        const error = new Error("Only admins can create students");
        error.statusCode = 401;
        throw error;
      }

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
      const medicalRecord = await MedicalRecord.create(
        {
          medicalHistory,
          allergies,
          studentId: student.id,
        },
        { transaction }
      );

      // Create a new EmergencyContact
      const emergencyContact = await EmergencyContact.create(
        {
          emergencyContactName,
          emergencyContactNumber,
          relationship,
          studentId: student.id,
        },
        { transaction }
      );

      // Commit the transaction
      await transaction.commit();

      // Send the response
      res.status(201).json({
        message: "Student created successfully",
        student: { ...student.dataValues, medicalRecord, emergencyContact },
      });
    } catch (error) {
      await transaction.rollback();
      next(error);
    }
  },

  getAllStudents: async (req, res, next) => {
    try {
      // If the user requesting is a student, throw an error
      if (req.student) {
        const error = new Error("Only admins can view all students");
        error.statusCode = 401;
        throw error;
      }

      // Get all students
      const students = await Student.findAll({
        attributes: { exclude: ["password", "createdAt", "updatedAt"] },
        include: [
          {
            model: MedicalRecord,
            as: "medicalRecord",
            attributes: {
              exclude: ["createdAt", "updatedAt", "id", "studentId"],
            },
          },
          {
            model: EmergencyContact,
            as: "emergencyContact",
            attributes: {
              exclude: ["createdAt", "updatedAt", "id", "studentId"],
            },
          },
        ],
      });

      // Send the response
      res.json({ students });
    } catch (error) {
      next(error);
    }
  },

  getStudentById: async (req, res, next) => {
    try {
      const { id } = req.params;

      // Get the student by id
      const student = await Student.findByPk(id, {
        attributes: { exclude: ["password", "createdAt", "updatedAt"] },
        include: [
          {
            model: MedicalRecord,
            as: "medicalRecord",
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
          {
            model: EmergencyContact,
            as: "emergencyContact",
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
        ],
      });

      // If the student does not exist, throw an error
      if (!student) {
        const error = new Error("Student not found");
        error.statusCode = 404;
        throw error;
      }

      // Send the response
      res.json({ student });
    } catch (error) {
      next(error);
    }
  },

  getCurrentStudent: async (req, res, next) => {
    try {
      // If the student does not exist, throw an error
      if (!req.student) {
        const error = new Error("Only students can view their profile");
        error.statusCode = 404;
        throw error;
      }

      // Get the student by id
      const student = await Student.findByPk(req.student.id, {
        attributes: { exclude: ["password", "createdAt", "updatedAt"] },
        include: [
          {
            model: MedicalRecord,
            as: "medicalRecord",
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
          {
            model: EmergencyContact,
            as: "emergencyContact",
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
        ],
      });

      // Send the response
      res.json({ student });
    } catch (error) {
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
        association,
        birthday,
        medicalHistory,
        allergies,
        emergencyContactName,
        emergencyContactNumber,
        relationship,
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

      // Update the EmergencyContact
      const emergencyContact = await EmergencyContact.findOne({
        where: { studentId: id },
      });

      await emergencyContact.update(
        {
          emergencyContactName,
          emergencyContactNumber,
          relationship,
        },
        { relationship }
      );

      // Commit the transaction
      await transaction.commit();

      // Send the response
      res.json({ message: "Student updated successfully", student });
    } catch (error) {
      await transaction.rollback();
      next(error);
    }
  },
};

module.exports = StudentController;
