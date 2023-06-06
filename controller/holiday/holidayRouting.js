const holidayController = require('./holidayController.js');
const router = require('express').Router();


router.post('/mark_holiday', holidayController.markRoutineHoliday)
router.get('/get_all_holidayList', holidayController.getAllHolidayList)

module.exports = router;