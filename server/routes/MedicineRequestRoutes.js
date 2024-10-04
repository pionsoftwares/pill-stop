const express = require("express");
const router = express.Router();
const validateSchema = require("../middlewares/validateSchema");
const socket = require("../middlewares/socket");

const MedicineRequestController = require("../controllers/MedicineRequestController");
const { medicineRequestSchemas } = require("../schema");

router.use(socket);

router.post(
  "/medicine-requests",
  validateSchema(medicineRequestSchemas.requestMedicine),
  MedicineRequestController.requestMedicine
);
router.get(
  "/medicine-requests",
  MedicineRequestController.getAllMedicineRequests
);
router.get(
  "/medicine-requests/unfiltered",
  MedicineRequestController.getAllMedicineRequestsUnfiltered
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
