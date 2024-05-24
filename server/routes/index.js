const userRoute = require('./auth.js')
const songRoute = require('./song.js')

const route = (app) => {

    app.use('/api/users', userRoute);
    // app.use('/song', songRoute)

}

module.exports = route;
