const express = require("express");
const router = express.Router();
const validateSchema = require("../middlewares/validateSchema");

const StudentController = require("../controllers/StudentController");
const { studentSchemas } = require("../schema");

router.post(
  "/student",
  validateSchema(studentSchemas.mutateStudent),
  StudentController.createStudent
);
router.get("/student", StudentController.getAllStudents);
router.get("/student/:id", StudentController.getStudentById);
router.get("/current/student", StudentController.getCurrentStudent);
router.put(
  "/student/:id",
  validateSchema(studentSchemas.updateStudent),
  StudentController.updateStudent
);

module.exports = router;
