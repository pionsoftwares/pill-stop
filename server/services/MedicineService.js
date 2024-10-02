const { MEDICINE_OPTIONS } = require("../utils/constants");
const MedicineCode = require("../models/MedicineCodeModel"); // Assuming this model exists

const MedicineService = {
  findMedicineByName: async (medicineName) => {
    const medicine = MEDICINE_OPTIONS.find(
      (medicine) => medicine.name === medicineName
    );
    return medicine;
  },

  getAllMedicines: async () => {
    return MEDICINE_OPTIONS;
  },

  isCodeUnique: async (code) => {
    const existingCode = await MedicineCode.findOne({ where: { code } });
    return !existingCode;
  },

  generateMedicineCode: async (medicineName) => {
    // Check if medicine exists
    const medicine = await MedicineService.findMedicineByName(medicineName);

    if (!medicine) {
      return "NOT_FOUND";
    }

    let code;
    let isUnique = false;
    let attempts = 0;
    const maxAttempts = 10; // Prevent infinite loop

    while (!isUnique && attempts < maxAttempts) {
      // Generate a random 6-digit code
      let repeatingCharCount = 0;
      while (repeatingCharCount < 2) {
        code = Math.floor(100000 + Math.random() * 900000).toString();
        repeatingCharCount = code.split(medicine.repeatingChar).length - 1;
      }

      // Check if the generated code is unique
      isUnique = await MedicineService.isCodeUnique(code);
      attempts++;
    }

    if (!isUnique) {
      throw new Error(
        "Unable to generate a unique code after multiple attempts"
      );
    }

    return code;
  },
};

module.exports = MedicineService;
