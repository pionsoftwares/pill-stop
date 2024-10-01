const express = require("express");
const router = express.Router();
const validateSchema = require("../middlewares/validateSchema");

const StudentController = require("../controllers/StudentController");
const { studentSchemas } = require("../schema");

router.post(
  "/student",
  validateSchema(studentSchemas.createStudent),
  StudentController.createStudent
);

module.exports = router;
