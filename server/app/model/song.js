const mongoose = require("mongoose");

const SongSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        imageURL: {
            type: String,
            required: true,
        },
        songUrl: {
            type: String,
            required: true,
        },
        album: {
            type: String,
        },
        artist: {
            type: String,
            required: true,
        },
        language: {
            type: String,

        },
        category: {
            type: String,

        },
        index: {
            type: Number,
            unique: true,
        },
    },
    { timestamps: true }
);

SongSchema.pre('save', async function (next) {
    if (this.isNew) {
        try {
            const count = await mongoose.models.song.countDocuments();
            this.index = count;
            next();
        } catch (error) {
            next(error);
        }
    } else {
        next();
    }
});

module.exports = mongoose.model("song", SongSchema);