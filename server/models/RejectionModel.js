const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const MedicineRequest = require("./MedicineRequestModel");

const Rejection = sequelize.define("Rejection", {
  reason: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Associations
MedicineRequest.hasOne(Rejection, {
  foreignKey: {
    name: "medicineRequestId",
    allowNull: false,
  },
  as: "rejection",
});

Rejection.belongsTo(MedicineRequest, {
  foreignKey: {
    name: "medicineRequestId",
    allowNull: false,
  },
  as: "medicineRequest",
});

module.exports = Rejection;
