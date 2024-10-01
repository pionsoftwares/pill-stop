const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Student = require("./StudentModel");

const MedicineRequest = sequelize.define("MedicineRequest", {
  medicineName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  symptoms: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Pending",
  },
});

// Associations
MedicineRequest.belongsTo(Student, {
  foreignKey: {
    name: "studentId",
    allowNull: false,
  },
  as: "student",
});

Student.hasMany(MedicineRequest, {
  foreignKey: {
    name: "studentId",
    allowNull: false,
  },
  as: "medicineRequests",
});

module.exports = MedicineRequest;
