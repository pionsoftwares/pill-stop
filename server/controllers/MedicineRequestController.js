const MedicineService = require("../services/MedicineService");
const MedicineRequest = require("../models/MedicineRequestModel");
const Student = require("../models/StudentModel");
const { groupBy } = require("../utils/utils");

const MedicineRequestController = {
  requestMedicine: async (req, res, next) => {
    try {
      const { medicineName, symptoms } = req.body;

      // If the user requesting is not a student, throw an error
      if (!req.student) {
        const error = new Error("Only students can request medicine");
        error.statusCode = 401;
        throw error;
      }

      const studentId = req.student.id;

      // Find the student
      const student = await Student.findByPk(studentId);

      // Check if student exists
      if (!student) {
        const error = new Error("Student not found");
        error.statusCode = 404;
        throw error;
      }

      // Check if there still a pending medicine request
      // const pendingMedicineRequests = await MedicineRequest.findAll({
      //   where: { studentId, status: "Pending" },
      // });

      // // If there are at least 3 pending medicine requests, throw an error
      // if (pendingMedicineRequests.length >= 3) {
      //   const error = new Error(
      //     "You still have three pending medicine request. Please wait for the approval of at least one."
      //   );
      //   error.statusCode = 400;
      //   throw error;
      // }

      // Find the medicine
      const medicine = await MedicineService.findMedicineByName(medicineName);

      // Check if medicine exists
      if (!medicine) {
        const error = new Error("Medicine not found");
        error.statusCode = 404;
        throw error;
      }

      // If medicine exists, create a medicine request
      const medicineRequest = await MedicineRequest.create({
        studentId,
        medicineName,
        symptoms,
      });

      // Send the response
      res.json({
        message: "Medicine requested successfully",
        medicineRequest,
      });
    } catch (error) {
      next(error);
    }
  },
  getAllMedicineRequets: async (req, res, next) => {
    try {
      // If the user requesting is a student, return all medicine requests of the student grouped by status
      if (req.student) {
        const studentId = req.student.id;
        const medicineRequests = await MedicineRequest.findAll({
          attributes: ["medicineName", "symptoms", "status"],
          where: { studentId },
          include: [
            {
              model: Student,
              as: "student",
              attributes: { exclude: ["password", "createdAt", "updatedAt"] },
            },
          ],
        });

        const groupedMedicineRequests = groupBy(medicineRequests, "status");

        res.json({ medicineRequests: groupedMedicineRequests });
      }
      // If the user requesting is an admin, return all medicine requests
      else if (req.admin) {
        const medicineRequests = await MedicineRequest.findAll({
          attributes: ["medicineName", "symptoms", "status"],
          include: [
            {
              model: Student,
              as: "student",
              attributes: { exclude: ["password", "createdAt", "updatedAt"] },
            },
          ],
        });

        const groupedMedicineRequests = groupBy(medicineRequests, "status");

        res.json({ medicineRequests: groupedMedicineRequests });
      }
    } catch (error) {
      next(error);
    }
  },
};

module.exports = MedicineRequestController;
