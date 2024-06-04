const router = require('express').Router()
const albumController = require('../app/controller/AlbumController')

router.post("/save", albumController.save)
router.get("/getOne/:getOne", albumController.getOne)
router.get("/getAll", albumController.getAll)
router.put("/update/:updateId", albumController.update)
router.delete("/delete/:deleteId", albumController.delete)



module.exports = router