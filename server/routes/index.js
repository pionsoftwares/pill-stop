const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const errorHandler = require("../middlewares/errorHandler");

const router = express.Router();

const authRoutes = require("./AuthRoutes");
const studentRoutes = require("./StudentRoutes");

const publicRoutes = [authRoutes];

const privateRoutes = [studentRoutes];

publicRoutes.forEach((route) => {
  router.use("/api", route, errorHandler);
});

privateRoutes.forEach((route) => {
  router.use(
    "/api",
    //verifyToken,
    route,
    errorHandler
  );
});

module.exports = router;
