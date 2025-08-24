const mongoose = require("mongoose");
const constants = require("../utils/constants");
const logger = require("../utils/logger");

mongoose
  .connect(`mongodb://127.0.0.1:27017/${constants.DB_NAME}`)
  .then(() => {
    logger.db(`✅ MongoDB connected to database: ${constants.DB_NAME}`);
  })
  .catch((err) => {
    logger.db(`❌ MongoDb connection error: ${err.message}`);
  });

module.exports= mongoose.connection;
