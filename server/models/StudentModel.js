const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const bcrypt = require("bcrypt");

const Student = sequelize.define("Student", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  middleName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  studentCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  association: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  birthday: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
});

// Hash password before creating a new student
Student.beforeCreate(async (student) => {
  student.password = await bcrypt.hash(student.password, 10);
});

// Hash password before updating a student
Student.beforeUpdate(async (student) => {
  if (student.changed("password")) {
    student.password = await bcrypt.hash(student.password, 10);
  }
});

module.exports = Student;
