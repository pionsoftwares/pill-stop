const Sequelize = require("sequelize");
const MedicineService = require("../services/MedicineService");
const MedicineRequest = require("../models/MedicineRequestModel");

const MedicineController = {
  getAllMedicines: async (req, res, next) => {
    try {
      const medicines = await MedicineService.getAllMedicines();
      res.json({ medicines });
    } catch (error) {
      next(error);
    }
  },

  getNumberOfRequestedMedicines: async (req, res, next) => {
    // Consolidate all quantities of each medicine requested
    try {
      const { dateFrom } = req.query;

      const medicineRequests = await MedicineRequest.findAll({
        where: {
          status: "Approved",
          ...(dateFrom && {
            createdAt: {
              [Sequelize.Op.gte]: dateFrom,
            },
          }),
        },
      });

      console.log(medicineRequests, "A");

      const medicineQuantities = medicineRequests.reduce((acc, request) => {
        const { medicineName } = request;
        acc[medicineName] = acc[medicineName] ? acc[medicineName] + 1 : 1;
        return acc;
      }, {});

      res.json({ requestedMedicineQuantities: medicineQuantities });
    } catch (error) {
      next(error);
    }
  },

  getNumberOfRemainingMedicines: async (req, res, next) => {
    // Consolidate all quantities of each medicine remaining and minus them to the static initial stock
    try {
      const medicineRequests = await MedicineRequest.findAll({
        where: {
          status: "Approved",
        },
      });

      const medicineQuantities = medicineRequests.reduce((acc, request) => {
        const { medicineName } = request;
        acc[medicineName] = acc[medicineName] ? acc[medicineName] + 1 : 1;
        return acc;
      }, {});

      const medicines = await MedicineService.getAllMedicines();
      const remainingMedicineQuantities = medicines.reduce((acc, medicine) => {
        const { name, initialStock } = medicine;
        const requestedQuantity = medicineQuantities[name] || 0;
        acc[name] = initialStock - requestedQuantity;
        return acc;
      }, {});

      res.json({ remainingMedicineQuantities });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = MedicineController;
