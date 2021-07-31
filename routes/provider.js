const express = require("express");
const router = express.Router();
const { signupController } = require("../controllers/provider");

router.post("/signup", signupController);

// router.get('/' , productController.readAll
//   )
// router.delete('/:productId' , productController.delete)

// router.get('/:productId', productController.read);

module.exports = router;
