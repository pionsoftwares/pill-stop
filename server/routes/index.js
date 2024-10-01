const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const errorHandler = require("../middlewares/errorHandler");

const router = express.Router();

const authRoutes = require("./AuthRoutes");

const publicRoutes = [authRoutes];

// const privateRoutes = ["/students", "/students/:id"];

publicRoutes.forEach((route) => {
  router.use("/api", route, errorHandler);
});

module.exports = router;
