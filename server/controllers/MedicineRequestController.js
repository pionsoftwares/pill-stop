const MedicineService = require("../services/MedicineService");
const MedicineRequest = require("../models/MedicineRequestModel");
const Student = require("../models/StudentModel");

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
      const hasPendingMedicineRequest = await MedicineRequest.findOne({
        where: { studentId, status: "Pending" },
      });

      if (hasPendingMedicineRequest) {
        const error = new Error(
          "You still have a pending medicine request. Please wait for the approval."
        );
        error.statusCode = 400;
        throw error;
      }

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
};

module.exports = MedicineRequestController;
