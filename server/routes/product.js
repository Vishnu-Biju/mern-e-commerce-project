const express = require("express");
const router = express.Router();

//middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");
//controller

const {create, read} = require("../controllers/product");

//Routes
router.post("/product", authCheck, adminCheck, create);
router.get("/products", read);


module.exports = router;
