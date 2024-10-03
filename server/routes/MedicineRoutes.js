const express = require("express");
const router = express.Router();

const MedicineController = require("../controllers/MedicineController");

router.get("/medicine", MedicineController.getAllMedicines);
router.get(
  "/medicine/requests",
  MedicineController.getNumberOfRequestedMedicines
);
router.get(
  "/medicine/remaining",
  MedicineController.getNumberOfRemainingMedicines
);

module.exports = router;
