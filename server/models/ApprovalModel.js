const sequelize = require("../config/db");
const MedicineRequest = require("./MedicineRequestModel");
const Admin = require("./AdminModel");

const Approval = sequelize.define("Approval", {});

// Associations
MedicineRequest.hasOne(Approval, {
  foreignKey: {
    name: "medicineRequestId",
    allowNull: false,
  },
  as: "approval",
});
Approval.belongsTo(MedicineRequest, {
  foreignKey: {
    name: "medicineRequestId",
    allowNull: false,
  },
  as: "medicineRequest",
});

Admin.hasMany(Approval, {
  foreignKey: {
    name: "adminId",
    allowNull: false,
  },
  as: "approvals",
});
Approval.belongsTo(Admin, {
  foreignKey: {
    name: "adminId",
    allowNull: false,
  },
  as: "admin",
});

module.exports = Approval;
