const express = require("express");
const router = express.Router();

// require the conyroller s of the routes ..
const {
	getAllProducts,
	getAllProductsStatic,
} = require("../controllers/products");
// require the conyroller s of the routes ..

// set up routes ...
router.route("/").get(getAllProducts);
router.route("/static").get(getAllProductsStatic);
// set up routes ..

module.exports = router;
