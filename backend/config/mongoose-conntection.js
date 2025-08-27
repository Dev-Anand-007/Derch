const mongoose = require("mongoose");
const constants = require("../utils/constants");
const logger = require("../utils/logger");
const config=require('config')

mongoose
  .connect(`${config.get("MONGODB_URI")}/${constants.DB_NAME}`)
  .then(() => {
    // console.log(`✅ MongoDB connected to database: ${constants.DB_NAME}`)
    logger.db(`✅ MongoDB connected to database: ${constants.DB_NAME}`);
  })
  .catch((err) => {
    // console.log(`❌ MongoDb connection error: ${err.message}`)
    logger.db(`❌ MongoDb connection error: ${err.message}`);
  });

module.exports= mongoose.connection;
