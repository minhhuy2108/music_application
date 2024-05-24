const mongoose = require('mongoose')

function connect() {
    mongoose.connect(process.env.DB_STRING, { useNewUrlParser: true });
    mongoose.connection
        .once("open", () => console.log('Connected'))
        .on("error", (error) => {
            console.log(`ERROR : ${error}`);
        })
}

module.exports = { connect }