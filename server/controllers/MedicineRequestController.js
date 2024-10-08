const db = require("../config/db");
const MedicineService = require("../services/MedicineService");
const MedicineRequest = require("../models/MedicineRequestModel");
const Approval = require("../models/ApprovalModel");
const Rejection = require("../models/RejectionModel");
const MedicineCode = require("../models/MedicineCodeModel");
const Student = require("../models/StudentModel");
const MedicalRecord = require("../models/MedicalRecordModel");
const EmergencyContact = require("../models/EmergencyContactModel");
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

      // Emit an event to the admin
      const io = req.io;
      io.emit("medicineRequest", {
        message: "A new medicine request has been made",
        medicineRequest,
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

  getAllMedicineRequests: async (req, res, next) => {
    try {
      // If the user requesting is a student, return all medicine requests of the student grouped by status
      if (req.student) {
        const studentId = req.student.id;
        const medicineRequests = await MedicineRequest.findAll({
          attributes: ["id", "medicineName", "symptoms", "status"],
          where: { studentId },
          include: [
            {
              model: Student,
              as: "student",
              attributes: { exclude: ["password", "createdAt", "updatedAt"] },
            },
            {
              model: Approval,
              as: "approval",
              attributes: [["createdAt", "approvedAt"]],
              include: [
                {
                  model: MedicineCode,
                  as: "medicineCode",
                  attributes: ["code"],
                },
              ],
            },
            {
              model: Rejection,
              as: "rejection",
              attributes: ["reason"],
            },
          ],
          order: [["updatedAt", "DESC"]],
        });

        const groupedMedicineRequests = groupBy(medicineRequests, "status");

        res.json({ medicineRequests: groupedMedicineRequests });
      }
      // If the user requesting is an admin, return all medicine requests
      else if (req.admin) {
        const medicineRequests = await MedicineRequest.findAll({
          attributes: ["id", "medicineName", "symptoms", "status"],
          include: [
            {
              model: Student,
              as: "student",
              attributes: { exclude: ["password", "createdAt", "updatedAt"] },
            },
            {
              model: Approval,
              as: "approval",
              attributes: [["createdAt", "approvedAt"]],
              include: [
                {
                  model: MedicineCode,
                  as: "medicineCode",
                  attributes: ["code"],
                },
              ],
            },
            {
              model: Rejection,
              as: "rejection",
              attributes: ["reason"],
            },
          ],
          order: [["updatedAt", "DESC"]],
        });

        const groupedMedicineRequests = groupBy(medicineRequests, "status");

        res.json({ medicineRequests: groupedMedicineRequests });
      }
    } catch (error) {
      next(error);
    }
  },

  getAllMedicineRequestsUnfiltered: async (req, res, next) => {
    try {
      // If the user requesting is not an admin, throw an error
      if (!req.admin) {
        const error = new Error("Only admins can view all medicine requests");
        error.statusCode = 401;
        throw error;
      }

      const medicineRequests = await MedicineRequest.findAll({
        attributes: ["id", "medicineName", "symptoms", "status"],
        include: [
          {
            model: Student,
            as: "student",
            attributes: { exclude: ["password", "createdAt", "updatedAt"] },
            include: [
              {
                model: MedicalRecord,
                as: "medicalRecord",
                attributes: ["medicalHistory", "allergies"],
              },
              {
                model: EmergencyContact,
                as: "emergencyContact",
                attributes: [
                  "emergencyContactName",
                  "relationship",
                  "emergencyContactNumber",
                ],
              },
            ],
          },
          {
            model: Approval,
            as: "approval",
            attributes: [["createdAt", "approvedAt"]],
            include: [
              {
                model: MedicineCode,
                as: "medicineCode",
                attributes: ["code"],
              },
            ],
          },
          {
            model: Rejection,
            as: "rejection",
            attributes: ["reason"],
          },
        ],
        order: [["updatedAt", "DESC"]],
      });

      res.json({ medicineRequests });
    } catch (error) {
      next(error);
    }
  },

  approveMedicineRequest: async (req, res, next) => {
    const transaction = await db.transaction();

    try {
      // If the user requesting is not an admin, throw an error
      if (!req.admin) {
        const error = new Error("Only admins can approve medicine requests");
        error.statusCode = 401;
        throw error;
      }

      const { medicineRequestId } = req.params;

      // Find the medicine request
      const medicineRequest = await MedicineRequest.findByPk(
        medicineRequestId,
        { transaction }
      );

      // Check if medicine request exists
      if (!medicineRequest) {
        const error = new Error("Medicine request not found");
        error.statusCode = 404;
        throw error;
      }

      // Check if the medicine request is already approved
      if (medicineRequest.status === "Approved") {
        const error = new Error("Medicine request is already approved");
        error.statusCode = 400;
        throw error;
      }

      // Check if the medicine request is already rejected
      if (medicineRequest.status === "Rejected") {
        const error = new Error("Medicine request is already rejected");
        error.statusCode = 400;
        throw error;
      }

      // Update the status of the medicine request to "Approved"
      medicineRequest.status = "Approved";
      await medicineRequest.save({ transaction });

      // Create an approval
      const adminId = req.admin.id;
      const approval = await Approval.create(
        { medicineRequestId, adminId },
        { transaction }
      );

      const generatedCode = await MedicineService.generateMedicineCode(
        medicineRequest.medicineName,
        transaction
      );

      // Create a medicine code
      const medicineCode = await MedicineCode.create(
        {
          code: generatedCode,
          approvalId: approval.id,
        },
        { transaction }
      );

      // Commit the transaction
      await transaction.commit();

      // Emit an event to the student
      const io = req.io;
      io.emit("medicineRequestApproved", {
        message: "Your medicine request has been approved",
        medicineRequest: {
          medicineRequestId: medicineRequest.id,
          medicineName: medicineRequest.medicineName,
          symptoms: medicineRequest.symptoms,
          medicineCode: generatedCode,
          approvedAt: approval.createdAt,
        },
      });

      // Send the response
      res.json({
        message: "Medicine request approved successfully",
        medicineRequest,
        approval,
        medicineCode,
      });
    } catch (error) {
      await transaction.rollback();
      next(error);
    }
  },

  rejectMedicineRequest: async (req, res, next) => {
    const transaction = await db.transaction();

    try {
      // If the user requesting is not an admin, throw an error
      if (!req.admin) {
        const error = new Error("Only admins can reject medicine requests");
        error.statusCode = 401;
        throw error;
      }

      const { medicineRequestId } = req.params;
      const { reason } = req.body;

      // Find the medicine request
      const medicineRequest = await MedicineRequest.findByPk(
        medicineRequestId,
        { transaction }
      );

      // Check if medicine request exists
      if (!medicineRequest) {
        const error = new Error("Medicine request not found");
        error.statusCode = 404;
        throw error;
      }

      // Check if the medicine request is already approved
      if (medicineRequest.status === "Approved") {
        const error = new Error("Medicine request is already approved");
        error.statusCode = 400;
        throw error;
      }

      // Check if the medicine request is already rejected
      if (medicineRequest.status === "Rejected") {
        const error = new Error("Medicine request is already rejected");
        error.statusCode = 400;
        throw error;
      }

      // Update the status of the medicine request to "Rejected"
      medicineRequest.status = "Rejected";
      await medicineRequest.save({ transaction });

      // Create a rejection
      const adminId = req.admin.id;
      const rejection = await Rejection.create(
        { medicineRequestId, adminId, reason },
        { transaction }
      );

      // Commit the transaction
      await transaction.commit();

      // Emit an event to the student
      const io = req.io;
      io.emit("medicineRequestRejected", {
        message: "Your medicine request has been rejected",
        medicineRequest: {
          medicineRequestId: medicineRequest.id,
          medicineName: medicineRequest.medicineName,
          symptoms: medicineRequest.symptoms,
          reason: rejection.reason,
        },
      });

      // Send the response
      res.json({
        message: "Medicine request rejected successfully",
        medicineRequest,
        rejection,
      });
    } catch (error) {
      await transaction.rollback();
      next(error);
    }
  },
};

module.exports = MedicineRequestController;
