const express = require("express");
const router = express.Router();
const validateSchema = require("../middlewares/validateSchema");

const AdminController = require("../controllers/AdminController");
const { adminSchemas } = require("../schema");

router.post(
  "/admin",
  validateSchema(adminSchemas.mutateAdmin),
  AdminController.createAdmin
);
router.get("/admin", AdminController.getAdmin);
router.put(
  "/admin",
  validateSchema(adminSchemas.mutateAdmin),
  AdminController.updateAdmin
);

module.exports = router;
