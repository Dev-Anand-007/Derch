const express=require('express');
const isLoggedin = require('../middleware/isLoggedin');
const router=express.Router();

const orderController=require('../controllers/order-controller')

//For admin only
router.get('/all',orderController.fetchAllOrder)

//For user only
router.get('/',isLoggedin,orderController.fetchUserOrder);



module.exports=router;