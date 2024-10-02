const express = require("express");
const router = express.Router();
const validateSchema = require("../middlewares/validateSchema");

const MedicineRequestController = require("../controllers/MedicineRequestController");
const { medicineRequestSchemas } = require("../schema");

router.post(
  "/medicine-requests",
  validateSchema(medicineRequestSchemas.requestMedicine),
  MedicineRequestController.requestMedicine
);
router.get(
  "/medicine-requests",
  MedicineRequestController.getAllMedicineRequests
);
router.put(
  "/approve/medicine-requests/:medicineRequestId",
  validateSchema(medicineRequestSchemas.approveMedicineRequest),
  MedicineRequestController.approveMedicineRequest
);
router.put(
  "/reject/medicine-requests/:medicineRequestId",
  validateSchema(medicineRequestSchemas.rejectMedicineRequest),
  MedicineRequestController.rejectMedicineRequest
);

module.exports = router;
