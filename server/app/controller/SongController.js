const song = require('../model/song')

class SongController {
    save = async (req, res) => {
        const newSong = song({
            name: req.body.name,
            imageURL: req.body.imageURL,
            songUrl: req.body.songUrl,
            album: req.body.album,
            artist: req.body.artist,
            language: req.body.language,
            category: req.body.category,
        });
        try {
            const savedSong = await newSong.save();
            res.status(200).send({ song: savedSong });
        } catch (error) {
            res.status(400).send({ success: false, msg: error });
        }
    };

    getAll = async (req, res) => {


        const cursor = await song.find().sort({ createdAt: 1 });
        if (cursor) {
            res.status(200).send({ success: true, data: cursor });
        } else {
            res.status(200).send({ success: true, msg: "No Data Found" });
        }
    };

    getOne = async (req, res) => {
        const filter = { _id: req.params.getOne };

        const cursor = await song.findOne(filter);

        if (cursor) {
            res.status(200).send({ success: true, data: cursor });
        } else {
            res.status(200).send({ success: true, msg: "No Data Found" });
        }
    };

    update = async (req, res) => {
        const filter = { _id: req.params.updateId };
        const options = {
            upsert: true,
            new: true,
        };
        try {
            const result = await song.findOneAndUpdate(
                filter,
                {
                    name: req.body.name,
                    imageURL: req.body.imageURL,
                    songUrl: req.body.songUrl,
                    album: req.body.album,
                    artist: req.body.artist,
                    language: req.body.language,
                    category: req.body.category,
                },
                options
            );
            res.status(200).send({ artist: result });
        } catch (error) {
            res.status(400).send({ success: false, msg: error });
        }
    };

    delete = async (req, res) => {
        const filter = { _id: req.params.deleteId };

        const result = await song.deleteOne(filter);
        if (result.deletedCount === 1) {
            res.status(200).send({ success: true, msg: "Data Deleted" });
        } else {
            res.status(200).send({ success: false, msg: "Data Not Found" });
        }
    };

    getSongByArtist = async (req, res) => {
        const artist = req.query.artist;
        console.log(artist);
        try {
            const songsbyartist = await song.find({ artist });
            console.log(songsbyartist);
            return res.status(200).send({ success: true, data: songsbyartist });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    };

}

module.exports = new SongController