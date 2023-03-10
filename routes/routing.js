const express = require("express");
var router = express.Router();

import appointmentRouter from "../controller/appointment/appointmentRouting";

router.post("/api/appointment", appointmentRouter);

module.exports = router;

