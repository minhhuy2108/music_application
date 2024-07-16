const router = require('express').Router()
const songController = require('../app/controller/SongController')

router.post("/save", songController.save)
router.get("/getOne/:getOne", songController.getOne)
router.get("/getAll", songController.getAll)
router.put("/update/:updateId", songController.update)
router.delete("/delete/:deleteId", songController.delete)
router.get("/getSongByArtist", songController.getSongByArtist)


module.exports = router