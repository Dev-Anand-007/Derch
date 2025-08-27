const express = require("express");
const router = express.Router();

const productCotroller = require("../controllers/product-controller");
const { validate } = require("../middleware/validation-middleware");
const productValidation = require("../validations/product-validation");
const upload = require("../config/multer-config");

//For admin create only
router.get("/", (req, res) => {
  res.render("upload.ejs");
});

// Create New Product
router.post(
  "/create",upload.single('image'),
  validate(productValidation.createProduct),
  productCotroller.createProduct
);


router.put('/:id',upload.single('image'),
productCotroller.editproduct)



module.exports = router;
