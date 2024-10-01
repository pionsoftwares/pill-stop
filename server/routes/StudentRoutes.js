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
router.put(
  "/student/:id",
  validateSchema(studentSchemas.mutateStudent),
  StudentController.updateStudent
);

module.exports = router;
