const holidayController = require('./holidayController.js');
const router = require('express').Router();


router.post('/mark_holiday', holidayController.markRoutineHoliday)
router.get('/get_all_holidayList', holidayController.getAllHolidayList);
router.get('/get_upcoming_holidays', holidayController.getUpcomingHolidayList)
router.get('/get_currentday_schedule', holidayController.getCurrentDaySchedule)

module.exports = router;