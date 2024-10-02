const express = require("express");
const router = express.Router();

const MedicineController = require("../controllers/MedicineController");

router.get("/medicine", MedicineController.getAllMedicines);

module.exports = router;
