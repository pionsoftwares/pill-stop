"use strict";
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Hash the admin password
    const hashedAdminPassword = await bcrypt.hash("1234", 10);

    // Insert Admins
    await queryInterface.bulkInsert(
      "Admins",
      [
        {
          username: "docwillyong",
          password: hashedAdminPassword,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    // Hash the student password
    const hashedStudentPassword = await bcrypt.hash("1234", 10);

    // Insert Students
    await queryInterface.bulkInsert(
      "Students",
      [
        {
          firstName: "Jane",
          middleName: "",
          lastName: "Doe",
          password: hashedStudentPassword,
          association: "SEA",
          studentCode: "HAU-0001",
          birthday: new Date(2000, 6, 20), // Months are 0-indexed in JS
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Add more students here if needed
      ],
      {}
    );

    // Retrieve the inserted student(s)
    const students = await queryInterface.sequelize.query(
      `SELECT id, studentCode FROM "Students" WHERE studentCode IN ('HAU-0001')`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    // Prepare EmergencyContact and MedicalRecord data
    const emergencyContacts = [];
    const medicalRecords = [];

    students.forEach((student) => {
      // Emergency Contact for Jane Doe
      if (student.studentCode === "HAU-0001") {
        emergencyContacts.push({
          emergencyContactName: "John Doe",
          emergencyContactNumber: "555-1234",
          relationship: "Father",
          studentId: student.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        // Medical Record for Jane Doe
        medicalRecords.push({
          medicalHistory: "Asthma",
          allergies: "Peanuts",
          studentId: student.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
      // Add more conditions for additional students if needed
    });

    // Insert EmergencyContacts
    if (emergencyContacts.length > 0) {
      await queryInterface.bulkInsert(
        "EmergencyContacts",
        emergencyContacts,
        {}
      );
    }

    // Insert MedicalRecords
    if (medicalRecords.length > 0) {
      await queryInterface.bulkInsert("MedicalRecords", medicalRecords, {});
    }
  },

  async down(queryInterface, Sequelize) {
    // Delete from related tables first due to foreign key constraints
    await queryInterface.bulkDelete("EmergencyContacts", null, {});
    await queryInterface.bulkDelete("MedicalRecords", null, {});
    await queryInterface.bulkDelete("Students", null, {});
    await queryInterface.bulkDelete("Admins", null, {});
  },
};
