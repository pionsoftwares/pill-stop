const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Approval = require("./ApprovalModel");

const MedicineCode = sequelize.define("MedicineCode", {
  code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isUsed: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

// Associations
Approval.hasOne(MedicineCode, {
  foreignKey: {
    name: "approvalId",
    allowNull: false,
  },
  as: "medicineCode",
});

MedicineCode.belongsTo(Approval, {
  foreignKey: {
    name: "approvalId",
    allowNull: false,
  },
  as: "approval",
});

module.exports = MedicineCode;
