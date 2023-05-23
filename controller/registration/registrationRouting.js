const registrationController = require('./registrationController')
const router = require("express").Router();


router.post("/admin_registration", registrationController.adminRegistration);


module.exports = router;