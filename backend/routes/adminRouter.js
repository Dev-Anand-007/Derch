const express = require("express");
const router = express.Router();
const adminProductsRouters=require('./adminProductRouter')
const orderRouters=require('./orderRouter')

const adminController = require("../controllers/admin-controller");

//baseURL
router.get("/", adminController.admin);

//Admin Creation --> Only for developement environment
if (process.env.NODE_ENV === "development") {
  router.post("/create",adminController.create );
}

//uploading product
router.use("/product",adminProductsRouters);

//Edit product
router.use("/product",adminProductsRouters);

//Edit product
router.use("/orders",orderRouters);




module.exports = router;
