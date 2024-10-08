const { MEDICINE_OPTIONS } = require("../utils/constants");
const MedicineCode = require("../models/MedicineCodeModel");
const MedicineRequest = require("../models/MedicineRequestModel");
const Approval = require("../models/ApprovalModel");

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

    let currentRepeatChar;

    // Get the most recent approved request of the medicine
    const mostRecentRequest = await MedicineRequest.findOne({
      where: { medicineName, status: "Approved" },
      order: [["updatedAt", "DESC"]],
      include: [
        {
          model: Approval,
          as: "approval",
          include: [
            {
              model: MedicineCode,
              attributes: ["code"],
              as: "medicineCode",
            },
          ],
        },
      ],
    });

    // Check the repeating character of the code of the most recent request
    if (mostRecentRequest) {
      const { code } = mostRecentRequest.approval.medicineCode;

      // For each repeatingChar of the medicine, check if it occurs at least twice in the code
      for (let repeatingChar of medicine.repeatingChar) {
        const repeatingCharCount = code.split(repeatingChar).length - 1;

        if (repeatingCharCount >= 2) {
          currentRepeatChar = medicine.repeatingChar.find(
            (char) => char !== repeatingChar
          );
          break;
        }
      }
    } else {
      // If no most recent request, use the first repeating character
      currentRepeatChar = medicine.repeatingChar[0];
    }

    while (!isUnique && attempts < maxAttempts) {
      // Generate a random 6-digit code
      let repeatingCharCount = 0;
      while (repeatingCharCount < 2) {
        code = Math.floor(100000 + Math.random() * 900000).toString();
        repeatingCharCount = code.split(currentRepeatChar).length - 1;
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
