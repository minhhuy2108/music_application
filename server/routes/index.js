const userRoute = require('./auth.js')
const songRoute = require("./songs.js");
const artistsRoute = require("./artists.js");
const albumRoute = require("./albums.js");

const route = (app) => {

    app.use('/api/users', userRoute);


    app.use("/api/artists/", artistsRoute);


    app.use("/api/albums/", albumRoute);


    app.use("/api/songs/", songRoute);

}

module.exports = route;
