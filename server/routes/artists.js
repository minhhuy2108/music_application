const router = require('express').Router()
const artist = require('../app/model/artist')

router.post("/save", async (req, res) => {
    const newArtist = artist({
        name: req.body.name,
        imageURL: req.body.imageURL,
        twitter: req.body.twitter,
        instagram: req.body.instagram,
    });
    try {
        const savedArtist = await newArtist.save();
        res.status(200).send({ artist: savedArtist });
    } catch (error) {
        res.status(400).send({ success: false, msg: error });
    }
});

router.get("/getOne/:getOne", async (req, res) => {
    const filter = { _id: req.params.getOne };

    const cursor = await artist.findOne(filter);

    if (cursor) {
        res.status(200).send({ success: true, data: cursor });
    } else {
        res.status(200).send({ success: true, msg: "No Data Found" });
    }
});

router.get("/getAll", async (req, res) => {
    const cursor = await artist.find().sort({ createdAt: 1 });
    if (cursor) {
        res.status(200).send({ success: true, data: cursor });
    } else {
        res.status(200).send({ success: true, msg: "No Data Found" });
    }
});

router.delete("/delete/:deleteId", async (req, res) => {
    const filter = { _id: req.params.deleteId };

    const result = await artist.deleteOne(filter);
    if (result.deletedCount === 1) {
        res.status(200).send({ success: true, msg: "Data Deleted" });
    } else {
        res.status(200).send({ success: false, msg: "Data Not Found" });
    }
});

router.put("/update/:updateId", async (req, res) => {
    const filter = { _id: req.params.updateId };
    const options = {
        upsert: true,
        new: true,
    };
    try {
        const result = await artist.findOneAndUpdate(
            filter,
            {
                name: req.body.name,
                imageURL: req.body.imageURL,
                twitter: req.body.twitter,
                instagram: req.body.instagram,
            },
            options
        );
        res.status(200).send({ artist: result });
    } catch (error) {
        res.status(400).send({ success: false, msg: error });
    }
});


module.exports = router