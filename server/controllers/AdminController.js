const Sequelize = require("sequelize");
const Admin = require("../models/AdminModel");

const AdminController = {
  createAdmin: async (req, res, next) => {
    try {
      const { username, password } = req.body;

      // Check if the username already exists
      const usernameExists = await Admin.findOne({
        where: { username },
      });

      // If the username already exists, throw an error
      if (usernameExists) {
        const error = new Error("Username already exists");
        error.statusCode = 400;
        throw error;
      }

      // Create a new admin
      const admin = await Admin.create({
        username,
        password,
      });

      // Send a response
      res.json({ message: "Admin created successfully", admin });
    } catch (error) {
      next(error);
    }
  },

  getAdmin: async (req, res, next) => {
    try {
      // If the user is not an admin, throw an error
      if (!req.admin) {
        const error = new Error("Only admins can get their details");
        error.statusCode = 401;
        throw error;
      }

      // Get the details of the current user
      const admin = Admin.findOne({
        where: {
          id: req.admin.id,
        },
      });

      // Send a response
      res.json(admin);
    } catch (error) {
      next(error);
    }
  },

  updateAdmin: async (req, res, next) => {
    try {
      const { username, password } = req.body;

      //  If the user is not admin, throw an error
      if (!req.admin) {
        const error = new Error("Only an admin can edit their own account");
        error.statusCode = 401;
        throw error;
      }

      // Check if the username already exists that is not the admin being updated
      const usernameExists = await Admin.findOne({
        where: { username, id: { [Sequelize.Op.ne]: req.admin.id } },
      });

      // If the username already exists, throw an error
      if (usernameExists) {
        const error = new Error("Student code already exists");
        error.statusCode = 400;
        throw error;
      }

      // Find the admin entry of the user
      const admin = await Admin.findOne({
        where: {
          id: req.admin.id,
        },
      });

      // If the admin does not exist, throw an error
      if (!admin) {
        const error = new Error("Admin not found");
        error.statusCode = 404;
        throw error;
      }

      // Update their own account
      await admin.update({
        username,
        password,
      });

      // Send response
      res.json({ message: "Admin updated successfully", admin });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = AdminController;
