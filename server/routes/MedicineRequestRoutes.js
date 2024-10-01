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

module.exports = router;
