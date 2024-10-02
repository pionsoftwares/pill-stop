const express = require("express");
const router = express.Router();
const validateSchema = require("../middlewares/validateSchema");

const AuthController = require("../controllers/AuthController");
const { authSchemas } = require("../schema");

router.post(
  "/login/student",
  validateSchema(authSchemas.loginStudent),
  AuthController.loginStudent
);
router.post(
  "/login/admin",
  validateSchema(authSchemas.loginAdmin),
  AuthController.loginAdmin
);

module.exports = router;
