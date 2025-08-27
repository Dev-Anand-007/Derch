const adminModel=require('../models/admin-model');
const logger = require("../utils/logger");

const adminController = {
  async admin(req, res) {
    return res.render('upload');
  },

  async create(req, res) {
    try {
      let admin = await adminModel.find();
      if (admin.length > 0) {
        return res.status(503).json({
          status: false,
          message: "You don't have permission to create a new admin",
        });
      }
      let { fullname, email, password } = req.body;
      let createdadmin = await adminModel.create({
        fullname,
        email,
        password,
      });
      let newadmin = createdadmin.toObject();
      delete newadmin.password;

      res.status(200).json({
        status: true,
        admin: newadmin,
      });
    } catch (error) {
      logger.routes("admin Creation error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error during application",
        error: error.message,
      });
    }
  },
};

module.exports = adminController;
