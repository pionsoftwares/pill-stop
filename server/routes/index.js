const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const errorHandler = require("../middlewares/errorHandler");

const router = express.Router();

const authRoutes = require("./AuthRoutes");
const adminRoutes = require("./AdminRoutes");
const studentRoutes = require("./StudentRoutes");
const medicineRequestRoutes = require("./MedicineRequestRoutes");
const medicineRoutes = require("./MedicineRoutes");

const publicRoutes = [authRoutes];

const privateRoutes = [
  adminRoutes,
  studentRoutes,
  medicineRequestRoutes,
  medicineRoutes,
];

publicRoutes.forEach((route) => {
  router.use("/api", route, errorHandler);
});

privateRoutes.forEach((route) => {
  router.use("/api", verifyToken, route, errorHandler);
});

module.exports = router;
