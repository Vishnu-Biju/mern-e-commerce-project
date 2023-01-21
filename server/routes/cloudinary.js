const express = require("express");
const router = express.Router();


//middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

//controller methods
const {upload, remove} = require("../controllers/cloudinary");


router.post('/uplaodimages', authCheck, adminCheck, upload);
router.post('/removeimages', authCheck, adminCheck, remove);

module.exports = router;