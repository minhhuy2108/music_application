const router = require('express').Router()
const userController = require('../app/controller/UserController')


router.get("/login", userController.login)
router.get("/getUsers", userController.getUsers)
router.put("/updateRole/:userId", userController.updateRole)
router.delete("/delete/:userId", userController.delete)

module.exports = router;