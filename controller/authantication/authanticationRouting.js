const router = require("express").Router();
const AuthanticationController = require('./authanticationController');

router.post("/login", AuthanticationController.isUser)

module.exports = router