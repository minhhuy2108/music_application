const router = require('express').Router()
const userController = require('../app/controller/UserController')


router.get("/login", userController.login)

module.exports = router;