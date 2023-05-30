const patientController = require('./patientController')
const router = require("express").Router();



router.get("/get_patient", patientController.getAllPatients);



module.exports = router;