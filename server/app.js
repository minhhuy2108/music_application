const express = require('express')
const app = express()
const route = require('./routes/index')
require('dotenv').config()


const db = require('./config/db/index')
db.connect()

// const cors = require('cors')
route(app)

app.listen(4000, () => console.log('Listening to port 4000'))