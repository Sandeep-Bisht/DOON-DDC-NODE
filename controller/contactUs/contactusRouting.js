const contactUsController = require('./contactUsController')
const router = require("express").Router();


router.post("/", contactUsController.contactUs);




module.exports = router;