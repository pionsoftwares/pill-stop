const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Student = require("./StudentModel");

const EmergencyContact = sequelize.define("EmergencyContact", {
  emergencyContactName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  emergencyContactNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  relationship: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Assosciations
Student.hasOne(EmergencyContact, {
  foreignKey: "studentId",
  as: "emergencyContact",
});

EmergencyContact.belongsTo(Student, {
  foreignKey: "studentId",
  as: "student",
});

module.exports = EmergencyContact;
