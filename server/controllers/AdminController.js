const Sequelize = require("sequelize");
const Admin = require("../models/AdminModel");

const AdminController = {
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

      //  If the user is not admin, throw an erorr
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
      const admin = Admin.findOne({
        where: {
          id: req.admin.id,
        },
      });

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
