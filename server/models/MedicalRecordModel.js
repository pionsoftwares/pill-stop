const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Student = require("./StudentModel");

const MedicalRecord = sequelize.define("MedicalRecord", {
  medicalHistory: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  allergies: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

// Assosciations
Student.hasOne(MedicalRecord, {
  foreignKey: "studentId",
  as: "medicalRecord",
});

MedicalRecord.belongsTo(Student, {
  foreignKey: "studentId",
  as: "student",
});

module.exports = MedicalRecord;
