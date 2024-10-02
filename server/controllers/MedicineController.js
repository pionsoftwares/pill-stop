const MedicineService = require("../services/MedicineService");

const MedicineController = {
  getAllMedicines: async (req, res, next) => {
    try {
      const medicines = await MedicineService.getAllMedicines();
      res.json({ medicines });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = MedicineController;
