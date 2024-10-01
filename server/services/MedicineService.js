const { MEDICINE_OPTIONS } = require("../utils/constants");

const MedicineService = {
  findMedicineByName: async (medicineName) => {
    const medicine = MEDICINE_OPTIONS.find(
      (medicine) => medicine.name === medicineName
    );

    return medicine;
  },
  generateMedicineCode: async (medicineName) => {
    // Check if medicine exists
    const medicine = await MedicineService.findMedicineByName(medicineName);

    if (!medicine) {
      return "NOT_FOUND";
    }

    // Generate a random 6-digit code but make sure it has the repeating character at least twice in the code
    let code = "";
    let repeatingCharCount = 0;
    while (repeatingCharCount < 2) {
      code = Math.floor(100000 + Math.random() * 900000).toString();
      repeatingCharCount = code.split(medicine.repeatingChar).length - 1;
    }
  },
};

module.exports = MedicineService;
