const appointmentController = require('./appointmentController')
const router = require("express").Router();

router.post("/add_appointment", appointmentController.createAppointment);
router.get('/get_appointment_list',appointmentController.getAllAppointment);


module.exports = router;