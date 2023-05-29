const appointmentController = require('./appointmentController')
const router = require("express").Router();


router.post("/add_appointment", appointmentController.createAppointment);
router.get('/get_appointment_list',appointmentController.getAllAppointment);
router.get('/get_specific_date_appointment_list/:date',appointmentController.getSpecificDateAppointment);


module.exports = router;