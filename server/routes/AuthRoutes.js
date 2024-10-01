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

module.exports = router;
