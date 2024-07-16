const router = require('express').Router()
const artistControler = require('../app/controller/ArtistController')

router.post("/save", artistControler.save)
router.get("/getOne", artistControler.getOne)
router.get("/getAll", artistControler.getAll)
router.put("/update/:updateId", artistControler.update)
router.delete("/delete/:deleteId", artistControler.delete)


module.exports = router