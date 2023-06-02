const appointmentController = require('./appointmentController')
const router = require("express").Router();


router.post("/add_appointment", appointmentController.createAppointment);
router.get('/get_appointment_list',appointmentController.getAllAppointment);
router.get('/get_specific_date_appointment_list/:date',appointmentController.getSpecificDateAppointment);
router.get('/get_specific_period_date_appointment_list/from/:fromDate/to/:tillDate',appointmentController.getSpecificPeriodDateAppointment);




module.exports = router;