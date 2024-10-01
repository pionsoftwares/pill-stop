// middleware/verifyToken.js
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const verifyToken = async (req, res, next) => {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];

    try {
      // Verify the token
      const decoded = await promisify(jwt.verify)(
        token,
        process.env.JWT_SECRET
      );
      console.log("Decoded token:", decoded);

      const student = decoded.student;
      const admin = decoded.admin;

      if (!student && !admin) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      req.student = student;
      req.admin = admin;
      next();
    } catch (error) {
      console.error("Error verifying token:", error);
      return res.status(401).json({ message: "Unauthorized" });
    }
  } else {
    // No token in the header
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = verifyToken;
